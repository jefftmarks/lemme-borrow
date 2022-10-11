class TicketsController < ApplicationController
	before_action :set_ticket, only: [:show, :update, :destroy]

	def create
		ticket = Ticket.create(ticket_params)
		render json: ticket, status: :created
	end

	def show
		render json: @ticket, status: :ok
	end

	def update
		@ticket.update!(ticket_params)
		render json: @ticket, status: :accepted
	end

	def destroy
		@ticket.destroy
		render json: @ticket
	end

	def my_tickets
		user = User.find(params[:user_id])
		tickets = Ticket.where("owner_id = ? or borrower_id = ?", user.id, user.id).order(:created_at)
		render json: tickets
	end

	private

	def ticket_params
		params.permit(:owner_id, :borrower_id, :item_id, :status, :delivery_date, :return_date)
	end

	def set_ticket
		@ticket = Ticket.find(params[:id])
	end
end
