import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemInfo from "./ItemInfo";
import GiftItem from "./GiftItem";
import EditItem from "./EditItem";
import CreateItem from "./CreateItem";
import ItemTickets from "./ItemTickets";
import "./ItemDisplay.css";

function ItemDisplay({ item, setItem, activeUser, mode, setMode }) {
	const [isLoading, setIsLoading] = useState(true)
	const [tickets, setTickets] = useState([]);

	const navigate = useNavigate();

	// ---------- Fetch Pending Tickets Depending on User/Item Relationship ----------

	useEffect(() => {
		setIsLoading(true);
		setTickets([]);
		if (activeUser && item) {
			fetch(`/pending_tickets/item/${item.id}/user/${activeUser.id}}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => {
						setTickets(tickets);
						setIsLoading(false);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			})
		}
	
	}, [activeUser, item])

	// ---------- Create New Ticket upon Borrow Request ----------

	function handleCreateTicketRequest() {
		fetch("/tickets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				item_id: item.id,
				owner_id: item.owner.id,
				borrower_id: activeUser.id,
			}),
		})
			.then((res => {
				if (res.ok) {
					res.json().then((ticket) => {
						navigate(`/ticket/${ticket.id}`);
						setItem(null);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}))
	}

	// ---------- Conditionally Render Display ----------

	function renderDisplay() {
		switch (mode) {
			case "gift":
				return (
					<GiftItem
						item={item}
						setItem={setItem}
						setMode={setMode}
						activeUser={activeUser}
					/>
				);
			case "edit":
				return (
					<EditItem
						item={item}
						setItem={setItem}
						setMode={setMode}
					/>
				)
			case "add":
				return (
					<CreateItem
						setItem={setItem}
						setMode={setMode}
						activeUser={activeUser}
					/>
				)
			default:
				return (
					<ItemInfo
						item={item}
						setItem={setItem}
						setMode={setMode}
						activeUser={activeUser}
						tickets={tickets}
					/>
				);
		}
	}

	function onClickEx() {
		setItem(false);
	}

	// ---------- Conditionally Render Associated Tickets ----------

	function renderBorrowActions() {
		if (tickets.length > 0) {
			return (
				<ItemTickets
					tickets={tickets}
					activeUser={activeUser}
					setItem={setItem}
				/>
			);
			// If no tickets and not your item, allow user to borrow
		} else if (activeUser.id !== item.owner.id) {
			return (
				<button
					id="lemme-borrow-button"
					onClick={handleCreateTicketRequest}
				>
					lemme borrow!
				</button>
			);
		}
	}
	
	// ---------- Conditionally Render Item Modal ----------

	if (!item) {
		return null;
	}

	return (
		<div id="item-display">
			<div id="item-display-container">
				<div id="item-display-header">
					<h2>{mode === "add" ? "Add a New Item to Your Cupboard" : item.name}</h2>
					<span onClick={onClickEx}>X</span>
				</div>
				{isLoading ? null : renderDisplay()}
				{isLoading ? null : renderBorrowActions()}
			</div>
		</div>
	);
}

export default ItemDisplay;