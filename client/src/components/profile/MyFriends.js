import React from "react";
import FriendCard from "./FriendCard";
import "./MyFriends.css";

function MyFriends({ friends, showFriends, setShowFriends, isActiveUser, profile }) {

	// Conditionally render edit profile modal
	if (!showFriends) {
		return null;
	}

	return (
		<div id="my-friends">
			<div id="friends-container">
				<div id="my-friends-header">
					<h2>{isActiveUser ? "My Friends" : `${profile.first_name}'s Friends`}</h2>
					<p onClick={() => setShowFriends(false)}>X</p>
				</div>
				<div id="friends-list">
					{friends.map((friend) => (
						<FriendCard 
							key={friend.id}
							friend={friend}
							setShowFriends={setShowFriends}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default MyFriends;