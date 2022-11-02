class Api::TagsController < ApplicationController

	def index
		tags = Tag.all
		values = tags.map { |tag| tag[:name] }
		render json: values
	end
end
