class MessagesController < ApplicationController
	before_action :set_ticket, only: [:create, :ticket_messages]
	before_action :set_sender_and_receiver, only: [:create]

	def create
		# messages = @ticket.messages
		# # If tickets messages length is 1 (or under), that means that owner hasn't responded to intiail message yet, and so borrower cannot create message
		# if message_params[:sender_id] == @ticket.borrower_id && (messages.size < 1 || (messages.size == 1 && messages.first.sender_id == @ticket.borrower_id))
		# 	render json: { error: "Waiting for #{@receiver.first_name} to reply"} and return
		# end
		message = Message.create!(message_params)
		render json: message, status: :created
	end

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
