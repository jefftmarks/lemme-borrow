Item.destroy_all
ItemTag.destroy_all
Tag.destroy_all

FriendRequest.destroy_all
Friendship.destroy_all

User.destroy_all

require 'faker'

puts "seeding starting"

20.times do |i|
	User.create!(
		username: Faker::Internet.username,
		first_name: Faker::Name.first_name,
		last_name: Faker::Name.last_name,
		password: "1111",
		email: Faker::Internet.email,
		avatar: Faker::Avatar.image
	)
end

tag_list = ["book", "clothing", "red", "orange", "yellow", "green", "blue", "purple", "toy", "game", "tool", "dvd", "appliance", "kitchen", "halloween", "shirt", "food", "sci-fi", "garden", "formal", "casual", "dress", "school", "art", "car", "pet", "kids", "backyard", "furniture", "cleaning", "literature", "new", "used", "party"]

tag_list.each { |tag| Tag.create!(name: tag) }

images = ["https://i.ebayimg.com/images/g/~JkAAOSwF~Vhz8pb/s-l500.jpg", "https://media.cnn.com/api/v1/images/stellar/prod/radrunner-beauty-shot-ioaded.jpg?q=h_901,w_1599,x_0,y_0", "https://m.media-amazon.com/images/I/51sPQs04ibL._SY580_.jpg", "https://d3525k1ryd2155.cloudfront.net/h/055/605/1061605055.0.x.jpg", "https://api.time.com/wp-content/uploads/2021/06/IMG_3810.jpeg", "https://cdn.runrepeat.com/storage/gallery/product_primary/36703/nike-kyrie-7-profile-15970108-380.jpg", "https://www.robertgavora.com/pictures/32881.JPG?v=1545156227", "https://electrek.co/wp-content/uploads/sites/3/2022/03/possway-t3-header-1.jpg?quality=82&strip=all&w=1600", "https://i.ebayimg.com/images/g/fGMAAOSwvRlhm1-B/s-l500.jpg", "https://i.ebayimg.com/images/g/sHAAAOSwe79gD0SP/s-l1600.jpg", "https://i.ebayimg.com/images/g/~bgAAOSwyHhh9FKa/s-l500.jpg", "https://cdn.thewirecutter.com/wp-content/uploads/2019/04/lawnmowers-2019-lowres-0557.jpg?auto=webp&quality=60&width=570", "https://media-photos.depop.com/b0/14864161/1202853546_c82abe28b551423cac32fa45178bd83c/P0.jpg", "https://media-photos.depop.com/b0/10204036/1304074681_164cc39e4114475cb89ba248328a2e54/P0.jpg", "https://media-photos.depop.com/b0/4921322/1313054278_6c05478a39bf4c51ae4173860509e889/P0.jpg", "https://media-photos.depop.com/b1/28177770/1383761806_3057b0e152f04b75a621f8180eb7c89b/P0.jpg", "https://m.media-amazon.com/images/I/51+Wmtc7PYL._AC_SY780_.jpg", "https://cdn.shopify.com/s/files/1/0522/7685/4977/products/image_cfc483dd-a420-4aa3-88b1-1b5bcef92e13_grande.jpg?v=1660190125", "https://www.act2books.com/assets/images/product/043191_1.jpg", "https://i.ebayimg.com/images/g/ZmUAAOSwYmliM4pj/s-l1600.jpg", "https://cdn.thewirecutter.com/wp-content/media/2021/09/watering-can-2048px-testing.jpg", "https://media-photos.depop.com/b0/27491178/1113367185_e46f90000a604b9386a0d020e5e9cb7f/P0.jpg", "https://media-photos.depop.com/b0/10405712/1289318060_d1b3dd8b91914cb88b719354f99d731b/P0.jpg", "https://media-photos.depop.com/b0/14146726/1310415622_478585c402f44f5492da8594d07fc911/P0.jpg"]

50.times do |i|
	Item.create(
		name: Faker::Commerce.product_name,
		status: "home",
		description: Faker::Lorem.sentence(word_count: 10),
		owner: User.all.sample,
		image: images.sample
	)
end

Item.all.each do |item|
	tags = Tag.all.sample(3)
	ItemTag.create!(item: item, tag: tags[0])
	ItemTag.create!(item: item, tag: tags[1])
	ItemTag.create!(item: item, tag: tags[2])
end

# --------------------

jeff= User.create!(
	username: "jeffsworld",
	first_name: "Jeff",
	last_name: "Marks",
	password: "1111",
	email: "jeff@jeff.com",
	avatar: "https://www.treehugger.com/thmb/3mxO05gtnKsv4rWz3f9Oy-_j4PQ=/2121x1193/smart/filters:no_upscale()/GettyImages-1347289943-f3893070c6d5402e8af818fa93945d0b.jpg"
)

mischa = User.create!(
	username: "planet_mischa",
	first_name: "Mischa",
	last_name: "Aletta",
	password: "1111",
	email: "mischa@mischa.com",
	avatar: "https://static01.nyt.com/images/2017/04/06/business/00navient-voices2/00navient-voices2-jumbo.jpg"
)

will = User.create!(
	username: "dub_k",
	first_name: "Will",
	last_name: "Kempner",
	password: "1111",
	email: "will@will.com",
	avatar: "https://f4.bcbits.com/img/0004493613_20.jpg"
)

User.create!(
	username: "lilith",
	first_name: "Lilia",
	last_name: "Perez",
	password: "1111",
	email: "lilia@lilia.com",
	avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQHkS9rmJX8KeQ/profile-displayphoto-shrink_800_800/0/1535678639728?e=1671667200&v=beta&t=3-qkagcNJpvh0Rcyqr3SG8_5droMcgPZIz3khbfW9As"
)

friendship_1a = Friendship.create!(user: jeff, friend: mischa)
friendship_1b = Friendship.create!(user: mischa, friend: jeff, corresponding_friendship: friendship_1a)
friendship_1a.update!(corresponding_friendship: friendship_1b )

friendship_2a = Friendship.create!(user: jeff, friend: will)
friendship_2b = Friendship.create!(user: will, friend: jeff, corresponding_friendship: friendship_2a)
friendship_2a.update!(corresponding_friendship: friendship_2b )

friendship_3a = Friendship.create!(user: will, friend: mischa)
friendship_3b = Friendship.create!(user: mischa, friend: will, corresponding_friendship: friendship_3a)
friendship_3a.update!(corresponding_friendship: friendship_3b )

puts "seeding done"
