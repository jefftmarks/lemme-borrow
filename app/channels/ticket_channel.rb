class TicketChannel < ApplicationCable::Channel

  def subscribed
    stream_from "ticket_#{params[:ticket_id]}"
  end

  def receive(data)
    message = Message.create!(data)
		puts "BINGO"
    ActionCable.server.broadcast("ticket_#{params[:ticket_id]}", message)
  end

end
