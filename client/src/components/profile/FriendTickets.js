import React from "react";
import { Link } from "react-router-dom";
import "./FriendTickets.css";

function FriendTickets({ showTickets, setShowTickets }) {

	// Conditionally render edit profile modal
	if (!showTickets) {
		return null;
	}

	return (
		<div id="friend-tickets">
			<div id="friend-tickets-container">
				<div id="friend-tickets-header">
					<h2>Open Tickets</h2>
					<span onClick={() => setShowTickets(false)}>X</span>
				</div>
				<div id="friend-tickets-list">
					{/* {friends.map((friend) => (
						<Link
							key={friend.id}
							to={`/user/${friend.id}`}
							onClick={() => setShowFriends(false)}
						>
							<FriendCard friend={friend}/>
						</Link>
					))} */}
				</div>
			</div>
		</div>
	);
}

export default FriendTickets;