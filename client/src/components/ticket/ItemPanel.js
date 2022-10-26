import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import { useNavigate } from "react-router-dom";
import "./ItemPanel.css"

function ItemPanel({ ticket, setTicket, isOwner, activeUser, messages, setMessages }) {
	const [date, setDate] = useState(ticket.return_date);
	const [item, setItem] = useState(null);

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

	const { owner, return_date, id } = ticket;

	const navigate = useNavigate();

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

	// ---------- Undo or Decline Request ----------

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

	// ---------- Approve Request ----------

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
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Receive Item ----------

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
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	// ---------- Set Return Date ----------

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
						setMessages([payload.message, ...messages])
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}));
	}

	if (!item) {
		return null;
	}

	return (
		<div className="item-panel">
			<p className="item-panel-header">{item.name}</p>
			<img src={item.image} alt={item.name} />

			<div className="item-panel-body">

				<div className="line"><div>Owner:</div><p>{isOwner ? "You" : owner.first_name}</p></div>

				<div className="line"><div>Description:</div><p>{item.description}</p></div>

				<div className="line"><div>Tags:</div><p>{item.tags.join(", ")}</p></div>

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