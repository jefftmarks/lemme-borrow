import React from "react";
import "./Message.css";

function Message({ message, activeUser }) {
	
	let mode;

	let formattedMessage = message.text

	// ---------- Conditional Styling of Messages ---------
	
	if (message.automated) {
		mode = "automated";
		formattedMessage = `Automated Message: ${message.text}`
	} else if (message.sender_id === activeUser.id) {
		mode = "sender";
	} else {
		mode = "receiver";
	}
	
	return (
		<div
			className={`message ${mode}`}
		>
			{formattedMessage}
		</div>
	);
}

export default Message;