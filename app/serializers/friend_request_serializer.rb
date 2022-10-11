class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id

	belongs_to :requester
	belongs_to :receiver
end
