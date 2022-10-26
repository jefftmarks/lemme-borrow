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
			{friendRequests.length === 0 ? (
				<span style={{fontSize: "1rem", color: "var(--speed-cadet"}}>&bull; &bull; &bull;</span>
			) : null}
		</>
	);
}

export default FriendRequests;