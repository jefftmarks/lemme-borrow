import React, { useEffect, useState, useContext } from "react";
import { ActiveUserContext } from "../../../context/active_user";
import FeedCard from "./FeedCard";
import "./Feed.css";

// ---------- Action Cable: Create Consumer ----------

import { createConsumer } from "@rails/actioncable";

// Validate consumer is active user via JWT token
function getWebSocketURL() {
	const token = localStorage.getItem("jwt");
	return `http://localhost:3000/cable?token=${token}`
}

const consumer = createConsumer(getWebSocketURL);

// --------------------

function Feed({ onClickItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(9);
	const [channel, setChannel] = useState(null);

	// ---------- Action Cable: Create Subscription ----------

	// When new item is created by one of user's friends, data is sent to FeedChannel, where new item is broadcast to each friend of item owner
	useEffect(() => {
		if (activeUser) {
			const newChannel = consumer.subscriptions.create({ channel: "FeedChannel", user_id: activeUser.id }, {
				received(item) {
					setItems(oldItems => [item, ...oldItems.slice(0, -1)]);
				} 
			});
			setChannel(newChannel);
		} 
	}, [activeUser]);


	// ---------- Request 10 Most Recent Items ----------

	useEffect(() => {
		fetch(`/items/recent/${activeUser.id}/count/${count}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((items) => setItems(items));
				} else {
					res.json().then((data) => console.log(data));
				}
			})
	}, [count, activeUser]);

	// ---------- Pagination ----------

	function handleIncrementCount() {
		setCount(count => count + 10)
	}

	return (
		<div className="feed">
			<div className="feed-container">
				<div className="feed-list">
					{items.map((item) => (
						<FeedCard
							key={item.id}
							item={item}
							onClickItem={onClickItem}
						/>
					))}
					{items.length < 1 || items.length % 10 !== 0 ? null : (
						<button onClick={handleIncrementCount}>
							Show More
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Feed;