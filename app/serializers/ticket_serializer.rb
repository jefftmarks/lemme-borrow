class TicketSerializer < ActiveModel::Serializer
  attributes :id, :status

	belongs_to :owner
	belons_to :borrower
	has_many :messages
end
