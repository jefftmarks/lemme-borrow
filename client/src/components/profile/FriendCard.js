import React from "react";
import "./FriendCard.css";

function FriendCard({ friend, setShowFriends }) {
	return (
		<div id="friend-card">
			<img src={friend.avatar} alt="avatar"/>
			<div id="friend-card-info">
				<h2>{friend.first_name}</h2>
				<div id="friend-card-details">
				</div>
			</div>
		</div>
	);
}

export default FriendCard;