import React, { useState, useEffect, useContext } from "react";
import { ActiveUserContext } from "../../context/active_user";
import Controls from "./Controls";
import { useNavigate } from "react-router-dom";
import "./ItemPanel.css"

function ItemPanel({ ticket, setTicket, isOwner, messages, setMessages }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [date, setDate] = useState(ticket.return_date);
	const [item, setItem] = useState(null);

	const { owner, return_date, id } = ticket;

	const navigate = useNavigate();

	// ---------- Render Item Info ----------

	useEffect(() => {
		if (ticket) {
			fetch(`/items/${ticket.item.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => setItem(item));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
		}
	}, [ticket])

	// ---------- Reformat Date ----------

	let formattedDate;

	if (return_date !== "") {
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

	// ---------- Ticket CRUD ----------

	// Undo or decline request
	function handleDeleteTicket() {
		fetch(`/tickets/close/${id}/user/${activeUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((data) => {
						navigate(`/user/${activeUser.id}`)
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// Approve request
	function handleApproveTicket() {
		fetch(`/tickets/approve/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						// Render automated message
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// Borrower marks item as received
	function handleReceiveItem() {
		fetch(`/tickets/receive/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						// Render automated message
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// Owner sets/updates desired return date
	function handleSetReturnDate() {
		fetch(`/tickets/date/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({return_date: date}),
		})
			.then((res => {
				if (res.ok) {
					res.json().then((payload) => {
						setTicket(payload.ticket);
						// Render automated message
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Conditionally Render Page ----------

	if (!item) {
		return null;
	}

	return (
		<div className="item-panel">
			<p className="item-panel-header">{item.name}</p>
			<img src={item.image} alt={item.name} />
			<div className="item-panel-body">
				<p><span>Owner:</span> {isOwner ? "You" : owner.first_name}</p>
				<p><span>Description:</span> {item.description}</p>
				<p><span>Tags:</span> {item.tags.join(", ")}</p>
			</div>
			<div className="return-date">
				<p>Return Date: {return_date ? formattedDate : "--"}</p>
				{ticket.overdue ? <span>Overdue</span> : null}
			</div>
			<Controls 
				ticket={ticket}
				isOwner={isOwner}
				date={date}
				setDate={setDate}
				onClickDelete={handleDeleteTicket}
				onClickApprove={handleApproveTicket}
				onClickReceive={handleReceiveItem}
				onSetReturnDate={handleSetReturnDate}
			/>
		</div>
	);
}

export default ItemPanel;