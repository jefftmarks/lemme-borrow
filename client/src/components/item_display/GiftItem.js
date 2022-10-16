import React, { useState, useEffect } from "react";
import GiftItemCard from "./GiftItemCard";
import "./GiftItem.css";

function GiftItem({ item, setShowItem, activeUser, setMode }) {
	const [friends, setFriends] = useState([]);

	// ---------- Render Friends ----------

	useEffect(() => {
		fetch(`/friendships/user/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((friends) => setFriends(friends));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, [activeUser]);

	// ---------- Gift Item ----------

	function handleGiftItem(friendId) {
		fetch(`/items/${item.id}/user/${activeUser.id}}/to/${friendId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		}) 
			.then((res) => {
				if (res.ok) {
					res.json().then((data) => setShowItem({item: null, mode: ""}));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	return (
		<div id="gift-item">
			<div id="gift-item-header">
				<p>Gift Item to . . .</p>
				<button onClick={() => setShowItem({item: null, mode: ""})}>
					Back
				</button>
			</div>
			<div id="friends-list">
				{friends.map((friend) => (
					<GiftItemCard 
						key={friend.id}
						friend={friend}
						onClickGiftItem={handleGiftItem}
					/>
				))}
			</div>
		</div>
	);
}

export default GiftItem;