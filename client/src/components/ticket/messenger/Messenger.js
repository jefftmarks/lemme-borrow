import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { messageAdded, fetchMessages } from "../../../slices/messagesSlice";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "./Messenger.css";

// ---------- Action Cable: Create Consumer ----------

import { createConsumer } from "@rails/actioncable";

// Validate consumer is active user via JWT token
function getWebSocketURL() {
	const token = localStorage.getItem("jwt");
	return `http://localhost:3000/cable?token=${token}`
}

const consumer = createConsumer(getWebSocketURL);

// --------------------

function Messenger({ ticket, isOwner, params }) {
	const [left, setLeft] = useState({});
	const [right, setRight] = useState({});
	const [channel, setChannel] = useState(null);

	const messages = useSelector((state) => state.messages.entities);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	// ---------- Render Messages ----------

	useEffect(() => {
		if (ticket) {
			dispatch(fetchMessages(ticket.id));
		}
	}, [ticket, dispatch]);

	// ---------- Submit New Message ----------

	function handleSubmitMessage(message) {
		fetch("/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((message) => {
						dispatch(messageAdded(message));
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

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
					handleSubmitMessage={handleSubmitMessage}
				/>
			</div>
		</div>
	);
}

export default Messenger;