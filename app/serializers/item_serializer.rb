class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :image

	belongs_to :owner
end
