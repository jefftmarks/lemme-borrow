import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import ItemPanel from "./ItemPanel";
import Messenger from "./messenger/Messenger";
import "./Ticket.css";

// ---------- Action Cable: Create Consumer ----------

import { createConsumer } from "@rails/actioncable";

function getWebSocketURL() {
	const token = sessionStorage.getItem("jwt");
	return `http://localhost:3000/cable?token=${token}`
}

const consumer = createConsumer(getWebSocketURL);

// --------------------

function Ticket({ activeUser }) {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [ticket, setTicket] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [messages, setMessages] = useState([]);
	const [channel, setChannel] = useState(null);

	const params = useParams();

	// ---------- Action Cable: Create Subscription ----------

	useEffect(() => {
		if (params) {
			const newChannel = consumer.subscriptions.create({ channel: "TicketChannel", ticket_id: params.ticket_id }, {
				received(message) {
					setMessages(messages => [message, ...messages]);
				} 
			});
			setChannel(newChannel);
		} 
	}, []);

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
		if (ticket) {
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

	// ---------- Authorization and Page Rendering ----------

	if (!isAuthorized) {
		return <h1>Page Not Found</h1>
	}

	if (!ticket) {
		return <h1>Loading . . .</h1>
	}

	return (
		<div className="ticket">
			<ItemPanel
				ticket={ticket}
				setTicket={setTicket}
				activeUser={activeUser}
				isOwner={isOwner}
				messages={messages}
				setMessages={setMessages}
			/>
			<Messenger
				messages={messages}
				setMessages={setMessages}
				ticket={ticket}
				isOwner={isOwner}
				activeUser={activeUser}
				channel={channel}
		/>
		</div>
	);
}

export default Ticket;