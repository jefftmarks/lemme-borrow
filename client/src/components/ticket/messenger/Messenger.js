import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "./Messenger.css";

function Messenger({ ticket, messages, setMessages, isOwner, activeUser, channel }) {
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

	return (
		<div id="messenger">
			<div id="messenger-header">
				<div className="ticket-avatar">
					<img
						src={left.avatar}
						alt="avatar"
						onClick={() => navigate(`/user/${left.id}`)}
					/>
					{left.first_name}
				</div>
				<div className="ticket-avatar">
					<img
						src={right.avatar}
						alt="avatar"
						onClick={() => navigate(`/user/${right.id}`)}
					/>
					{right.first_name}
				</div>
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
				channel={channel}
			/>
		</div>
	);
}

export default Messenger;