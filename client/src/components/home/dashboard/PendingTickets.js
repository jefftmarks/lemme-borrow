import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function PendingTickets({ pendingTickets }) {

	return (		
		<>
			{pendingTickets.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
						status={"pending"}
					/>
				</Link>
			))}
		</>
	);
}

export default PendingTickets;