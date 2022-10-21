import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ItemInfo.css";

function ItemInfo({ item, setShowItem, activeUser, tickets, handleClickTag }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const { id, name, description, image, status, tags, owner, borrower} = item;

	// ---------- If Your Belonging, Render CRUD Options ----------

	function renderStatusBar() {
		// ITEM IS YOURS
		if (activeUser.id === owner.id) {
			// ITEM HAS NO ACTIVE TICKETS ASSOCIATED WITH YOU
			if (tickets.length < 1) {
				return (
					<div className="item-status-bar">
						<p className="item-status">Item is Currently in Your Cupboard</p>
						<button
							className="status-btn"
							onClick={() => setShowItem({item: item, mode: "edit"})}
						>
							Edit Item
						</button>
					</div>
				)
			// ITEM HAS ACTIVE TICKETS ASSOCIATED WITH YOU
			} else {
				const message = status === "home" ? "in Your Cupboard" : `Being Borrowed by ${borrower.first_name}`
				return (
					<div className="item-status-bar">
						Item is Currently {message}
					</div>
				);
			}
		// ITEM IS NOT YOURS
		} else {
			return (
				<div className="item-status-bar">
					<Link
						to={`/user/${owner.id}`}
						onClick={() => setShowItem({ item: null, mode: "" })}
					>
						<img src={owner.avatar} alt="avatar"
						/>
					</Link>
					<p>Item Belongs to {owner.first_name}</p>
				</div>
			);

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
					<div className="delete-item">
						{isDeleting ? (
							<button className="delete-item-2" onClick={handleDelete}>
								Confirm Delete
							</button>
						) : (
							<button
								className="delete-item-1"
								onClick={() => setIsDeleting(true)}
							>
								Delete Item?
							</button>
						)}
					</div>	
				);
			} else {
				return (
					<div className="delete-item">
						<p className="delete-item-1">You Cannot Edit or Delete Item with Pending Tickets</p>
					</div>
				);
			}
		}
	}

	return (
		<div className="item-info">
			{renderStatusBar()}
			<div className="item-image-container">
				<img className="item-front-image" src={image} alt={name} />
				<div className="item-image-blur" style={{backgroundImage: `url("${image}")`}}>
					<img src={image} alt={name} />
				</div>
			</div>
			<p>{description}</p>
			<div className="tag-display">
				{tags.map((tag) => (
					<button
						className="tag-card"
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