import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ItemInfo from "./ItemInfo";
import EditItem from "./EditItem";
import CreateItem from "./CreateItem";
import ItemTickets from "./ItemTickets";
import { MdCancel } from "react-icons/md";
import "./ItemDisplay.css";

function ItemDisplay({ showItem, setShowItem, activeUser, setShowSearch, setQuery }) {
	const [isLoading, setIsLoading] = useState(true)
	const [tickets, setTickets] = useState([]);
	const [friendStatus, setFriendStatus] = useState(null);
	
	const { item, mode } = showItem;

	const navigate = useNavigate();

	// ---------- Request Friend Status Between Active User & Item Owner ----------

	useEffect(() => {
		// Don't need to request friend status if adding new item
		if (activeUser && item && mode !== "add") {
			// Don't need to request friend status if your own item
			if (activeUser.id !== item.owner.id) {
				fetch(`/friend_statuses/user/${activeUser.id}/friend/${item.owner.id}`)
				.then((res) => {
					if (res.ok) {
						res.json().then(data => setFriendStatus(data.status.mode));
					} else {
						res.json().then(data => console.log(data));
					}
				})
			}
		}
	}, [activeUser, item, mode]);

	// ---------- Fetch Pending Tickets Depending on User/Item Relationship ----------

	useEffect(() => {
		setTickets([]);
		setIsLoading(true);
		// Don't need to request pending tickets if adding new item
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

	// ---------- Create New Ticket Upon Borrow Request ----------

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
						// Navigate to ticket page and hide modal
						navigate(`/ticket/${ticket.id}`);
						setShowItem({item: null, mode: ""});
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			}))
	}

	// ---------- Conditionally Render Display Mode ----------

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
		// No associated tickets if creating a new item
		if (mode === "add") {
			return null;
			// If item has active or pending tickets associated with active user (as owner or borrower)
		} else if (tickets.length > 0) {
			return (
				<ItemTickets
					tickets={tickets}
					activeUser={activeUser}
					setShowItem={setShowItem}
				/>
			);
			// If item is not yours and has no tickets associated with active user
		} else if (activeUser.id !== item.owner.id) {
				// If you're friends with item owner
				if (friendStatus === "Friends") {
					return (
						<button
							className="lemme-borrow-btn"
							onClick={handleCreateTicketRequest}
						>
							lemme borrow !
						</button>
					);
				// If you're not friends with item owner
				} else if (friendStatus === "Not Friends") {
					return (
						<Link to={`user/${item.owner.id}`}>
							<button
								className="neutral-borrow-btn"
								onClick={() => setShowItem({item: null, mode: ""})}
							>
								Friend {item.owner.first_name} to Borrow Item
							</button>
						</Link>
					);
				// If item owner has yet to respond to your friend request
				} else if (friendStatus === "Pending Response") {
					return (
						<Link to={`user/${item.owner.id}`}>
							<button
								className="neutral-borrow-btn"
								onClick={() => setShowItem({item: null, mode: ""})}
							>
								Friend {item.owner.first_name} to Borrow Item
							</button>
						</Link>
					);
				// If active user has yet to respond to item owner's friend request
				} else if (friendStatus === "Pending Action") {
					return (
						<Link to={`user/${item.owner.id}`}>
							<button
								className="neutral-borrow-btn"
								onClick={() => setShowItem({item: null, mode: ""})}
							>
								Respond to {item.owner.first_name}'s Friend Request to Borrow Item
							</button>
						</Link>
					);
				}
		}
	}

	// ---------- Trigger Search When Tag Clicked ----------

	function handleClickTag(tag) {
		// Hide item display and trigger search display modal
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
						<p>{mode === "add" ? "Add New Item" : item.name}</p>
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