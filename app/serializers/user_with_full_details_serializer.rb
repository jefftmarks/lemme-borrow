class UserWithFullDetailsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :avatar
end