import React from "react";
import "./FriendCard.css";

function FriendCard({ friend }) {
	return (
		<div className="friend-card">
			<div><img src={friend.avatar} alt="avatar" /></div>
			<p>{friend.first_name} {friend.last_name}</p>
		</div>
	);
}

export default FriendCard;