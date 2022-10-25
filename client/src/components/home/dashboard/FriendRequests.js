import React from "react";
import FriendRequestCard from "./FriendRequestCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function FriendRequests({ friendRequests }) {

	return (
		<>
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
		</>
	);
}

export default FriendRequests;