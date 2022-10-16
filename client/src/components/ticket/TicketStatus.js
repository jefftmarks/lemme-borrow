import React from "react";
import "./TicketStatus.css"

function TicketStatus({ ticket, isOwner, right}) {
	const { owner, borrower } = ticket;

	function renderStatus() {
		// If not your item
		if (!isOwner) {
			if (ticket.status === "requested") {
				return (
					`You've requested to borrow from ${owner.first_name}. Waiting for ${owner.first_name} to approve your request.`
				);
			}
		}
	}

	return (
		<div id="ticket-status">
			<div id="owner-borrower">
				<p>You</p>
				<p>{right.first_name}</p>
			</div>
			<p id="status-message">{renderStatus()}</p>
		</div>
	);
}

export default TicketStatus;