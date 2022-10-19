class TicketSerializer < ActiveModel::Serializer
  attributes :id, :status, :overdue, :owner, :borrower, :item

	def owner
		{
			first_name: self.object.owner.first_name,
			avatar: self.object.owner.avatar,
			id: self.object.owner.id
		}
	end

	def borrower
		{
			first_name: self.object.borrower.first_name,
			avatar: self.object.borrower.avatar,
			id: self.object.borrower.id
		}
	end

	def item
		{
			name: self.object.item.name,
			image: self.object.item.image
		}
	end
	
end
