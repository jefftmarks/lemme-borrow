class User < ApplicationRecord
	has_secure_password

	def full_name
		self.first_name + " " + self.last_name
	end

	# Friending
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships

	has_many :incoming_friend_requests, class_name: "FriendRequest", foreign_key: "receiver_id", dependent: :destroy
	has_many :outgoing_friend_requests, class_name: "FriendRequest", foreign_key: "requester_id", dependent: :destroy

	# Items
	has_many :belongings, class_name: "Item", foreign_key: "owner_id", dependent: :destroy
	has_many :borrowed_items, class_name: "Item", foreign_key: "borrower_id"

	def items_on_loan
		self.belongings.where(status: "on loan")
	end

	# Tickets
	has_many :lending_tickets, class_name: "Ticket", foreign_key: "owner_id", dependent: :destroy
	has_many :borrowing_tickets, class_name: "Ticket", foreign_key: "borrower_id", dependent: :destroy

	validates :first_name, :last_name, :email, :username, :password_digest, presence: true
	validates :username, uniqueness: { case_sensitive: false }
end
