import React from "react";
import TicketCard from "./TicketCard";
import "./ItemTickets.css"

function ItemTickets({ tickets }) {
	
	return (
		<div className="tickets-container">
			{tickets.map((ticket) => (
				<TicketCard
					key={ticket.id}
					ticket={ticket}
				/>
			))}
		</div>
	);
}

export default ItemTickets;