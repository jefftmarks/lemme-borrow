import React from "react";
import { Link } from "react-router-dom";
import "./TicketCard.css"

function TicketCard({ ticket, activeUser }) {

	function renderMessage() {
		// If not your item
		if (ticket.borrower.id === activeUser.id) {
			if (ticket.status === "requested") {
				return "You've requested to borrow this item"
			} else if (ticket.status === "approved") {
				return `${activeUser.first_name} has promised to lend you this item!`
			} else if (ticket.overdue) {
				return "You're currently borrowing this item, and it's overdue!"
			} else {
				return "You're currently borrowing this item"
			}
		// If your item
		} else {
			if (ticket.status === "requested") {
				return `${ticket.borrower.first_name} has requested to borrow this item`
			} else if (ticket.status === "approved") {
				return `You've promised to lend this item to ${ticket.borrower.first_name}`
			} else if (ticket.overdue) {
				return `${ticket.borrower.first_name} was supposed to return this item on ${ticket.return_date}!`
			} else {
				return `${ticket.borrower.first_name} is currently borrowing this item`
			}
		}
	}

	return (
		<div className="ticket-card">
			<p>{renderMessage()}</p>
			<button>View Ticket</button>
		</div>
	);
}

export default TicketCard;