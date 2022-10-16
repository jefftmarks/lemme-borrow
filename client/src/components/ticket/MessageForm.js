import React, { useState } from "react";
import "./MessageForm.css";

function MessageForm({ sender, receiver, ticket, onSendMessage}) {
	const [message, setMessage] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		fetch("/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sender_id: sender.id,
				receiver_id: receiver.id,
				ticket_id: ticket.id,
				text: message,
			})
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((message) => {
						onSendMessage(message);
						setMessage("");
					})
				} else {
					res.json().then((data) => console.log(data))
				}
			})
	}

	return (
		<form id="message-form" onSubmit={handleSubmit}>
			<textarea
				required
				name="text"
				rows="3"
				onChange={(e) => setMessage(e.target.value)}
				value={message}
			>			
			</textarea>
			<button>SEND</button>
		</form>
	);
}

export default MessageForm;