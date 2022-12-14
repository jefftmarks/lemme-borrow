class Api::TicketsController < ApplicationController
	before_action :set_ticket, only: [:show, :set_return_date, :decline, :approve, :receive_item, :close]
	before_action :set_user, only: [:my_requests, :active_loans, :active_borrows, :close]
	before_action :set_owner_borrower_item, only: [:set_return_date, :approve, :receive_item, :close ]

	def create
		owner = User.find(ticket_params[:owner_id])
		borrower = User.find(ticket_params[:borrower_id])
		item = Item.find(ticket_params[:item_id])

		if borrower.belongings.include?(item)
			render json: { error: "You can't borrow from your own item" }, status: :unauthorized
		elsif !borrower.friends.include?(owner)
			render json: { error: "You can't borrow from someone you're not friends with" }, status: :unauthorized
		else

			if item.tickets.size > 0
				ticket = Ticket.create!(**ticket_params, status: "waitlisted", return_date: "", overdue: false)

				Message.create!(ticket: ticket, automated: true, text: "#{borrower.first_name} requests to borrow #{owner.first_name}'s item: #{item.name}. This item has already been requested/is already being borrowed by a different user. #{owner.first_name} can approve the request once the item has been returned.")

				render json: ticket, status: :created

			else
				ticket = Ticket.create!(**ticket_params, status: "requested", return_date: "", overdue: false)

				Message.create!(ticket: ticket, automated: true, text: "#{borrower.first_name} requests to borrow #{owner.first_name}'s item: #{item.name}. #{owner.first_name} can either approve or decline the request. Use the messenger to discuss!")

				render json: ticket, status: :created
			end
		end
	end

	def show
		# Update overdue status if a return date is present
		if @ticket.return_date != ""
			@ticket.update!(overdue: @ticket.is_overdue(@ticket.return_date))
		else
			@ticket.update!(overdue: false)
		end

		if @ticket.status == "waitlisted"
			if @ticket.item.tickets.size == 1
				@ticket.update!(status: "requested")
			end
		end

		render json: @ticket, serializer: TicketWithFullDetailsSerializer
	end

	def close
		@item.update!(borrower: nil, status: "home")
		@ticket.destroy

		if @item.tickets.length > 0
			ticket = @item.tickets.order(:created_at)[0]
			
			ticket.update!(status: "requested")

			Message.create!(ticket: ticket, automated: true, text: "#{ticket.borrower.first_name} is no longer on the waitling list! #{ticket.owner.first_name} can either approve or decline the request. Use the messenger to discuss!")	
		end

		render json: @ticket
	end
 
	def set_return_date
		is_overdue = @ticket.is_overdue(ticket_params[:return_date])

		@ticket.update!(return_date: ticket_params[:return_date], overdue: is_overdue)

		message = Message.create!(ticket: @ticket, automated: true, text: "#{@owner.first_name} has set the return date to #{@ticket.formatted_return_date}.")

		render json: {ticket: TicketWithFullDetailsSerializer.new(@ticket), message: message }, status: :accepted
	end

	# Approve a ticket request (or reopen ticket after it was closed)
	def approve
		@ticket.update!(status: "approved")
		# Update item's borrower
		@item.update!(borrower: @ticket.borrower)

		message = Message.create!(ticket: @ticket, automated: true, text: "#{@owner.first_name} promises to lend #{@borrower.first_name} their item: #{@item.name}. Awesome! #{@borrower.first_name}, let us know when you have received the item.")

		render json: {ticket: TicketWithFullDetailsSerializer.new(@ticket), message: message }, status: :accepted
	end

	# Update ticket and item when it has been received by borrower
	def receive_item
		@ticket.update!(status: "on loan")
		@ticket.item.update!(status: "on loan")

		message = Message.create!(ticket: @ticket, automated: true, text: "#{@borrower.first_name} has received #{@owner.first_name}'s item: #{@item.name}. Take good care of it! #{@owner.first_name}, you may now set an optional return date")

		render json: {ticket: TicketWithFullDetailsSerializer.new(@ticket), message: message }, status: :accepted
	end

	# All tickets pending initial response from owner
	def my_requests
		payload = []

		tickets_requested = @user.lending_tickets.where(status: "requested")

		tickets_requested.each do |ticket|
			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "#{ticket.borrower.first_name} requests to borrow your item: #{ticket.item.name}",
					return_date: "",
					status: "pending"
				}
			)
		end

		tickets_requested_waitlist = @user.lending_tickets.where(status: "waitlisted")

		tickets_requested_waitlist.each do |ticket|
			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "#{ticket.borrower.first_name} has been waitlisted to borrow your item: #{ticket.item.name}",
					return_date: "",
					status: "pending"
				}
			)
		end

		tickets_requesting = @user.borrowing_tickets.where(status: "requested")

		tickets_requesting.each do |ticket|
			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "You've requested to borrow #{ticket.owner.first_name}'s item: #{ticket.item.name}",
					return_date: "",
					status: "pending"
				}
			)
		end

		tickets_requesting_waitlist = @user.borrowing_tickets.where(status: "waitlisted")

		tickets_requesting_waitlist.each do |ticket|
			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "You've been waitlisted to borrow #{ticket.owner.first_name}'s item: #{ticket.item.name}",
					return_date: "",
					status: "pending"
				}
			)
		end

		render json: payload.sort_by { |ticket| ticket[:created_at] }.reverse!
	end

	# Get active user's items currently on loan
	def active_loans
		loaning = @user.lending_tickets.where(status: "on loan")
		approved = @user.lending_tickets.where(status: "approved")
		
		payload = []

		loaning.each do |ticket|

			if ticket.return_date != ""
				ticket.update!(overdue: ticket.is_overdue(ticket.return_date))
			else
				ticket.update!(overdue: false)
			end

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: ticket.return_date == "" ? "#{ticket.borrower.first_name} is borrowing your item: #{ticket.item.name}." : "#{ticket.borrower.first_name} is borrowing your item: #{ticket.item.name}. Return Date: #{ticket.formatted_return_date}.",
					overdue: ticket.overdue,
					return_date: ticket.return_date,
					status: "active"
				}
			)
		end

		approved.each do |ticket|

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "You PROMISED to let #{ticket.borrower.first_name} borrow your item: #{ticket.item.name}",
					overdue: ticket.overdue,
					return_date: ticket.return_date,
					status: "pending"
				}
			)
		end

		render json: payload.sort_by { |ticket| ticket[:created_at] }.reverse!
	end

	# Get active user's items they're currently borrowing and include whether overdue
	def active_borrows
		payload = []

		borrowing = @user.borrowing_tickets.where(status: "on loan")
		approved = @user.borrowing_tickets.where(status: "approved")

		borrowing.each do |ticket|

			if ticket.return_date != ""
				ticket.update!(overdue: ticket.is_overdue(ticket.return_date))
			else
				ticket.update!(overdue: false)
			end

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: ticket.return_date == "" ? "#{ticket.owner.first_name}'s item: #{ticket.item.name}." : "#{ticket.owner.first_name}'s item: #{ticket.item.name}. Return Date: #{ticket.formatted_return_date}.",
					overdue: ticket.overdue,
					return_date: ticket.return_date,
					status: "active"
				}
			)
		end

		approved.each do |ticket|

			payload.push(
				{
					id: ticket.id,
					image: ticket.item.image,
					message: "#{ticket.owner.first_name} APPROVED your request to borrow their item: #{ticket.item.name}. Let us know when you've received the item.",
					overdue: ticket.overdue,
					return_date: ticket.return_date,
					status: "approved"
				}
			)
		end

		render json: payload.sort_by { |ticket| ticket[:created_at] }.reverse!
	end

	private

	def ticket_params
		params.permit(:owner_id, :borrower_id, :item_id, :status, :return_date)
	end

	def message_params
		params.permit(:message)
	end

	def set_ticket
		@ticket = Ticket.find(params[:id])
	end

	def set_owner_borrower_item
		@owner = @ticket.owner
		@borrower = @ticket.borrower
		@item = @ticket.item
	end

	def set_user
		@user = User.find(params[:user_id])
	end
end