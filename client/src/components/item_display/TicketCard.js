import React from "react";
import { Link } from "react-router-dom";
import "./TicketCard.css"

function TicketCard({ ticket, activeUser, setItem }) {

	const { borrower, owner, return_date, overdue, status } = ticket;

	// ---------- Conditionally Render Message ----------
 
	function renderMessage() {
		// If not your item
		if (borrower.id === activeUser.id) {
			// If ticket has yet to be approved
			if (status === "requested") {
				return "You've requested to borrow this item"
			// If you've been waitlisted
			} else if (status === "waitlisted") {
				return "You're on the waitlist to borrow this item"
			// If ticket request has been approved
			} else if (status === "approved") {
				return `${owner.first_name} has promised to lend you this item`
			// You're currently borrowing itme and it's overdue
			} else if (overdue) {
				return "You're currently borrowing this item, and it's overdue!"
			// Otherwise, user is currently borrowing item, and item is not overdue
			} else {
				return "You're currently borrowing this item"
			}
		// If your item
		} else {
			// Ticket has been requested but user has yet to approve
			if (status === "requested") {
				return `${borrower.first_name} has requested to borrow this item`
			// Additional users have requested to borrow item
			} else if (status === "waitlisted") {
				return `${borrower.first_name} has been waitlisted to borrow this item`
			// You've approved borrow request
			} else if (status === "approved") {
				return `You've promised to lend this item to ${borrower.first_name}`
			} else if (overdue) {
			// Item is on loan and overdue
				return `${borrower.first_name} was supposed to return this item on ${return_date}!`
			} else {
				// Item is currently on loan but not overdue
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