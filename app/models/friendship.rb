class Friendship < ApplicationRecord
	belongs_to :user
	belongs_to :friend, :class_name => "User", :foreign_key => "friend_id"


	
	has_one :corresponding_friendship, :class_name => "Friendship", :foreign_key => "corresponding_friendship_id"

	validates :user_id, presence: true
	validates :friend_id, presence: true, uniqueness: { scope: :user_id, message: "already exists" }

	# So that you can't unfriend someone you're currently borrowing from or loaning to
	def has_active_tickets?
		user = self.user
		friend = self.friend
		
		if user.lending_tickets.where(borrower: friend).size > 0 || user.borrowing_tickets.where(owner: friend).size > 0
			return true
		else
			return false
		end
	end
end
