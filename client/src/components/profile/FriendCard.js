import React from "react";
import { Link } from "react-router-dom";
import "./FriendCard.css";

function FriendCard({ friend, setShowFriends }) {
	return (
		<div id="friend-card">
			<Link to={`/user/${friend.id}`}>
				<img
					src={friend.avatar}
					alt="avatar"
					onClick={() => setShowFriends(false)}
				/>
			</Link>
			<div id="friend-card-info">
				<h2>{friend.first_name}</h2>
			</div>
		</div>
	);
}

export default FriendCard;