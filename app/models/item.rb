class Item < ApplicationRecord
	# Owner/Borrower
	belongs_to :owner, :class_name => "User", :foreign_key => "owner_id"
	belongs_to :borrower, :class_name => "User", :foreign_key => "borrower_id", optional: true

	# Tags
	has_many :item_tags, dependent: :destroy
	has_many :tags, through: :item_tags

	# Ticket
	has_many :tickets, dependent: :destroy
	# Item cannot be destroyed if ticket open

	# Additional Info for Books, Clothes
	# has_one :book_info, dependent: :destroy
	# has_one :clothes_info, dependent: :destroy

	validates :name, presence: true
	validates :owner_id, presence: true
	# validates :category, inclusion: { in: ["book", "clothing", "other"] }
	validates :status, presence: true, inclusion: { in: ["home", "on loan"] }

	def tags_array
		self.tags.map { |tag| tag[:name] }
	end

	def belongs_to_friend(user)
		friends = user.friends.include?(self.owner)
	end
end