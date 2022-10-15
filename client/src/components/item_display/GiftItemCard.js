import React from "react";
import "./GiftItemCard.css";

function GiftItemCard({ friend, item, onClickGiftItem }) {
	return (
		<div id="gift-friend-card">
			<img src={friend.avatar} alt="avatar" />
			<div id="gift-friend-info">
				<h2>{friend.first_name}</h2>
				<div id="gift-friend-details">
					Gift item to {friend.first_name}?
					<button onClick={() => onClickGiftItem(friend.id)}>YES</button>
				</div>
			</div>
		</div>
	);
}

export default GiftItemCard;