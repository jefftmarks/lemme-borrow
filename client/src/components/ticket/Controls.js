import React, { useState, useEffect } from "react";
import "./Controls.css";

// Grab current date and reformat to match date input
const today = new Date().toISOString().slice(0, 10);

function Controls({ ticket, isOwner, date, setDate, onClickDelete, onClickApprove, onClickReceive, onSetReturnDate }) {
	const [dateIsChanged, setDateIsChanged] = useState(false);

	const { owner, borrower, return_date, status } = ticket;

	// ---------- Date Handling ----------

	function onChangeDate(e) {
		setDate(e.target.value)
		setDateIsChanged(true);
	}

	function handleSubmitDate(e) {
		e.preventDefault()
		setDateIsChanged(false);
		onSetReturnDate();
	}

	// Reset Submit Button on Date Form if inactive
	useEffect(() => {
		const resetDateForm = setTimeout(() => {
			setDateIsChanged(false);
			setDate(return_date);
		}, 5000);

		return () => {
			clearTimeout(resetDateForm);
		}
	}, [dateIsChanged, ticket] );

	// ---------- Render Control Buttons ----------

	function renderButtons() {

		// ---------- ROLE: BORROWER ----------

		if (!isOwner) {

			// Step 0 - Item is already being requested/borrowed by a different user

			if (status === "waitlisted") {

				// In the meantime, you can cancel your request

				return (
					<>
						<p className="controls-header">This ticket has been waitlisted . . .</p>
						<div className="control-btns">
							<button onClick={onClickDelete}>
								Cancel Your Pending Request
							</button>
						</div>
					</>
				);

			}
		
			// Step 1 - Owner has yet to respond to your request

			else if (status === "requested") {	

				// In the meantime, you can cancel your request

				return (
					<>
						<p className="controls-header">Waiting for {owner.first_name} to respond . . .</p>
						<div className="control-btns">
							<button onClick={onClickDelete}>
								Cancel Your Pending Request
							</button>
						</div>
					</>
				);

			// Step 2 - Your request has been approved

			} else if (status === "approved") {

				// You can either 1) mark when item is received or 2) delete the ticket

				return (
					<>
						<p className="controls-header">Let {owner.first_name} know when you've received the item . . .</p>
						<div className="control-btns">
							<button onClick={onClickReceive}>
									Item Received
							</button>
							<button onClick={onClickDelete}>
									Cancel Request
							</button>
						</div>
					</>
				);

			// Step 3 - You receive the item. No actions.

			} else if (status === "on loan") {

				// No actions

				return (
					<>
						<p className="controls-header">You're currently borrowing this item from {owner.first_name}. The ticket cannot be deleted until the item has been returned.</p>
					</>
				);
		
			} 
		
		// ---------- ROLE: OWNER ----------
		
		} else {

		// Step 0 - Item is already being requested/borrowed by a different user

			if (status === "waitlisted") {

				// In the meantime, you can cancel your request

				return (
					<>
						<p className="controls-header">This ticket has been waitlisted!</p>
						<div className="control-btns">
							<button onClick={onClickDelete}>
								Decline Request
							</button>
						</div>
					</>
				);

			}

		// Step 1 - You have yet to respond to borrower's request

			else if (status === "requested") {

				// You can either 1) approve request or 2) delete the ticket

				return (
					<>
						<p className="controls-header">Respond to {borrower.first_name}'s request . . .</p>
						<div className="control-btns">
							<button onClick={onClickApprove}>
								Approve Request
							</button>
							<button onClick={onClickDelete}>
								Decline Request
							</button>
						</div>
					</>
				);

		// Step 2 - You approved the request

			} else if (status === "approved") {

				// You can 1) delete the ticket. Otherwise, wait for borrower to confirm receipt.

				return (
					<>
						<p className="controls-header">Waiting for {borrower.first_name} to receive the item . . .</p>
						<div className="control-btns">
							<button onClick={onClickDelete}>
									Delete Ticket
							</button>
						</div>
					</>
				);

		// Step 3 - Your item has been received and is being borrowed

			} else if (status === "on loan") {

				// You can either 1) set or reset a return date or 2) mark when the item has been returned

				return (
					<>
						<p className="controls-header">Let us know when you get your item back!</p>
						<div className="control-btns">
							<form className="date-form" onSubmit={handleSubmitDate}>
								{dateIsChanged ? (
									<button className={`date-change-${dateIsChanged}`}>
										Submit
									</button>
								) : (
									<button disabled>Set Desired Return Date</button>
								)}
								<input
									required
									type="date"
									name="return_date"
									min={today}
									value={date}
									onChange={onChangeDate}
								/>
							</form>
							
							<button onClick={onClickDelete}>
								Item Returned! Close Ticket
							</button>
						</div>
					</>
				);
			}
		}
	}

	return (
		<div className="controls">
			{renderButtons()}
		</div>
	);
}

export default Controls;