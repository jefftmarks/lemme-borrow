import React, { useState } from "react";
import Logo from "./borrow-logo.png";
import "./MessageForm.css";

function MessageForm({ sender, receiver, ticket, channel}) {
	const [text, setText] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		const newMessage = {
			sender_id: sender.id,
			receiver_id: receiver.id,
			ticket_id: ticket.id,
			text: text,
			automated: false
		}

		channel.send(newMessage);

		setText("");
	}

	return (
		<div className="message-form">
			<form onSubmit={handleSubmit}>
				<input
					required
					type="text"
					name="text"
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<button>send</button>
			</form>
		</div>
	);
}

export default MessageForm;