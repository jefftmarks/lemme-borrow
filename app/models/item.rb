class Item < ApplicationRecord
	# Owner/Borrower
	belongs_to :owner, :class_name => "User", :foreign_key => "owner_id"
	belongs_to :borrower, :class_name => "User", :foreign_key => "borrower_id", optional: true

	# Ticket
	has_many :tickets, dependent: :destroy
	# Item cannot be destroyed if ticket open

	# Additional Info for Books, Clothes
	has_one :book_info, dependent: :destroy
	has_one :clothes_info, dependent: :destroy
	accepts_nested_attributes_for :book_info, update_only: true
	accepts_nested_attributes_for :clothes_info, update_only: true

	validates :name, presence: true
	# validates :description, presence: true
	validates :owner_id, presence: true
	validates :category, inclusion: { in: ["book", "clothing", "other"] }
	validates :status, presence: true, inclusion: { in: ["home", "requested", "promised", "on loan"] }

	# Borrower ID and Owner ID cannot be same?
end
