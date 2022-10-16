class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :sender_id, :receiver_id, :automated
end
