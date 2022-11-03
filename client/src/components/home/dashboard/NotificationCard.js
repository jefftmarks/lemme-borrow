import React from "react";
import "./NotificationCard.css";

function NotificationCard({ ticket }) {

	const { image, overdue, message, status } = ticket

	console.log(ticket);

	return (
		<div className={`notification-card overdue-${overdue} ${status}`}>
			<div className="img-div"><img src={image} alt="item"/></div>
			<div className="notification-info">
				{overdue ? <p style={{color: "var(--maximum-red)", fontSize: "1.2rem"}}>OVERDUE</p> : null}
				<p>{message}</p>
			</div>
		</div>
	);
}

export default NotificationCard;