import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function ActiveBorrows({ borrows }) {

	return (		
		<>
			{borrows.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
				/></Link>
			))}
			{borrows.length === 0 ? (
				<span style={{fontSize: "1rem", color: "var(--speed-cadet"}}>&bull; &bull; &bull;</span>
			) : null}
		</>
	);
}

export default ActiveBorrows;