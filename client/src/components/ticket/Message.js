import React from "react";
import "./Message.css";

function Message({ message, activeUser }) {

	const { sender_id, text } = message;
	
	return (
		<div
			className={activeUser.id === sender_id ? "left message" : "right message"}
		>
			<p>{text}</p>
		</div>
	);
}

export default Message;