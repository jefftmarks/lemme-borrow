class FriendRequest < ApplicationRecord
	belongs_to :requester, :class_name => "User", :foreign_key => "requester_id"
	belongs_to :receiver, :class_name => "User", :foreign_key => "receiver_id"

	validates :requester_id, presence: true
	validates :receiver_id, presence: true, uniqueness: { scope: :requester_id, message: "has already been requested but has yet to respond" }
end
