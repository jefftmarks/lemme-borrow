# lemmeBorrow

## an app for giving, getting back, and keeping track of your belongings

From the proverbial cup of sugar, to . . .

- The books on your bookshelf

- The clothes in your closet

- The tools in your garage

And more . . .

![Welcome Page](/screenshots/welcome.png)

lemmeBorrow creates a virtual lending library – or [“Library of Things”](https://en.wikipedia.org/wiki/Library_of_Things) – among your in-person and online network of friends.

Items of all shapes and sizes – from a kitchen blender to a last-minute Halloween costume – make themselves available to browse through, borrow, and loan.

lemmeBorrow encourages users to share with members of their community, all while keeping track of who has what and when it's time to give it back.

### Background

This app was created in October 2022 by Jeff Marks as part of a project to practice full-stack web development.

The frontend is built on Javascript and React.

The backend API is built on Ruby on Rails with a PostgreSQL database.

### Model Associations

![Database Associations](/db/assocations.png)

### New Technologies & Goals Met

- Integrated WebSockets through Action Cable to allow for instant messaging and live feed updates
- Streamlined access to state in React components by applying Redux Toolkit and useContext hook
- Described self-referential relationships between models by defining multiple aliases for users and items
- Achieved responsive CSS design by implementing a style guide and developing brand identity


### Features

In its current form, the lemmeBorrow app showcases the following features:

#### Friends

![Friends](/screenshots/search%20friend.png)

Users can search for and send friend requests to other users on lemmeBorrow, building out their network of neighbors to borrow from and items to choose.

#### Cupboards

![Cupboard](/screenshots/cupboard.png)

Users can upload items to their "Cupboard," a collection of belongings through which the user's friends can browse.

#### Tickets

![Ticket](/screenshots/ticket.png)

When a user requests to borrow an item, a ticket is created. The ticket-based system keeps track of:
1. When the item has been promised
2. When the item has been exchanged
3. When the item is due back
4. When the item has been returned

Each ticket also features an instant messenger through which the owner and borrower can converse throughout the duration of the exchange.

#### Dashboard

The dashboard keeps track of all of a user's active tickets – both for items they're currently borrowing and for items of theirs that are currently out on loan. Not to mention, the dashboard tracks when the items are due back and if they're overdue.

#### Feed

Users can browse a live feed of recently uploaded items from their friends.

#### Search

Through a tag-based system, users can search within and outside of their network for other users and items.

Need something to read? A keyword search for "sci-fi" might return a collection of science fiction books available to borrow.

First date and nothing to wear? A keyword search for "red" or "dress" or "large" might return the exact item of clothing you're looking for. And who knew? It belongs to your friend down the street.