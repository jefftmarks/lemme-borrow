import React, { useState, useEffect } from "react";
import GiftFriendCard from "./GiftFriendCard";
import "./GiftItem.css";

function GiftItem({ item, setItem, setMode, activeUser }) {
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
					res.json().then((data) => {
						setItem(null);
						setMode("");
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	return (
		<div id="gift-item">
			<div id="gift-item-header">
				<p>Gift Item to . . .</p>
				<button onClick={() => setMode("")}>
					Back
				</button>
			</div>
			<div id="friends-list">
				{friends.map((friend) => (
					<GiftFriendCard 
						key={friend.id}
						friend={friend}
						item={item}
						onClickGiftItem={handleGiftItem}
					/>
				))}
			</div>
		</div>
	);
}

export default GiftItem;