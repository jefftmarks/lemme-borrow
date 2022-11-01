import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ActiveUserContext } from "../../context/active_user";
import { useSelector, useDispatch } from "react-redux";
import { messageAdded, fetchMessages } from "../../slices/messagesSlice";
import ItemPanel from "./ItemPanel";
import Messenger from "./messenger/Messenger";
import "./Ticket.css";

// ---------- Action Cable: Create Consumer ----------

import { createConsumer } from "@rails/actioncable";

// Validate consumer is active user via JWT token
function getWebSocketURL() {
	const token = localStorage.getItem("jwt");
	return `http://localhost:3000/cable?token=${token}`
}

const consumer = createConsumer(getWebSocketURL);

// --------------------

function Ticket() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [ticket, setTicket] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [channel, setChannel] = useState(null);

	const messages = useSelector((state) => state.messages.entities);

	const params = useParams();

	const dispatch = useDispatch();

	// ---------- Action Cable: Create Subscription ----------

	// Connect consumer to "chat room" unique to ticket ID
	useEffect(() => {
		if (params) {
			const newChannel = consumer.subscriptions.create({ channel: "TicketChannel", ticket_id: params.ticket_id }, {
				received(message) {
					dispatch(messageAdded(message));
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

	// ---------- Render Messages ----------

	useEffect(() => {
		if (ticket) {
			dispatch(fetchMessages(ticket.id));
		}
	}, [ticket, dispatch]);

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
				messages={messages}
				ticket={ticket}
				isOwner={isOwner}
				channel={channel}
		/>
		</div>
	);
}

export default Ticket;