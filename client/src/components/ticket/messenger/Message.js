import React, { useContext} from "react";
import { ActiveUserContext } from "../../../context/active_user";
import "./Message.css";

function Message({ message }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

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