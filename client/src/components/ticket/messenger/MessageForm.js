import React, { useState } from "react";
import "./MessageForm.css";

function MessageForm({ sender, receiver, ticket, handleSubmitMessage}) {
	const [text, setText] = useState("");

	// ---------- Form Handling ----------

	function handleSubmit(e) {
		e.preventDefault();
		const newMessage = {
			sender_id: sender.id,
			receiver_id: receiver.id,
			ticket_id: ticket.id,
			text: text,
			automated: false
		}
		handleSubmitMessage(newMessage);
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