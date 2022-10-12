Item.destroy_all
ItemTag.destroy_all
Tag.destroy_all

FriendRequest.destroy_all
Friendship.destroy_all

User.destroy_all

puts "seeding starting"

jeff= User.create!(
	username: "jeffsworld",
	first_name: "Jeff",
	last_name: "Marks",
	password_digest: "1111",
	email: "jeff@jeff.com"
)

mischa = User.create!(
	username: "planet_mischa",
	first_name: "Mischa",
	last_name: "Aletta",
	password_digest: "1111",
	email: "mischa@mischa.com"
)

will = User.create!(
	username: "dub_k",
	first_name: "Will",
	last_name: "Kempner",
	password_digest: "1111",
	email: "will@will.com"
)

Friendship.create!(user: jeff, friend: mischa)
Friendship.create!(user: mischa, friend: jeff)

FriendRequest.create!(requester: jeff, receiver: will)

Item.create!(
	name: "Bouncy Ball",
	status: "home",
	description: "Bounces VERY high!",
	owner: jeff,
	tags: [Tag.create!(name: "toy"), Tag.create!(name: "red")]
)

Item.create!(
	name: "Winter Coat",
	status: "on loan",
	description: "Fluffy",
	owner: mischa,
	borrower: jeff,
	tags: [Tag.create!(name: "clothing"), Tag.create!(name: "brown")]
)

puts "seeding done"

