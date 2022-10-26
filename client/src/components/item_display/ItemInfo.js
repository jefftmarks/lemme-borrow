import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ItemInfo.css";

function ItemInfo({ item, setShowItem, activeUser, tickets, handleClickTag }) {
	const [isDeleting, setIsDeleting] = useState(false);

	const { id, name, description, image, status, tags, owner, borrower} = item;

	// ---------- If Your Belonging, Render CRUD Options ----------

	function renderStatusBar() {
		// Item is yours
		if (activeUser.id === owner.id) {
			// Item has no active tickets associated with you
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
			// Item has active tickets associated with you
			} else {
				const message = status === "home" ? "in Your Cupboard" : `Being Borrowed by ${borrower.first_name}`
				return (
					<div className="item-status-bar">
						Item is Currently {message}
					</div>
				);
			}
		// Item is not yours
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
					<>
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
			
			<div
				style={{backgroundImage: `url(${item.image})` }}
				className="item-image"
			>
			</div>
			{/* <img src={image} alt={name} /> */}

			{/* <div className="item-image-container">
				<img className="item-front-image" src={image} alt={name} />
				<div className="item-image-blur" style={{backgroundImage: `url("${image}")`}}>
					<img src={image} alt={name} />
				</div>
			</div> */}

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