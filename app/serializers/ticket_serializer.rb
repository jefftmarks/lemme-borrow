class TicketSerializer < ActiveModel::Serializer
  attributes :id, :status, :delivery_date, :return_date

	belongs_to :owner
	belongs_to :borrower
	belongs_to :item
	has_many :messages
end
