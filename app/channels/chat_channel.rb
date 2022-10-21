class ChatChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_#{params[:room]}"
  end

  def receive(data)
    message = Message.create!(data)
    ActionCable.server.broadcast("chat_#{params[:room]}", message)
  end

  def unsubscribed
  end

end
