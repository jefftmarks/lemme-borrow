Item.destroy_all
ItemTag.destroy_all
Tag.destroy_all

FriendRequest.destroy_all
Friendship.destroy_all

User.destroy_all

require 'faker'

puts "seeding starting"

# ---------- Create Users ----------

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
	avatar: "https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"
)

will = User.create!(
	username: "dub_k",
	first_name: "Will",
	last_name: "Kempner",
	password: "1111",
	email: "will@will.com",
	avatar: "https://www.akc.org/wp-content/uploads/2021/01/German-Shepherd-Dog-head-portrait-indoors-500x486.jpeg"
)

lilia = User.create!(
	username: "lilith",
	first_name: "Lilia",
	last_name: "Perez",
	password: "1111",
	email: "lilia@lilia.com",
	avatar: "https://www.gardendesign.com/pictures/images/675x529Max/site_3/helianthus-yellow-flower-pixabay_11863.jpg"
)

# ---------- Create Friendships ----------

friendship_1a = Friendship.create!(user: jeff, friend: mischa)
friendship_1b = Friendship.create!(user: mischa, friend: jeff, corresponding_friendship: friendship_1a)
friendship_1a.update!(corresponding_friendship: friendship_1b)

friendship_2a = Friendship.create!(user: jeff, friend: will)
friendship_2b = Friendship.create!(user: will, friend: jeff, corresponding_friendship: friendship_2a)
friendship_2a.update!(corresponding_friendship: friendship_2b)

friendship_3a = Friendship.create!(user: will, friend: mischa)
friendship_3b = Friendship.create!(user: mischa, friend: will, corresponding_friendship: friendship_3a)
friendship_3a.update!(corresponding_friendship: friendship_3b)

# ---------- Create Friend Requests ----------

FriendRequest.create!(requester: lilia, receiver: jeff)

# ---------- Create Tags ----------

