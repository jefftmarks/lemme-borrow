class BookInfoSerializer < ActiveModel::Serializer
  attributes :author, :year, :genre
end
