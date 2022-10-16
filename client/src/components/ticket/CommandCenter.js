import React from "react";
import Controls from "./Controls";
import { useNavigate } from "react-router-dom";
import "./CommandCenter.css"

function CommandCenter({ ticket, isOwner, activeUser }) {
	const { item, owner } = ticket;

	const navigate = useNavigate();

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
				onClickUndo={handleDeleteTicket}
			/>
		</div>
	);
}

export default CommandCenter;