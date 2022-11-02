import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { messageAdded, fetchMessages } from "../../../slices/messagesSlice";
import MessageForm from "./MessageForm";
import Message from "./Message";
import "./Messenger.css";

function Messenger({ ticket, isOwner, params }) {
	const [left, setLeft] = useState({});
	const [right, setRight] = useState({});

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
		dispatch(messageAdded(message));
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