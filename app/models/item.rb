class Item < ApplicationRecord
	# Owner/Borrower
	belongs_to :owner, :class_name => "User", :foreign_key => "owner_id"
	belongs_to :borrower, :class_name => "User", :foreign_key => "borrower_id", optional: true

	# Additional Info for Books, Clothes
	has_one :book_info, dependent: :destroy
	has_one :clothes_info, dependent: :destroy
	accepts_nested_attributes_for :book_info, update_only: true
	accepts_nested_attributes_for :clothes_info, update_only: true

	validates :name, presence: true
	# validates :description, presence: true
	validates :owner_id, presence: true
	validates :category, inclusion: { in: %w(book clothing other) }

	# Borrower ID and Owner ID cannot be same?
end
