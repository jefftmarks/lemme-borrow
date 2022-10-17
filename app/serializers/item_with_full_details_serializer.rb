class ItemWithFullDetailsSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :description, :image, :tags

	belongs_to :owner
	belongs_to :borrower
	
	def tags
		self.object.tags.map { |tag| tag[:name] }
	end
end

# No category for now

	# has_one :book_info, if: :is_book?
	# has_one :clothes_info, if: :is_clothing?

	# def is_clothing?
	# 	true if object.clothes_info
	# end

	# def is_book?
	# 	true if object.book_info
	# end
