class User < ApplicationRecord
	has_secure_password

	# Friending
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships
	has_many :incoming_friend_requests, class_name: "FriendRequest", foreign_key: "receiver_id", dependent: :destroy
	has_many :outgoing_friend_requests, class_name: "FriendRequest", foreign_key: "requester_id", dependent: :destroy

	# Items
	has_many :belongings, class_name: "Item", foreign_key: "owner_id", dependent: :destroy
	# Will need to ask user to return all borrowed items before user is destroyed... so dependent destroy shouldn't be option on borrowed_items to prevent that from happening
	has_many :borrowed_items, class_name: "Item", foreign_key: "borrower_id"
	
	#custom method to see which of your items are being borrowed
	def items_on_loan
		self.belongings.where(status: "on loan")
	end

	# Tickets
	has_many :lending_tickets, class_name: "Ticket", foreign_key: "owner_id", dependent: :destroy
	has_many :borrowing_tickets, class_name: "Ticket", foreign_key: "borrower_id", dependent: :destroy
	# Again... need to figure out what happens when user deletes account what happens to any open tickets

	validates :first_name, :last_name, :email, :username, :password_digest, presence: true
	validates :username, uniqueness: { case_sensitive: false }

	# Method to determine whether active user and other user are friends
	# def is_friends_with?(user)
	# 	Friendship.find_by(user_id: self.id, friend_id: user.id)
	# end
end
