import React, { useState } from "react";
import "./ItemInfo.css";

function ItemInfo({ item, setShowItem, activeUser, tickets }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const { id, name, description, image, status, tags, owner, borrower} = item;

	// ---------- If Your Belonging, Render CRUD Options ----------

	function renderStatusBar() {
		// Item is yours
		if (activeUser.id === owner.id) {
			// If item has no active tickets
			if (tickets.length < 1) {
				return (
					<div id="item-status-bar">
						<p id="item-status">Item is Currently in Your Cupboard</p>
						<button
							id="status-btn"
							onClick={() => setShowItem({item: item, mode: "edit"})}
						>
							Edit Item
						</button>
					</div>
				)
			} else {
				const message = status === "home" ? "in Your Cupboard" : `Being Borrowed by ${borrower.first_name}`
				return (
					<div id="item-status-bar">
						<p id="item-status">Item is Currently {message}</p>
					</div>
				);
			}
		}
	}

	// ---------- Delete Item ----------

	function handleDelete() {
		fetch(`/items/${id}`, {
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
	// ---------- Only Render Delete Button if Your Own Item ----------

	function renderDeleteButton() {
		// Item is yours and no pending tickets
		if (activeUser.id === owner.id) {
			// And no active tikets
			if (tickets.length < 1) {
				return (
					<div id="delete-item">
						{isDeleting ? (
							<button id="delete-item-2" onClick={handleDelete}>
								Confirm Delete
							</button>
						) : (
							<button
								id="delete-item-1"
								onClick={() => setIsDeleting(true)}
							>
								Delete Item?
							</button>
						)}
					</div>	
				);
			} else {
				return (
					<div id="delete-item">
						<p id="delete-item-1">You Cannot Edit or Delete Item with Pending Tickets</p>
					</div>
				);
			}
		}
	}

	return (
		<div id="item-info">
			{renderStatusBar()}
			<div id="item-image-container">
				<img id="item-front-image" src={image} alt={name} />
				<div id="item-image-blur" style={{backgroundImage: `url("${image}")`}}>
					<img src={image} alt={name} />
				</div>
			</div>
			<p>{description}</p>
			<div id="tag-display">
				{tags.map((tag) => (
					<div id="tag-card" key={tag}>
						{tag}
					</div>
				))}
			</div>
			{renderDeleteButton()}
		</div>
	);
}

export default ItemInfo;