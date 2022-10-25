import React from "react";
import "./NotificationCard.css";

function FriendRequestCard({ request }) {

	const { requester } = request;

	return (
		<div className="notification-card friend-request-card">
			<div className="img-div"><img src={requester.avatar} alt="item" /></div>
			<p>{requester.first_name} {requester.last_name} wants to be your friend!</p>
		</div>
	);
}

export default FriendRequestCard;