class Ticket < ApplicationRecord
	belongs_to :owner, :class_name => "User", :foreign_key => "owner_id"
	belongs_to :borrower, :class_name => "User", :foreign_key => "borrower_id", optional: true

	belongs_to :item

	has_many :messages, dependent: :destroy

	validates :owner_id, presence: true
	validates :borrower_id, presence: true
	validates :item_id, presence: true
	validates :status, presence: true, inclusion: { in: ["requested", "approved", "on loan", "returned"]}
end
