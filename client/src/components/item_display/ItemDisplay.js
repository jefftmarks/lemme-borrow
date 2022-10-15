import React, { useState } from "react";
import ItemInfo from "./ItemInfo";
import GiftItem from "./GiftItem";
import "./ItemDisplay.css";

function ItemDisplay({ item, setItem, activeUser }) {
	const [mode, setMode] = useState("");

	// Conditionally render signup modal
	if (!item) {
		return null;
	}

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
			default:
				return (
					<ItemInfo
						item={item}
						setMode={setMode}
						activeUser={activeUser}
					/>
				);
		}
	}

	return (
		<div id="item-display">
			<div id="item-display-container">
				<div id="item-display-header">
					<h2>{item.name}</h2>
					<span onClick={() => setItem(false)}>X</span>
				</div>
				{renderDisplay()}
			</div>
		</div>
	);
}

export default ItemDisplay;