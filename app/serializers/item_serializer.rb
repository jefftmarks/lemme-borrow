class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :condition, :image, :owner_id, :borrower_id
end
