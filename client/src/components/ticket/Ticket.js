import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ActiveUserContext } from "../../context/active_user";
import ItemPanel from "./ItemPanel";
import Messenger from "./messenger/Messenger";
import "./Ticket.css";

function Ticket() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [ticket, setTicket] = useState(null);
	const [isOwner, setIsOwner] = useState(false);

	const params = useParams();

	// ---------- Render Ticket ----------

	useEffect(() => {
		if (activeUser) {
			fetch(`/api/tickets/${params.ticket_id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((ticket) => {
						setTicket(ticket);
						// Determine whether active user is owner or borrower
						if (ticket.owner.id === activeUser.id) {
							setIsAuthorized(true);
							setIsOwner(true);
						} else if (ticket.borrower.id === activeUser.id) {
							setIsAuthorized(true);
						}
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
		}
	}, [activeUser, params]);

	// ---------- Authorization and Page Rendering ----------

	if (!isAuthorized) {
		return <p className="ticket-not-found">Ticket Not Found or No Longer Exists</p>
	}

	if (!ticket) {
		return <p className="ticket-not-found">Loading . . .</p>
	}

	return (
		<div className="ticket">
			<ItemPanel
				ticket={ticket}
				setTicket={setTicket}
				isOwner={isOwner}
			/>
			<Messenger
				ticket={ticket}
				isOwner={isOwner}
				params={params}
		/>
		</div>
	);
}

export default Ticket;