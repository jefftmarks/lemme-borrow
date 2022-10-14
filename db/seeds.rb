Item.destroy_all
ItemTag.destroy_all
Tag.destroy_all

FriendRequest.destroy_all
Friendship.destroy_all

User.destroy_all

require 'faker'

puts "seeding starting"

jeff= User.create!(
	username: "jeffsworld",
	first_name: "Jeff",
	last_name: "Marks",
	password: "1111",
	email: "jeff@jeff.com",
	avatar: Faker::Avatar.image
)

mischa = User.create!(
	username: "planet_mischa",
	first_name: "Mischa",
	last_name: "Aletta",
	password: "1111",
	email: "mischa@mischa.com",
	avatar: Faker::Avatar.image
)

will = User.create!(
	username: "dub_k",
	first_name: "Will",
	last_name: "Kempner",
	password: "1111",
	email: "will@will.com",
	avatar: Faker::Avatar.image
)

Friendship.create!(user: jeff, friend: mischa)
Friendship.create!(user: mischa, friend: jeff)
Friendship.create!(user: jeff, friend: will)
Friendship.create!(user: will, friend: jeff)
Friendship.create!(user: mischa, friend: will)
Friendship.create!(user: will, friend: mischa)

10.times do |i|
	User.create!(
		username: Faker::Internet.username,
		first_name: Faker::Name.first_name,
		last_name: Faker::Name.last_name,
		password: "1111",
		email: Faker::Internet.email,
		avatar: Faker::Avatar.image
	)
end

10.times do |i|
	Item.create(
		name: Faker::Commerce.product_name,
		requested: false,
		status: "home",
		description: Faker::Lorem.sentence(word_count: 10),
		owner: jeff,
		image: "https://www.thoughtco.com/thmb/RQa7PCRIvyeuDFv_reINweTGfVI=/1885x1414/smart/filters:no_upscale()/GettyImages-1097037546-35e5377d07704fa69c8ce93833b7afdd.jpg"
	)
end

10.times do |i|
	Item.create(
		name: Faker::Commerce.product_name,
		requested: false,
		status: "home",
		description: Faker::Lorem.sentence(word_count: 10),
		owner: mischa,
		image: "https://www.ikea.com/us/en/images/products/lauters-table-lamp-with-led-bulb-ash-white__0879402_pe714879_s5.jpg"
	)
end

10.times do |i|
	Item.create(
		name: Faker::Commerce.product_name,
		requested: false,
		status: "home",
		description: Faker::Lorem.sentence(word_count: 10),
		owner: will,
		image: "https://cdn11.bigcommerce.com/s-uem5l16ozh/images/stencil/original/x/49mm_bouncy_balls%20category%20thumbnail__63591.original.jpg"
	)
end

puts "seeding done"

