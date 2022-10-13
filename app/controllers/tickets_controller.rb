class TicketsController < ApplicationController
	before_action :set_ticket, only: [:show, :approve, :destroy]
	before_action :set_owner_and_borrower, only: [:create, :approve]
	before_action :set_item, only: [:create, :approve]
	before_action :set_user, only: [:my_requests]

	def create
		# Error handling so you can't borrow your own 
		if @borrower.belongings.include?(@item)
			render json: { error: "You can't borrow from your own item" } and return
		end

		ticket = Ticket.create!(ticket_params)

		# Introductory message submitted with request
		message = message_params[:message]
		if message
			Message.create!(text: message, ticket: ticket, sender: @borrower, receiver: @owner)
		end

		# Update item status
		@item.update!(requested: true)

		render json: ticket, status: :created
	end

	def show
		render json: @ticket, status: :ok, serializer: TicketsWithFullDetailsSerializer
	end
 
	# def update
	# 	@ticket.update!(ticket_params)
	# 	render json: @ticket, status: :accepted
	# end

	# All tickets pending initial response from owner
	def my_requests
		ticket_requests = @user.lending_tickets.where(status: "requested")
		render json: ticket_requests
	end

	# approve a ticket request
	def approve
		@ticket.update!(status: "approved", return_date: ticket_params[:return_date])
		@item.update!(requested: false, borrower: @borrower)
		render json: @ticket, status: :accepted
	end

	def destroy
		@ticket.item.update!(requested: false)
		@ticket.destroy
		render json: @ticket
	end

	# def my_tickets
	# 	user = User.find(params[:user_id])
	# 	tickets = Ticket.where("owner_id = ? or borrower_id = ?", user.id, user.id).order(:created_at)
	# 	render json: tickets
	# end

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

	def set_owner_and_borrower
		@owner = User.find(params[:owner_id])
		@borrower = User.find(params[:borrower_id])
	end

	def set_user
		@user = User.find(params[:user_id])
	end

	def set_item
		@item = Item.find(params[:item_id])
	end
end
