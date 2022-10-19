import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function ActiveBorrows({ activeUser }) {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		fetch(`/tickets/borrows/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => setTickets(tickets));
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
				/></Link>
			))}
		</div>
	);
}

export default ActiveBorrows;