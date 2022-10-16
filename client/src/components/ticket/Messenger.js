import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketStatus from "./TicketStatus";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "./Messenger.css";

function Messenger({ ticket, isOwner, activeUser }) {
	const [messages, setMessages] = useState([]);
	const [left, setLeft] = useState({});
	const [right, setRight] = useState({});

	const navigate = useNavigate();

	useEffect(() => {
		if (isOwner) {
			setLeft(ticket.owner);
			setRight(ticket.borrower);
		} else {
			setLeft(ticket.borrower);
			setRight(ticket.owner);
		}
	}, [ticket, isOwner]);

	useEffect(() => {
		fetch(`/messages/ticket/${ticket.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((messages) => setMessages(messages));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}, [ticket]);

	function handleUpdateMessages(message) {
		setMessages([message, ...messages]);
	}

	return (
		<div id="messenger">
			<div id="messenger-header">
				<img
					src={left.avatar}
					alt="avatar"
					onClick={() => navigate(`/user/${left.id}`)}
				/>
				<TicketStatus
					ticket={ticket}
					left={left}
					right={right}
				/>
				<img
					src={right.avatar}
					alt="avatar"
					onClick={() => navigate(`/user/${right.id}`)}
				/>
			</div>
			<div id="message-list">
				{messages.map((message) => (
					<Message
						key={message.id}
						message={message}
						activeUser={activeUser}
					/>
				))}
			</div>
			<MessageForm
				sender={left}
				receiver={right}
				ticket={ticket}
				onSendMessage={handleUpdateMessages}
			/>
		</div>
	);
}

export default Messenger;