import React from "react";
import TicketCard from "./TicketCard";
import "./ItemTickets.css"

function ItemTickets({ tickets, activeUser }) {
	return (
		<div className="tickets-container">
			{tickets.map((ticket) => (
				<TicketCard
					key={ticket.id}
					ticket={ticket}
					activeUser={activeUser}
				/>
			))}
		</div>
	);
}

export default ItemTickets;