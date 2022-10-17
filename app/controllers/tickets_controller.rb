class TicketsController < ApplicationController
	before_action :set_ticket, only: [:show, :set_return_date, :decline, :approve, :complete, :receive_item, :close]
	before_action :set_user, only: [:my_requests, :active_loans, :active_borrows, :close]
	before_action :set_owner_borrower_item, only: [:set_return_date, :approve, :receive_item, :close ]

	def create
		owner = User.find(ticket_params[:owner_id])
		borrower = User.find(ticket_params[:borrower_id])
		item = Item.find(ticket_params[:item_id])

		# Error handling
		if borrower.belongings.include?(item)
			render json: { error: "You can't borrow from your own item" } and return
		elsif !borrower.friends.include?(owner)
			render json: { error: "You can't borrow from someone you're not friends with" } and return
		end
		# Ticket model also validates uniqueness so that same user cannot request to borrow an item they've already requested/are already borrowing

		ticket = Ticket.create!(**ticket_params, status: "requested", return_date: "", overdue: false)

		Message.create!(ticket: ticket, automated: true, text: "Automated Message: #{borrower.first_name} requests to borrow #{owner.first_name}'s item: #{item.name}.\nNEXT STEP: #{owner.first_name} can 1) approve the request or 2) decline the request.\nUse the messenger to discuss the details of the request.")

		render json: ticket, status: :created
	end

	def show
		# Update overdue status if a return date is present
		if @ticket.return_date != ""
			@ticket.update!(overdue: @ticket.is_overdue(@ticket.return_date))
		else
			@ticket.update!(overdue: false)
		end
		render json: @ticket
	end

	def close
		@item.update!(borrower: nil)
		@ticket.destroy
		render json: @ticket
	end
 
	def set_return_date
		is_overdue = @ticket.is_overdue(ticket_params[:return_date])

		@ticket.update!(return_date: ticket_params[:return_date], overdue: is_overdue)

		message = Message.create!(ticket: @ticket, automated: true, text: "Automated Message: #{@owner.first_name} has set the return date to #{@ticket.formatted_return_date}.")

		render json: {ticket: TicketSerializer.new(@ticket), message: message }, status: :accepted
	end

	# All tickets pending initial response from owner
	def my_requests
		ticket_requests = @user.lending_tickets.where(status: "requested")
		render json: ticket_requests
	end

	# Approve a ticket request (or reopen ticket after it was closed)
	def approve
		@ticket.update!(status: "approved")
		# Update item's borrower
		@item.update!(borrower: @ticket.borrower)

		message = Message.create!(ticket: @ticket, automated: true, text: "Automated Message: #{@owner.first_name} promises to lend #{@borrower.first_name} their item: #{@item.name}. Awesome!\nNEXT STEP: Exchange the item! #{@borrower.first_name}, let us know when you have received the item.")

		render json: {ticket: TicketSerializer.new(@ticket), message: message }, status: :accepted
	end

	# Update ticket and item when it has been received by borrower
	def receive_item
		@ticket.update!(status: "on loan")
		@ticket.item.update!(status: "on loan")

		message = Message.create!(ticket: @ticket, automated: true, text: "Automated Message: #{@borrower.first_name} has received #{@owner.first_name}'s item: #{@item.name}. Take good care of it, #{@borrower.first_name}!\nNEXT STEP: #{@owner.first_name}, you may now set an optional return date to make sure you get your item back in time. When the item is returned, let us know!")

		render json: {ticket: TicketSerializer.new(@ticket), message: message }, status: :accepted
	end

	# Close a ticket
	def complete 
		@ticket.update!(status: "completed", return_date: nil, overdue: false)
		@ticket.item.update!(borrower: nil, status: "home")
		render json: @ticket, status: :accepted
	end

	# Get active user's items currently on loan
	def active_loans
		tickets = @user.lending_tickets.where(status: "on loan")
		tickets.each do |ticket|
			if ticket.is_overdue(ticket.return_date)
				ticket.update!(overdue: true)
			end
		end
		render json: tickets
	end

	# Get active user's items they're currently borrowing and include whether overdue
	def active_borrows
		tickets = @user.borrowing_tickets.where(status: "on loan")
		tickets.each do |ticket|
			if ticket.is_overdue(ticket.return_date)
				ticket.update!(overdue: true)
			end
		end
		render json: tickets
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

# -------------------------------------------------

# if ["approved", "on loan"].include?(@ticket.status)
		# 	if @user == @ticket.borrower
		# 	render json: { error: "Only the item's owner can delete the ticket" } and return
		# 	elsif @user == @ticket.user
		# 	render json: { error: "You cannot delete the ticket unless the item has been returned or you unapprove the ticket request" } and return
		# 	end
		# end


		# def offer_gift
		# 	@ticket.update!(status: "gifting")
	
		# 	message = Message.create!(ticket: @ticket, automated: true, text: "Automated Message: #{@owner.first_name} would like to gift their belonging to #{@borrower.first_name}. #{@borrower.first_name}, please accept or decline ownership of the item: #{@item.name}. Accepting ownership will close the ticket.")
	
		# 	render json: {ticket: TicketSerializer.new(@ticket), message: message }, status: :accepted
		# end
	
		# def decline_gift
		# 	@ticket.update!(status: "on loan")
	
		# 	message = Message.create!(ticket: @ticket, automated: true, text: "Automated Message: #{@borrower.first_name} has declinded to accept ownership of #{@borrower.first_name}'s belonging: #{@item.name}. The item remains on loan.")
	
		# 	render json: {ticket: TicketSerializer.new(@ticket), message: message }, status: :accepted
		# end
	
		# def accept_gift
		# 	@item.update!(status: "home", owner: @borrower, borrower: nil)
		# 	@ticket.destroy
	
		# 	render json: @ticket
		# end