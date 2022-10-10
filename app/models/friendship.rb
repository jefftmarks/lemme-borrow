class Friendship < ApplicationRecord
	belongs_to :user
	belongs_to :friend, :class_name => "User", :foreign_key => "friend_id"
	has_one :corresponding_friendship, :class_name => "Friendship", :foreign_key => "corresponding_friendship_id"

	validates :user_id, presence: true
	validates :friend_id, presence: true, uniqueness: { scope: :user_id }
end
