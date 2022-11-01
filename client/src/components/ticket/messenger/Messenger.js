import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "./Messenger.css";

function Messenger({ ticket, messages, isOwner, channel }) {
	const [left, setLeft] = useState({});
	const [right, setRight] = useState({});

	const navigate = useNavigate();

	// ---------- Orient Messenger Orientation Based on Active user

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
		<div className="messenger-container">
			<div className="messenger">
				<div className="messenger-header">
					<div>
						<img
							className="user-pic"
							src={left.avatar}
							alt="avatar"
							onClick={() => navigate(`/user/${left.id}`)}
						/>
						<p>{left.first_name}</p>
					</div>
					<p className="logo">lemmeBorrow</p>
					<div>
					<p>{right.first_name}</p>
						<img
							className="user-pic"
							src={right.avatar}
							alt="avatar"
							onClick={() => navigate(`/user/${right.id}`)}
						/>
					</div>
				</div>
				<div className="message-list">
					{messages.map((message) => (
						<Message
							key={message.id}
							message={message}
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
		</div>
	);
}

export default Messenger;