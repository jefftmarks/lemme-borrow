import React from "react";
import { Link } from "react-router-dom";
import "./TicketCard.css"

function TicketCard({ ticket, activeUser, setItem }) {

	const { borrower, owner, return_date, overdue, status } = ticket;
 
	function renderMessage() {
		// If not your item
		if (borrower.id === activeUser.id) {
			if (status === "requested") {
				return "You've requested to borrow this item"
			} else if (status === "approved") {
				return `${owner.first_name} has promised to lend you this item`
			} else if (overdue) {
				return "You're currently borrowing this item, and it's overdue!"
			} else {
				return "You're currently borrowing this item"
			}
		// If your item
		} else {
			if (status === "requested") {
				return `${borrower.first_name} has requested to borrow this item`
			} else if (status === "approved") {
				return `You've promised to lend this item to ${borrower.first_name}`
			} else if (overdue) {
				return `${borrower.first_name} was supposed to return this item on ${return_date}!`
			} else {
				return `${borrower.first_name} is currently borrowing this item`
			}
		}
	}

	return (
		<div className="ticket-card">
			<p>{renderMessage()}</p>
			<Link to={`/ticket/${ticket.id}`} onClick={() => setItem(null)}>
				<button>View Ticket</button>
			</Link>
		</div>
	);
}

export default TicketCard;