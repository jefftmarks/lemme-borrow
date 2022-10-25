import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemInfo from "./ItemInfo";
import EditItem from "./EditItem";
import CreateItem from "./CreateItem";
import ItemTickets from "./ItemTickets";
import { MdCancel } from "react-icons/md";
import "./ItemDisplay.css";

function ItemDisplay({ showItem, setShowItem, activeUser, setShowSearch, setQuery }) {
	const [isLoading, setIsLoading] = useState(true)
	const [tickets, setTickets] = useState([]);
	
	const { item, mode } = showItem;

	const navigate = useNavigate();

	// ---------- Fetch Pending Tickets Depending on User/Item Relationship ----------

	useEffect(() => {
		setTickets([]);
		setIsLoading(true);
		if (activeUser && item && mode !== "add") {
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
	
	}, [activeUser, item, mode])

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
						setShowItem({item: null, mode: ""});
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}))
	}

	// ---------- Conditionally Render Display ----------

	function renderDisplay() {
		switch (mode) {
			case "edit":
				return (
					<EditItem
						item={item}
						setShowItem={setShowItem}
					/>
				);
			case "add":
				return (
					<CreateItem
						activeUser={activeUser}
						setShowItem={setShowItem}
					/>
				);
			default:
				return (
					<ItemInfo
						item={item}
						setShowItem={setShowItem}
						activeUser={activeUser}
						tickets={tickets}
						handleClickTag={handleClickTag}
					/>
				);
		}
	}

	// ---------- Conditionally Render Associated Tickets ----------

	function renderBorrowActions() {
		if (mode === "add") {
			return null;
		} else if (tickets.length > 0) {
			return (
				<ItemTickets
					tickets={tickets}
					activeUser={activeUser}
					setShowItem={setShowItem}
				/>
			);
			// If no tickets and not your item, allow user to borrow
		} else if (activeUser.id !== item.owner.id) {
			return (
				<button
					className="lemme-borrow-btn"
					onClick={handleCreateTicketRequest}
				>
					lemme borrow !
				</button>
			);
		}
	}

	// ---------- Trigger Search When Tag Clicked ----------

	function handleClickTag(tag) {
		setShowItem({item: null, mode: ""});
		setQuery(tag);
		setShowSearch({ show: true, mode: "items"});
	}
	
	// ---------- Conditionally Render Item Modal ----------

	if (!item) {
		return null;
	}

	return (
		<div className="item-display">
			{isLoading && mode !== "add" ? null : (
				<div className="item-display-container">
					<div className="item-display-header">
						<p>{mode === "add" ? "Add a New Item to Your Cupboard" : item.name}</p>
						<MdCancel
						onClick={() => setShowItem({item: null, mode: ""})}
						size="27"
						/>
					</div>
					{renderDisplay()}
					{renderBorrowActions()}
			</div>
			)}
		</div>
	);
}

export default ItemDisplay;