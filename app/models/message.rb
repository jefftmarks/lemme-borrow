class Message < ApplicationRecord
	belongs_to :sender, :class_name => "User", :foreign_key => "sender_id", optional: true
	belongs_to :receiver, :class_name => "User", :foreign_key => "receiver_id", optional: true

	belongs_to :ticket

	validates :sender_id, presence: true, unless: :automated?
	validates :receiver_id, presence: true, unless: :automated?
	validates :ticket_id, presence: true
	validates :text, presence: true

	def automated?
		automated
	end


end
