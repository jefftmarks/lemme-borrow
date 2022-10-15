import React from "react";
import "./ItemInfo.css";

function ItemInfo({ item, setMode, activeUser }) {

	const {name, description, image, status, tags, requested, borrower_id, owner_id} = item;

	function renderStatusBar() {
		// Item is yours
		if (activeUser.id === owner_id) {
			// Item is in your possession and no ticket request pending
			if (status === "home" && !requested) {
				// And you haven't promised it to lend it to anyone
				if (!borrower_id) {
					return (
						<div id="item-status-bar">
							<p id="item-status">Item is Currently in Your Cupboard</p>
							<button id="status-btn" onClick={() => setMode("edit")}>
								Edit Item?
							</button>
							<button id="status-btn" onClick={() => setMode("gift")}>
								Gift Item?
							</button>
						</div>
					)
				}
			}
		} else {
			return <h1>not yours</h1>
		}
	}

	return (
		<div id="item-info">
			{renderStatusBar()}
			<div id="item-image-container">
				<img id="item-front-image" src={image} alt={name} />
				<div id="item-image-blur" style={{backgroundImage: `url("${item.image}")`}}>
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
		</div>
	);
}

export default ItemInfo;