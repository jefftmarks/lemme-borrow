import React from "react";
import Controls from "./Controls";
import { useNavigate } from "react-router-dom";
import "./CommandCenter.css"

function CommandCenter({ ticket, setTicket, isOwner, activeUser, messages, setMessages }) {

	const { item, owner } = ticket;

	const navigate = useNavigate();

	// ---------- Undo or Decline Request ----------

	function handleDeleteTicket() {
		fetch(`/tickets/close/${ticket.id}/user/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((data) => {
						navigate(`/user/${ticket.owner.id}`)
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Approve Request ----------

	function handleApproveTicket() {
		fetch(`/tickets/approve/${ticket.id}`, {
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

	// ---------- Received Item ----------

	function handleReceiveItem() {
		fetch(`/tickets/receive/${ticket.id}`, {
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
			<div id="command-header">
				<img src={item.image} alt={item.name} />
				<h2>{item.name}</h2>
				<p>Belongs to {isOwner ? "You" : owner.first_name}</p>
				
				<p>"{item.description}"</p>
				
			</div>

			<Controls 
				ticket={ticket}
				isOwner={isOwner}
				onClickDelete={handleDeleteTicket}
				onClickApprove={handleApproveTicket}
				onClickReceive={handleReceiveItem}
			/>
		</div>
	);
}

export default CommandCenter;