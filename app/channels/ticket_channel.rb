class TicketChannel < ApplicationCable::Channel

  def subscribed
    stream_from "ticket_#{params[:ticket_id]}"
  end

  def receive(data)
    message = Message.create!(data)
    ActionCable.server.broadcast("ticket_#{params[:ticket_id]}", message)
  end

  def unsubscribed
  end

end
