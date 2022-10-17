import React from "react";
import "./Message.css";

function Message({ message, activeUser }) {

	let key;

	if (message.automated) {
		key = "automated";
	} else if (message.sender_id === activeUser.id) {
		key = "sender";
	} else {
		key = "receiver";
	}
	
	return (
		<div
			className={`message ${key}`}
		>
			<p>{message.text}</p>
		</div>
	);
}

export default Message;