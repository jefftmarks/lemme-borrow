import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { createConsumer } from "@rails/actioncable";
import CommandCenter from "./CommandCenter";
import Messenger from "./messenger/Messenger";
import "./Ticket.css";

// ---------- Action Cable: Create Consumer ----------

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
		if (activeUser && ticket) {
			const newChannel = consumer.subscriptions.create({ channel: "ChatChannel", room: `Ticket_${ticket.id}` }, {
				received(message) {
					setMessages(oldMessages => [message, ...oldMessages]);
				} 
			})

			setChannel(newChannel);
		} 
	}, [activeUser, ticket]);

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

	// ---------- Authorization and Page Rendering ----------

	if (!isAuthorized) {
		return <h1>Page Not Found</h1>
	}

	if (!ticket) {
		return <h1>Loading . . .</h1>
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
						channel={channel}
					/>
				</div>
			</div>
		</div>
	);
}

export default Ticket;