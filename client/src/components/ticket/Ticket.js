import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import CommandCenter from "./CommandCenter";
import Messenger from "./messenger/Messenger";
import "./Ticket.css";

function Ticket({ activeUser }) {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [ticket, setTicket] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [messages, setMessages] = useState([]);

	const params = useParams();

	// ---------- Render Ticket ----------

	useEffect(() => {
		if (activeUser) {
			fetch(`/tickets/${params.ticket_id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((ticket) => {
						setTicket(ticket);
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

	// ---------- Render Messages ----------

	useEffect(() => {
		if(ticket) {
			fetch(`/messages/ticket/${ticket.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((messages) => setMessages(messages));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
		}
	}, [ticket]);

	if (!isAuthorized) {
		return <h1>Page Not Found</h1>
	}

	return (
		<div id="ticket">
			<div id="ticket-container">
				<div id="item-panel">
					<CommandCenter
						ticket={ticket}
						setTicket={setTicket}
						activeUser={activeUser}
						isOwner={isOwner}
						messages={messages}
						setMessages={setMessages}
					/>
				</div>
				<div id="message-panel">
					<Messenger
						messages={messages}
						setMessages={setMessages}
						ticket={ticket}
						isOwner={isOwner}
						activeUser={activeUser}
					/>
				</div>
			</div>
		</div>
	);
}

export default Ticket;