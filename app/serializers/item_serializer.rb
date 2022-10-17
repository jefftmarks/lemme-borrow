class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :owner_first_name

	def owner_first_name
		self.object.owner.first_name
	end
end
