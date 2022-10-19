class TicketWithFullDetailsSerializer < ActiveModel::Serializer
  attributes :id, :status, :return_date, :overdue

	belongs_to :item
	belongs_to :owner
	belongs_to :borrower
end
