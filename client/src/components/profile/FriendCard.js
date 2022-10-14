import React from "react";
import "./FriendCard.css";

function FriendCard({ friend }) {
	return (
		<div id="friend-card">
			<h2>{friend.first_name}</h2>
		</div>
	);
}

export default FriendCard;