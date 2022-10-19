import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function PendingTickets({ activeUser, setPendingTickets, pendingTickets }) {

	return (		
		<div className="notifications-list">
			{pendingTickets.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
						status={"pending"}
				/></Link>
			))}
			{pendingTickets.length === 0 ? "No pending tickets . . ." : null}
		</div>
	);
}

export default PendingTickets;