class TicketsController < ApplicationController
	before_action :set_ticket, only: [:show, :update, :decline, :approve, :complete, :receive_item, :destroy]
	before_action :set_user, only: [:my_requests, :active_loans, :active_borrows]

	def create
		owner = User.find(params[:owner_id])
		borrower = User.find(params[:borrower_id])
		item = Item.find(params[:item_id])

		# Error handling so you can't borrow your own item or borrow from someone not your friends
		if borrower.belongings.include?(item)
			render json: { error: "You can't borrow from your own item" } and return
		elsif !borrower.friends.include?(owner)
			render json: { error: "You can't borrow from someone you're not friends with" } and return
		end

		ticket = Ticket.create!(ticket_params)

		# Introductory message submitted with request
		message = message_params[:message]
		if message
			Message.create!(text: message, ticket: ticket, sender: borrower, receiver: owner)
		end

		# Update item status
		item.update!(requested: true)

		render json: ticket, status: :created
	end

	def show
		@ticket.update!(overdue: @ticket.is_overdue(@ticket.return_date))
		render json: @ticket, status: :ok
	end
 
	def update
		is_overdue = @ticket.is_overdue(ticket_params[:return_date])
		@ticket.update!(**ticket_params, overdue: is_overdue)
		render json: @ticket, status: :accepted
	end

	# All tickets pending initial response from owner
	def my_requests
		ticket_requests = @user.lending_tickets.where(status: "requested")
		render json: ticket_requests
	end

	# Decline ticket request and set item request status back to false
	def decline
		@ticket.item.update!(requested: false)
		@ticket.destroy
		render json: @ticket
	end

	# Approve a ticket request (or reopen ticket after it was closed)
	def approve
		@ticket.update!(status: "approved")
		@ticket.item.update!(requested: false, borrower: @ticket.borrower)
		render json: @ticket, status: :accepted
	end

	# Close a ticket
	def complete 
		@ticket.update!(status: "completed", return_date: nil, overdue: false)
		@ticket.item.update!(borrower: nil, status: "home")
		render json: @ticket, status: :accepted
	end

	# Update ticket and item when it has been received by borrower
	def receive_item
		@ticket.update!(status: "on loan")
		@ticket.item.update!(status: "on loan")
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

	def destroy
		if @ticket.status != "completed"
			render json: { error: "You cannot delete the ticket until the item has been returned or gifted" } and return
		end
		@ticket.destroy
		render json: @ticket
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

	def set_user
		@user = User.find(params[:user_id])
	end
end
