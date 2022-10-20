class ItemsController < ApplicationController
	before_action :set_item, only: [:show, :status, :update, :destroy, :gift_item]
	before_action :set_user, only: [:status, :recently_uploaded, :gift_item]
	before_action :validate_tags, only: [:create, :update]
	before_action :set_new_owner, only: [:gift_item]

	def index
		render json: Item.all
	end

	def show
		render json: @item, serializer: ItemWithFullDetailsSerializer
	end

	def create
		item = Item.create!(**item_params, status: "home")
		
		tags = tags_params[:tags]
		
		# If tags present, check whether tag already exists. If it does, create new ItemTag and link Item with Tag. If tag doesn't exit, create new tag first, then create the new Item Tag.
		if tags.size > 0
			tags.each do |tag|
				existing_tag = Tag.find_by(name: tag.downcase)
				if existing_tag
					ItemTag.create(item: item, tag: existing_tag)
				else
					ItemTag.create(item: item, tag: Tag.create!(name: tag.downcase))
				end
			end
		end

		render json: item, status: :created, serializer: ItemWithFullDetailsSerializer
	end

	def update
		if @item.tickets.size > 0
			render json: { error: "This item is associated with an open ticket. It cannot be edited until the ticket has been deleted" } and return
		end

		@item.update(item_params)

		tags = tags_params[:tags]

		if tags.size > 0
			@item.item_tags.destroy_all
			tags.each do |tag|
				existing_tag = Tag.find_by(name: tag.downcase)
				if existing_tag
					ItemTag.create!(item: @item, tag: existing_tag)
				else
					ItemTag.create!(item: @item, tag: Tag.create!(name: tag.downcase))
				end
			end
		end

		item = Item.find(@item.id)
		render json: item, status: :created, serializer: ItemWithFullDetailsSerializer
	end

	def destroy
		# You can't delete item if it is in borrowing process
		if @item.tickets.size > 0
			render json: { error: "Please close any pending tickets before deleting" }, status: :unauthorized
		else
			@item.destroy
			render json: @item
		end
	end

	def my_belongings
		start = count_params[:count].to_i
		finish = start + 9

		items = @user.belongings.order(created_at: :desc)[start..finish]

		render json: { items: items, total: @user.belongings.size }
	end

	def recently_uploaded
		items = [];

		@user.friends.map do |friend|
			friend.belongings.map do |item|
				items.push(item);
			end
		end

		count = count_params[:count].to_i

		render json: items.sort_by { |item| item[:created_at] }.reverse![0..count]
	end

	private

	def item_params
		params.permit(:name, :status, :description, :image, :owner_id, :borrower_id)
	end

	def set_item
		@item = Item.find(params[:id])
	end

	def set_user
		@user = User.find(params[:user_id])
	end

	def set_new_owner
		@new_owner = User.find(params[:new_owner_id])
	end

	def tags_params
		params.permit(:tags => [])
	end

	def count_params
		params.permit(:count)
	end

	def validate_tags
		if tags_params[:tags].size > 5
			render json: { error: "Maximum five tags" }
		end
	end

end

# def clothes_params
	# 	params.permit(:size)
	# end

	# def book_params
	# 	params.permit(:author, :year, :genre)
	# end

# # If item belongs to special category of clothing or book, create new instance of ClothesInfo or BookInfo and link to item (or destroy item if errors raised)
		# if item.category == "clothing"
		# 	clothes_info = ClothesInfo.create(**clothes_params, item: item)
		# 	if !clothes_info.valid?
		# 		item.destroy
		# 		render json: { error: clothes_info.errors.full_messages } and return
		# 	end
		# elsif item.category == "book"
		# 	book_info = ClothesInfo.create(**book_params, item: item)
		# 	if !book_info.valid?
		# 		item.destroy
		# 		render json: { error: book_info.errors.full_messages } and return
		# 	end
		# end

		# def gift_item
		# 	if @item.owner_id != @user.id
		# 	render json: { error: "This is not your item to gift" } and return
		# 	elsif @user.id == @new_owner.id
		# 	render json: { error: "You cannot gift the item to yourself" } and return
		# 	elsif !@user.friends.include?(@new_owner)
		# 		render json: { error: "You cannot gift an item to someone you're not friends with" } and return
		# 	elsif @item.tickets.size > 0
		# 		render json: { error: "This item is associated with an open ticket. It cannot be edited until the ticket has been deleted" } and return
		# 	end
	
		# 	@item.update(owner: @new_owner)
	
		# 	render json: @item, status: :accepted
		# end