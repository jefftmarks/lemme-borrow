import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import "./MyFriends.css";

function MyFriends({ activeUser, showFriends, setShowFriends }) {
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		fetch(`/friendships/user/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((friends) => setFriends(friends));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, []);

	// Conditionally render edit profile modal
	if (!showFriends) {
		return null;
	}

	return (
		<div id="my-friends">
			<div id="friends-container">
				<div id="my-friends-header">
					<h2>My Friends</h2>
					<p onClick={() => setShowFriends(false)}>X</p>
				</div>
				<div id="friends-list">
					{friends.map((friend) => (
						<FriendCard 
							key={friend.id}
							friend={friend}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default MyFriends;