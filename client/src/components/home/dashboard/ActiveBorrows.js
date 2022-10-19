import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function ActiveBorrows({ activeUser, borrows, setBorrows }) {

	return (		
		<div className="notifications-list">
			{borrows.length === 0 ? "You're not borrowing any items . . . Why not?" : null}
			{borrows.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
				/></Link>
			))}
			{borrows.length === 0 ? "You're not borrowing any items . . . Why not?" : null}
		</div>
	);
}

export default ActiveBorrows;