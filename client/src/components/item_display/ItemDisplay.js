import React, { useEffect, useState } from "react";
import ItemInfo from "./ItemInfo";
import GiftItem from "./GiftItem";
import EditItem from "./EditItem";
import CreateItem from "./CreateItem";
import ItemTickets from "./ItemTickets";
import "./ItemDisplay.css";

function ItemDisplay({ item, setItem, activeUser }) {
	const [tickets, setTickets] = useState([]);

	// ---------- Fetch Pending Tickets Depending on User/Item Relationship ----------

	useEffect(() => {
		setTickets([]);
		if (activeUser && item) {
			fetch(`/items/${item.data.id}/status/${activeUser.id}}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => setTickets(tickets));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
		}
	
	}, [item, activeUser])

	// ---------- Conditionally Render Display ----------

	function renderDisplay() {
		switch (item.mode) {
			case "gift":
				return (
					<GiftItem
						item={item.data}
						setItem={setItem}
						activeUser={activeUser}
					/>
				);
			case "edit":
				return (
					<EditItem
						item={item.data}
						setItem={setItem}
					/>
				)
			case "add":
				return (
					<CreateItem
						setItem={setItem}
						activeUser={activeUser}
					/>
				)
			default:
				return (
					<ItemInfo
						item={item.data}
						setItem={setItem}
						activeUser={activeUser}
					/>
				);
		}
	}

	function onClickEx() {
		setItem(false);
	}

	// ---------- Conditionally Render Associated Tickets or Else Allow to Borrow ----------

	function renderBorrowActions() {
		if (tickets.length > 0) {
			return (
				<ItemTickets
					tickets={tickets}
					activeUser={activeUser}
				/>
			);
		} else if (activeUser.id !== item.data.owner.id) {
			return (
				<button id="lemme-borrow-button">lemme borrow!</button>
			)
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
					<h2>{item.mode === "add" ? "Add a New Item to Your Cupboard" : item.data.name}</h2>
					<span onClick={onClickEx}>X</span>
				</div>
				{renderDisplay()}
				{renderBorrowActions()}
			</div>
		</div>
	);
}

export default ItemDisplay;