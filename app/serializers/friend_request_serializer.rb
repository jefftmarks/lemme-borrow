class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id

	belongs_to :requester
end
