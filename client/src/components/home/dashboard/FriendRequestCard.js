import React from "react";
import "./NotificationCard.css";

function FriendRequestCard({ request }) {

	const { requester } = request;

	return (
		<div className="notification-card friend-request-card">
			<img src={requester.avatar} alt="item" />
			{requester.first_name} {requester.last_name} wants to be your friend!
		</div>
	);
}

export default FriendRequestCard;