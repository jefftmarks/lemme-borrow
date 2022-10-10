class User < ApplicationRecord
	has_many :friendships, dependent: :destroy
	has_many :friends, through: :friendships

	has_secure_password

	validates :username, uniqueness: { case_sensitive: false }, presence: true
end
