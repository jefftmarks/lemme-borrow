class Item < ApplicationRecord
	belongs_to :owner, :class_name => "User", :foreign_key => "owner_id"
	belongs_to :borrower, :class_name => "User", :foreign_key => "borrower_id", optional: true

	validates :name, presence: true
	validates :description, presence: true
	validates :owner_id, presence: true
	validates :category, inclusion: { in: %w(book, clothing, other) }

	# Borrower ID and Owner ID cannot be same?
end