tags = ["book",
 "clothing",
 "red",
 "orange",
 "yellow",
 "green",
 "blue",
 "purple",
 "toy",
 "game",
 "tool",
 "dvd",
 "appliance",
 "kitchen",
 "halloween",
 "shirt",
 "food",
 "sci-fi",
 "garden",
 "formal",
 "casual",
 "dress",
 "school",
 "art",
 "car",
 "pet",
 "kids",
 "backyard",
 "furniture",
 "cleaning",
 "literature",
 "new",
 "used",
 "party",
 "russia",
 "russian literature",
 "short stories",
 "asimov",
 "cyberpunk",
 "brazil",
 "kenya",
 "thriller",
 "china",
 "blender",
 "sweater",
 "clothes",
 "costume",
 "drill",
 "medium",
 "bathing suit",
 "swimwear",
 "vacuum",
 "short-stories",
 "sci-fi, book",
 "shoes",
 "nike",
 "projector",
 "tech",
 "movies",
 "large",
 "music",
 "amp",
 "guitar",
 "bike",
 "xbox",
 "halo",
 "video game",
 "jacket",
 "leather",
 "frisbee",
 "midi",
 "keyboard",
 "instrument",
 "guitar pedal",
 "microphone",
 "sports",
 "basketball",
 "nintendo",
 "shovel",
 "winter",
 "snow",
 "chinese literature"
]

 tags.each do |value|
	Tag.create!(name: value)
 end

 # ---------- Create Items ----------

 Item.create!(
	name: "Diaboliad and Other Stories",
  description: "By Mikhail Bulgakov",
  image: "https://i.ebayimg.com/images/g/mWwAAOSw52li4A5I/s-l500.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "russia"), Tag.find_by(name: "russian literature"), Tag.find_by(name: "short stories")]
 )

 Item.create!(
	name: "Jennie Gerhardt",
  description: "By Theodore Dreiser",
  image: "https://pictures.abebooks.com/isbn/9781530962792-us.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book")]
 )

 Item.create!(
	name: "Chapterhouse Dune",
  description: "By Frank Herbert",
  image: "https://static.tvtropes.org/pmwiki/pub/images/c84f6b56f48ec3420827824638d226d5.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi")]
 )

 Item.create!(
	name: "The Golden Space",
  description: "By Pamela Sargent",
  image: "https://m.media-amazon.com/images/I/51+Wmtc7PYL._AC_SY780_.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi")]
 )

 Item.create!(
	name: "The Left Hand of Darkness",
  description: "By Ursula K. Le Guin",
  image: "https://d3525k1ryd2155.cloudfront.net/h/055/605/1061605055.0.x.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi")]
 )

 Item.create!(
	name: "Spongebob Swim Trunks",
  description: "Size Medium",
  image: "https://i5.walmartimages.com/asr/b16772bf-50a7-4310-9874-c0483032da0d_1.17df69eebda4b12bd12d67f245901fb9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "clothes"), Tag.find_by(name: "medium"), Tag.find_by(name: "bathing suit"), Tag.find_by(name: "swimwear")]
	
 )

 Item.create!(
	name: "Ancient, My Enemy",
  description: "By Gordon R. Dickson",
  image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1285203854l/2152469.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi"), Tag.find_by(name: "short stories")]
 )

 Item.create!(
	name: "Green Sweater",
  description: "Size Large",
  image: "https://stylesatlife.com/wp-content/uploads/2018/04/Cable-knit-sweater.jpg.webp",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "green"), Tag.find_by(name: "sweater"), Tag.find_by(name: "clothes"), Tag.find_by(name: "large")]
 )

 Item.create!(
	name: "Guitar Amp",
  description: "",
  image: "https://cdn.mos.cms.futurecdn.net/fzZXdEcRuX6cr5CZexmuwn.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "music"), Tag.find_by(name: "amp"), Tag.find_by(name: "guitar")]
 )

 Item.create!(
	name: "Halo 3",
  description: "For Xbox",
  image: "https://i.ebayimg.com/images/g/sHAAAOSwe79gD0SP/s-l1600.jpg",
  owner: mischa,
	status: "home",
	tags: [Tag.find_by(name: "xbox"), Tag.find_by(name: "halo"), Tag.find_by(name: "video game"), Tag.find_by(name: "game")]
 )

 Item.create!(
	name: "Mic Stand",
  description: "",
  image: "https://www.mspot.com/wp-content/uploads/2019/02/Microphone-optimized-and-ready-to-record-in-recording-studio-e1591733461526.jpg",
  owner: will,
	status: "home",
	tags: [Tag.find_by(name: "music"), Tag.find_by(name: "microphone"), Tag.find_by(name: "instrument")]
 )

 Item.create!(
	name: "Basketball",
  description: "",
  image: "https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/images/2022/03/08/GettyImages-1311019527_0.jpg?itok=1WDY-6aW",
  owner: will,
	status: "home",
	tags: [Tag.find_by(name: "sports"), Tag.find_by(name: "basketball")]
 )

 frisbee = Item.create!(
	name: "Frisbee",
  description: "My favorite frisbee",
  image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Frisbee_090719.jpg",
  owner: mischa,
	borrower: jeff,
	status: "home",
	tags: [Tag.find_by(name: "toy"), Tag.find_by(name: "game"), Tag.find_by(name: "frisbee")]
 )

 Item.create!(
	name: "Pebble in the Sky",
  description: "By Isaac Asimov",
  image: "https://m.media-amazon.com/images/I/5149TXg3QvL._AC_SY780_.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "sci-fi"), Tag.find_by(name: "book"), Tag.find_by(name: "asimov")]
 )

 Item.create!(
	name: "Tower of Glass",
  description: "By Robert Silverberg",
  image: "http://prodimage.images-bn.com/pimages/9781497632493_p0_v3_s1200x630.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "sci-fi"), Tag.find_by(name: "book")]
 )

 Item.create!(
	name: "Red Azalea",
  description: "By Anchee Min",
  image: "https://m.media-amazon.com/images/I/41oF1RS94qL._AC_SY780_.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "sci-fi"), Tag.find_by(name: "book"), Tag.find_by(name: "asimov")]
 )

 Item.create!(
	name: "Immersion Blender",
  description: "Works great for making soup",
  image: "https://cdn.thewirecutter.com/wp-content/uploads/2018/08/immersionblenders-lowres-0700.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "china"), Tag.find_by(name: "book")]
 )

 Item.create!(
	name: "Power Drill",
  description: "",
  image: "https://www.cnet.com/a/img/resize/15ecbf179b77bfa4d3382049ef13fa17c97a1be5/hub/2020/10/23/6a50c935-52fb-4b65-ba0a-4188f9197a66/steve-brushless-drills-1.jpg?auto=webp&fit=crop&height=236&width=420",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "tool"), Tag.find_by(name: "drill")]
 )

 Item.create!(
	name: "Winesburg, Ohio",
  description: "By Sherwood Anderson",
  image: "https://images.bwbcovers.com/045/Winesburg-Ohio-9780451525697.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "short stories")]
 )

 Item.create!(
	name: "Electric Bike",
  description: "",
  image: "https://media.cnn.com/api/v1/images/stellar/prod/radrunner-beauty-shot-ioaded.jpg?q=h_901,w_1599,x_0,y_0",
  owner: mischa,
	status: "home",
	tags: [Tag.find_by(name: "bike")]
 )

 Item.create!(
	name: "Midi Keyboard",
  description: "Can provide USB cable",
  image: "https://keyboardkraze.com/wp-content/uploads/2019/10/thumbnail-6-1-1024x682.jpeg",
  owner: will,
	status: "home",
	tags: [Tag.find_by(name: "music"), Tag.find_by(name: "midi"), Tag.find_by(name: "keyboard"), Tag.find_by(name: "instrument")]
 )
 
 Item.create!(
	name: "Distortion Pedal",
  description: "",
  image: "https://i.ebayimg.com/images/g/6PkAAOSwwvZfFULA/s-l640.jpg",
  owner: will,
	status: "home",
	tags: [Tag.find_by(name: "music"), Tag.find_by(name: "guitar"), Tag.find_by(name: "guitar pedal")]
 )

 Item.create!(
	name: "All Tomorrow's Parties",
  description: "By William Gibson",
  image: "https://m.media-amazon.com/images/I/41IyTQeglKL._AC_SY780_.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi"), Tag.find_by(name: "cyberpunk")]
 )

 Item.create!(
	name: "The Forge of God",
  description: "By Greg Bear",
  image: "https://marzaat.files.wordpress.com/2016/05/the-forge-of-god.jpg?w=636",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi")]
 )

 Item.create!(
	name: "Shepherds of the Night",
  description: "By Jorge Amado",
  image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1360158838l/802468.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "brazil")]
 )

 Item.create!(
	name: "Pop. 1280",
  description: "By Jim Thompson",
  image: "https://litreactor.com/sites/default/files/images/column/2020/10/19161888.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "thriller")]
 )

 robots_of_dawn = Item.create!(
	name: "The Robots of Dawn",
  description: "By Isaac Asimov",
  image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1351030933l/41810.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi"), Tag.find_by(name: "asimov")]
 )

 red_sweater = Item.create!(
	name: "Red Sweater",
  description: "My favorite sweater",
  image: "https://media.gq.com/photos/586d3bbd2a61c7be7c47a23c/1:1/w_700,h_700,c_limit/saint%20laurent.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "red"), Tag.find_by(name: "sweater"), Tag.find_by(name: "clothes")]
 )

 Item.create!(
	name: "Hoover Vacuum Cleaner",
  description: "",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQ_i33Fbg_Yj4aO0p1OJOwGGQiFmZmmxVr6m6WWGfi0lYFPfyfWBKVeixA6B8gRU-9A0&usqp=CAU",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "tool"), Tag.find_by(name: "vacuum")]
 )

 Item.create!(
	name: "Lord Jim",
  description: "By Joseph Conrad",
  image: "https://pictures.abebooks.com/isbn/9788124800294-us.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "literature")]
 )

 Item.create!(
	name: "The Gods Themselves",
  description: "By Isaac Asimov",
  image: "https://m.media-amazon.com/images/I/5159FS381AL.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi"), Tag.find_by(name: "asimov")]
 )

 Item.create!(
	name: "Snow Crash",
  description: "By Neal Stephenson",
  image: "https://m.media-amazon.com/images/I/51nbYwWXNuL._AC_SY780_.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "book"), Tag.find_by(name: "sci-fi"), Tag.find_by(name: "cyberpunk")]
 )

 Item.create!(
	name: "Nike Shoes",
  description: "Size 12 Mens",
  image: "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/f55bf732-7fa9-4b38-8464-3332d97f879a/nike%E2%80%99s-best-casual-shoes-for-everyday-wear.jpg",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "shoes"), Tag.find_by(name: "nike")]
 )

 Item.create!(
	name: "Home Projector",
  description: "I can provide HDMI cables too",
  image: "https://mediaserver.goepson.com/ImConvServlet/imconv/ce971ecf8258fe98cbad70762d5912fbb0df3e24/1200Wx1200H?use=banner&assetDescr=HC2250-V11HA87020_top-headon_690x460",
  owner: jeff,
	status: "home",
	tags: [Tag.find_by(name: "projector"), Tag.find_by(name: "tech"), Tag.find_by(name: "movies")]
 )

 Item.create!(
	name: "Jean Jacket",
  description: "Size Medium",
  image: "https://www.girlscoutshop.com/site/Product_Images/0605_main-01.default.jpg",
  owner: lilia,
	status: "home",
	tags: [Tag.find_by(name: "clothes"), Tag.find_by(name: "medium"), Tag.find_by(name: "jacket")]
 )

 Item.create!(
	name: "Air Fryer",
  description: "",
  image: "http://www.pamperedchef.com/iceberg/com/product/100194-lg.jpg",
  owner: mischa,
	status: "home",
	tags: [Tag.find_by(name: "kitchen")]
 )

 Item.create!(
	name: "Blue Leather Jacket",
  description: "Size Large",
  image: "https://www.jacketscreator.com/wp-content/uploads/2020/09/blue-thriller-jacket.jpg",
  owner: mischa,
	status: "home",
	tags: [Tag.find_by(name: "blue"), Tag.find_by(name: "clothes"), Tag.find_by(name: "jacket"), Tag.find_by(name: "large"), Tag.find_by(name: "leather")]
 )

 Item.create!(
	name: "Nintendo Switch",
  description: "",
  image: "https://www.cnet.com/a/img/resize/b1a74f6ae6560a7ba93c4943e2fe1769f30a96e9/hub/2017/02/23/5bf20b56-a1a7-4587-868f-f9f848dbc7bf/nintendo-switch-console-4923.jpg?auto=webp&width=768",
  owner: lilia,
	status: "home",
	tags: [Tag.find_by(name: "nintendo"), Tag.find_by(name: "game"), Tag.find_by(name: "video game")]
 )

 # ---------- Create Tickets ----------

 prev_date = Date.today.prev_day(3).to_time.iso8601.slice(0, 10)
 upcoming_date = Date.today.next_day(7).to_time.iso8601.slice(0, 10)

 Ticket.create!(
	status: "on loan",
  item: frisbee,
  owner: mischa,
  borrower: jeff,
  return_date: prev_date,
  overdue: true
 )

 Ticket.create!(
	status: "requested",
  item: red_sweater,
  owner: jeff,
  borrower: mischa,
  return_date: "",
  overdue: false
 )

 Ticket.create!(
	status: "on loan",
  item: robots_of_dawn,
  owner: jeff,
  borrower: will,
  return_date: upcoming_date,
  overdue: false
 )


puts "seeding done"