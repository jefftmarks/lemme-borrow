import React from "react";
import "./Controls.css"

function Controls({ ticket, isOwner, onClickDelete, onClickApprove, onClickReceive }) {

	function renderButtons() {
		// If not your item
		if (!isOwner) {
			// And owner has not responded yet to your initial request
			if (ticket.status === "requested") {
				return (
					<button onClick={onClickDelete}>
						Cancel Your Pending Request
					</button>
				);
			// Your request has been approved. You can either mark when item is received or delete the ticket
			} else if (ticket.status === "approved") {
				return (
					<>
						<button onClick={onClickReceive}>
								Item Received!
						</button>
						<button onClick={onClickDelete}>
								Decline Request
						</button>
					</>
				);
			}
		// It is your item
		} else {
			// And you've yet to approve or decline the initial request
			if (ticket.status === "requested") {
				return (
					<>
						<button onClick={onClickApprove}>
							Approve Request
						</button>
						<button onClick={onClickDelete}>
							Decline Request
						</button>
					</>
				)
			// You've approved the request, now waiting for borrower to mark as received
			} else if (ticket.status === "approved") {
				return (
					<button onClick={onClickDelete}>
							Decline Request
					</button>
				);
			}
		}
	}

	return (
		<div id="controls">
			{renderButtons()}
		</div>
	);
}

export default Controls;