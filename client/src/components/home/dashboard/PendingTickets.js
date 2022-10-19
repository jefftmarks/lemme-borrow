import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function PendingTickets({ activeUser }) {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		fetch(`/tickets/requests/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => {
						const sortedTickets = tickets.sort((a, b) => {
							return a.created_at.localeCompare(b.created_at);
						});
						setTickets(sortedTickets);
					});
				} else {
					res.json().then((data) => console.log(data))
				}
			})
	}, [activeUser]);

	return (		
		<div className="notifications-list">
			{tickets.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
						status={"pending"}
				/></Link>
			))}
		</div>
	);
}

export default PendingTickets;