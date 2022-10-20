import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Notifications.css";

function ActiveLoans({ activeUser, loans, setLoans }) {

	return (		
		<div className="notifications-list">	
			{loans.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
						status={"loan"}
				/></Link>
			))}
			{loans.length === 0 ? "You're not lending any of your items . . . Don't be stingy!" : null}
		</div>
	);
}

export default ActiveLoans;