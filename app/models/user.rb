class User < ApplicationRecord
	# Friending
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships
	has_many :incoming_friend_requests, class_name: "FriendRequest", foreign_key: "receiver_id", dependent: :destroy
	has_many :outgoing_friend_requests, class_name: "FriendRequest", foreign_key: "requester_id", dependent: :destroy

	# Items
	has_many :belongings, class_name: "Item", foreign_key: "owner_id", dependent: :destroy
	has_many :borrowed_items, class_name: "Item", foreign_key: "borrower_id"
	# Will need to ask user to return all borrowed items before user is destroyed... so dependent destroy in theory shouldn't be necessary on borrowed_items

	has_secure_password

	validates :username, uniqueness: { case_sensitive: false }, presence: true
end
