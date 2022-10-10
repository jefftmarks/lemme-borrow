class User < ApplicationRecord
	# Friending
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships
	has_many :incoming_friend_requests, class_name: "FriendRequest", foreign_key: "receiver_id", dependent: :destroy
	has_many :outgoing_friend_requests, class_name: "FriendRequest", foreign_key: "requester_id", dependent: :destroy

	has_secure_password

	validates :username, uniqueness: { case_sensitive: false }, presence: true
end
