class Message < ApplicationRecord
	belongs_to :sender, :class_name => "User", :foreign_key => "sender_id"
	belongs_to :receiver, :class_name => "User", :foreign_key => "receiver_id"

	belongs_to :ticket

	validates :sender_id, presence: true
	validates :receiver_id, presence: true
	validates :ticket_id, presence: true
	validates :text, presence: true
end
