import React from "react";
import FriendCard from "./FriendCard";
import { Link } from "react-router-dom";
import "./MyFriends.css";

function MyFriends({ friends, showFriends, setShowFriends, profile }) {

	// Conditionally render edit profile modal
	if (!showFriends) {
		return null;
	}

	return (
		<div id="my-friends">
			<div id="friends-container">
				<div id="my-friends-header">
					<h2>{profile.is_active ? "My Friends" : `${profile.user.first_name}'s Friends`}</h2>
					<span onClick={() => setShowFriends(false)}>X</span>
				</div>
				<div id="friends-list">
					{friends.map((friend) => (
						<Link
							key={friend.id}
							to={`/user/${friend.id}`}
							onClick={() => setShowFriends(false)}
						>
							<FriendCard friend={friend}/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

export default MyFriends;