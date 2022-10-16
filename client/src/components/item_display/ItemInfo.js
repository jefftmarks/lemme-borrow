import React, { useState } from "react";
import "./ItemInfo.css";

function ItemInfo({ item, setItem, activeUser }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const { id, name, description, image, status, tags, requested, owner, borrower} = item;

	// ---------- If Your Item, Render CRUD Options ----------

	function renderStatusBar() {
		// Item is yours
		if (activeUser.id === owner.id) {
			// Item is in your possession and no ticket request pending
			if (status === "home" && !requested) {
				// And you haven't promised it to lend it to anyone
				if (!borrower) {
					return (
						<div id="item-status-bar">
							<p id="item-status">Item is Currently in Your Cupboard</p>
							<button id="status-btn" onClick={() => setItem({data: item, mode: "edit"})}>
								Edit Item
							</button>
							<button id="status-btn" onClick={() => setItem({data: item, mode: "gift"})}>
								Gift Item
							</button>
						</div>
					)
				}
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
						setItem(null);
					})
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}
	// ---------- Only Render Delete Button if Your Own Item ----------

	function renderDeleteButton() {
		if (activeUser.id === owner.id) {
			return (
				<div id="delete-item">
					{isDeleting ? (
						<button id="delete-item-2" onClick={handleDelete}>
							Confirm Delete
						</button>
					) : (
						<button id="delete-item-1" onClick={() => setIsDeleting(true)}>Delete Item?</button>
					)}
				</div>	
			);
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