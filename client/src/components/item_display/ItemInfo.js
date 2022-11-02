import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ActiveUserContext } from "../../context/active_user";
import "./ItemInfo.css";

function ItemInfo({ item, setShowItem, tickets, handleClickTag }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [isDeleting, setIsDeleting] = useState(false);

	const { id, description, status, tags, owner, borrower} = item;

	// ---------- Render Item Status and Edit Item Button ----------

	function renderStatusBar() {
		// If item belongs to active user
		if (activeUser.id === owner.id) {
			// Item has no active or pending tickets
			if (tickets.length < 1) {
				return (
					<div className="item-status-bar">
						<p>Item is Currently in Your Cupboard</p>
						<button
							onClick={() => setShowItem({item: item, mode: "edit"})}
						>
							Edit Item
						</button>
					</div>
				)
			// If item has active tickets, it cannot be edited
			} else {
				const message = status === "home" ? "in Your Cupboard" : `Being Borrowed by ${borrower.first_name}`
				return (
					<div className="item-status-bar">
						Item is Currently {message}
					</div>
				);
			}
		// If item does not belong to active user
		} else {
			return (
				<Link to={`/user/${owner.id}`}>
					<div
						className="user-card"
						onClick={() => setShowItem({ item: null, mode: "" })}
					>	
						<div><img src={owner.avatar} alt="avatar" /></div>
						<p>Belongs to: {owner.first_name} {owner.last_name}</p>
					</div>
				</Link>
			);

		}
	}

	// ---------- Delete Item ----------

	function handleDelete() {
		fetch(`/api/items/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						setShowItem({item: null, mode: ""})
					})
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}

	// ---------- Only Render Delete Button if Item Belongs to Active user ----------

	function renderDeleteButton() {
		// Item belongs to active user
		if (activeUser.id === owner.id) {
			// And has no active tikets
			if (tickets.length < 1) {
				return (
					<>
						{/* Warn user before permanently deleting */}
						{isDeleting ? (
							<button className="delete-item delete-2" onClick={handleDelete}>
								Confirm Delete
							</button>
						) : (
							<button
								className="delete-item delete-1"
								onClick={() => setIsDeleting(true)}
							>
								Delete Item?
							</button>
						)}
					</>
				);
			} else {
				return (
					<p className="delete-item delete-1">You Cannot Edit or Delete Item with Pending Tickets</p>
				);
			}
		}
	}

	return (
		<div className="item-info">
			{renderStatusBar()}
			<div
				style={{backgroundImage: `url(${item.image})` }}
				className="item-image"
			>
			</div>
			<p className="description">{description}</p>
			<div className="tag-display">
				{tags.map((tag) => (
					<button
						key={tag}
						onClick={() => handleClickTag(tag)}
					>
						{tag}
					</button>
				))}
			</div>
			{renderDeleteButton()}
		</div>
	);
}

export default ItemInfo;