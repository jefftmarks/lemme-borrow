import React from "react";
import TicketCard from "./TicketCard";
import "./ItemTickets.css"

function ItemTickets({ tickets, activeUser }) {
	return (
		<div id="tickets-container">
			<h3>Open Tickets</h3>
			<div id="tickets-list">
				{tickets.map((ticket) => (
					<TicketCard
						key={ticket.id}
						ticket={ticket}
						activeUser={activeUser}
					/>
				))}
			</div>
		</div>
	);
}

export default ItemTickets;