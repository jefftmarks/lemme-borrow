import React, { useState } from "react";
import Controls from "./Controls";
import { useNavigate } from "react-router-dom";
import "./CommandCenter.css"

function CommandCenter({ ticket, setTicket, isOwner, activeUser, messages, setMessages }) {
	const [date, setDate] = useState(ticket.return_date);

	const { item, owner, return_date, id } = ticket;

	const navigate = useNavigate();

	// ---------- Reformat Date ----------

	let formattedDate;

	if (return_date !== "") {
		// reformat date
		let str = return_date;
		let dd;
		let mm;

		if (str[5] === "0") {
			mm = str.slice(6, 7);
		} else {
			mm = str.slice(5, 7);
		}

		if (str[8] === "0") {
			dd = str.slice(9, 10);
		} else {
			dd = str.slice(8, 10);
		}

		let yyyy = str.slice(0, 4);
		formattedDate = `${mm}/${dd}/${yyyy}`;
	}

	// ---------- Undo or Decline Request ----------

	function handleDeleteTicket() {
		fetch(`/tickets/close/${id}/user/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((data) => {
						navigate(`/user/${activeUser.id}`)
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Approve Request ----------

	function handleApproveTicket() {
		fetch(`/tickets/approve/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Receive Item ----------

	function handleReceiveItem() {
		fetch(`/tickets/receive/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Set Return Date ----------

	function handleSetReturnDate() {
		fetch(`/tickets/date/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({return_date: date}),
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

		// ---------- Complete Request ----------

		// function handleCompleteTicket() {
		// 	fetch(`/tickets/complete/${ticket.id}`, {
		// 		method: "PATCH",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	})
		// 		.then((res => {
		// 			if (res.ok) {
		// 				res.json().then((payload) => {
		// 					setTicket(payload.ticket);
		// 					setMessages([payload.message, ...messages])
		// 				});
		// 			} else {
		// 				res.json().then((data) => console.log(data));
		// 			}
		// 		}));
		// }

	return (
		<div id="command">
			<h2>{item.name}</h2>
			<div id="command-header">
				<img src={item.image} alt={item.name} />
				<p>"{item.description}"</p>

				<div id="command-info">
					<p>Owner: {isOwner ? "You" : owner.first_name}</p>
					<p>Return Date: {return_date ? formattedDate : "None"}</p>
				</div>

				{ticket.overdue ? <p>This Item is Overdue!!!</p> : null}
				
			</div>

			<Controls 
				ticket={ticket}
				isOwner={isOwner}
				date={date}
				setDate={setDate}
				onClickDelete={handleDeleteTicket}
				onClickApprove={handleApproveTicket}
				onClickReceive={handleReceiveItem}
				onSetReturnDate={handleSetReturnDate}
			/>
		</div>
	);
}

export default CommandCenter;

// ----------------------------------------

	// // ---------- Owner Offers to Gift Item to Borrower ----------

	// function handleOfferGift() {
	// 	fetch(`/tickets/offer/${ticket.id}`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((res => {
	// 			if (res.ok) {
	// 				res.json().then((payload) => {
	// 					setTicket(payload.ticket);
	// 					setMessages([payload.message, ...messages])
	// 				});
	// 			} else {
	// 				res.json().then((data) => console.log(data));
	// 			}
	// 		}));
	// }

	// // ---------- Decline Gift ----------

	// function handleDeclineGift() {
	// 	fetch(`/tickets/decline_gift/${ticket.id}`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((res => {
	// 			if (res.ok) {
	// 				res.json().then((payload) => {
	// 					setTicket(payload.ticket);
	// 					setMessages([payload.message, ...messages])
	// 				});
	// 			} else {
	// 				res.json().then((data) => console.log(data));
	// 			}
	// 		}));
	// }

	// // ---------- Accept Gift ----------

	// function handleAcceptGift() {
	// 	fetch(`/tickets/accept_gift/${ticket.id}`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((res => {
	// 			if (res.ok) {
	// 				res.json().then((data) => {
	// 					navigate(`/user/${activeUser.id}`)
	// 				});
	// 			} else {
	// 				res.json().then((data) => console.log(data));
	// 			}
	// 		}));
	// }