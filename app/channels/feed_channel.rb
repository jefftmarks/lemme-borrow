# class FeedChannel < ApplicationCable::Channel

#   def subscribed
#     stream_from "feed_#{params[:user_id]}"
#   end

#   def receive(data)

# 		item = Item.create!(data["item"])
		
# 		tags = data["tags"]
		
# 		# If tags present, check whether tag already exists. If it does, create new ItemTag and link Item with tag. If tag doesn't exit, create new tag first, then create the new ItemTag.
# 		if tags.size > 0
# 			tags.each do |tag|
# 				existing_tag = Tag.find_by(name: tag.downcase)
# 				if existing_tag
# 					ItemTag.create(item: item, tag: existing_tag)
# 				else
# 					ItemTag.create(item: item, tag: Tag.create!(name: tag.downcase))
# 				end
# 			end
# 		end

# 		user_payload = {
# 			id: item.id,
# 			name: item.name,
# 			status: item.status,
# 			description: item.description,
# 			image: item.image,
# 			tags: item.tags_array,
# 			owner: { id: item.owner.id }
# 		}

# 		ActionCable.server.broadcast("feed_#{params[:user_id]}", user_payload)

# 		friend_payload = {
# 				id: item.id,
# 				name: item.name,
# 				image: item.image,
# 				owner: item.owner
# 			}

# 		current_user.friends.each do |friend|
# 			ActionCable.server.broadcast("feed_#{friend.id}", friend_payload)
# 		end
#   end

#   def unsubscribed
#   end

# end
