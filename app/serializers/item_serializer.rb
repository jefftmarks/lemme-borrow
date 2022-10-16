class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :description, :image, :tags

	belongs_to :owner
	belongs_to :borrower
	
	def tags
		self.object.tags.map { |tag| tag[:name] }
	end
end
