import React from "react";
import FriendRequestCard from "./FriendRequestCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function FriendRequests({ activeUser, setFriendRequests, friendRequests }) {

	return (
		<div className="notifications-list">
			{friendRequests.map((request) => (
				<Link
					to={`/user/${request.requester.id}`}
					key={request.id}
				>
					<FriendRequestCard 
						request={request}
					/>
				</Link>
			))}
			{friendRequests.length === 0 ? "No new requests . . ." : null}
		</div>
	);
}

export default FriendRequests;