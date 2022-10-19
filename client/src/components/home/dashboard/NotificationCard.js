import React from "react";
import "./NotificationCard.css";

function NotificationCard({ ticket }) {

	const { return_date, image, overdue, message } = ticket

	// ---------- Reformat Date ----------

	let formattedDate;

	if (return_date !== "") {
		// reformat date
		let str = return_date;
		let dd;
		let mm;

		if (str[5] === "0") {
			mm = str.slice(6, 7);
		} else {
			mm = str.slice(5, 7);
		}

		if (str[8] === "0") {
			dd = str.slice(9, 10);
		} else {
			dd = str.slice(8, 10);
		}

		let yyyy = str.slice(0, 4);
		formattedDate = `${mm}/${dd}/${yyyy}`;
	}

	return (
		<div className={`notification-card overdue-${overdue}`}>
			<img src={image} alt="item" />
			<div className="notifcation-info">
				<p>{message}</p>
				{overdue ? "OVERDUE!" : (
					<p>Return Date: {return_date ? formattedDate : "--"}</p>
				)}
			</div>
		</div>
	);
}

export default NotificationCard;