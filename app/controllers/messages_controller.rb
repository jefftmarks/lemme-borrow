class MessagesController < ApplicationController

	def create
		message = Message.create!(message_params)
		render json: message, status: :created
	end

	private

	def message_params
		params.permit(:text, :ticket_id, :sender_id, :receiver_id)
	end
end
