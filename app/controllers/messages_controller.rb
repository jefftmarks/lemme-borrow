class MessagesController < ApplicationController
	before_action :set_ticket, only: [:create, :ticket_messages]
	# before_action :set_sender_and_receiver, only: [:create]

	# ---- HANDLED BY ACTION CABLE ----
	# def create
	# 	message = Message.create!(**message_params, automated: false)
	# 	render json: message, status: :created
	# end

	def ticket_messages
		render json: @ticket.messages.order(created_at: :desc)
	end

	private

	def message_params
		params.permit(:text, :ticket_id, :sender_id, :receiver_id)
	end

	def set_ticket
		@ticket = Ticket.find(params[:ticket_id])
	end

	def set_sender_and_receiver
		@sender = User.find(params[:sender_id])
		@receiver = User.find(params[:receiver_id])
	end
end
