import React, { useEffect, useState } from "react";
import FriendRequestCard from "./FriendRequestCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function FriendRequests({ activeUser }) {
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		fetch(`/friend_requests/user/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((requests) => setRequests(requests));
				} else {
					res.json().then((data) => console.log(data))
				}
			})
	}, [activeUser]);

	return (
		<div className="notifications-list">
			{requests.map((request) => (
				<Link
					to={`/user/${request.requester.id}`}
					key={request.id}
				>
					<FriendRequestCard 
						request={request}
					/>
				</Link>
			))}
		</div>
	);
}

export default FriendRequests;