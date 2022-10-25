import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import "./Feed.css";

// ---------- Action Cable: Create Consumer ----------

import { createConsumer } from "@rails/actioncable";

function getWebSocketURL() {
	const token = sessionStorage.getItem("jwt");
	return `http://localhost:3000/cable?token=${token}`
}

const consumer = createConsumer(getWebSocketURL);

// --------------------

function Feed({ activeUser, onClickItem }) {
	const [items, setItems] = useState([]);
	const [count, setCount] = useState(9);
	const [channel, setChannel] = useState(null);
	const [showHeader, setShowHeader] = useState(true);

	// ---------- Action Cable: Create Subscription ----------

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


	// ---------- Grab 10 Most Recent Items ----------

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

	console.log(items);

	return (
		<div className="feed">
			<div className="feed-container">
				{showHeader ? <p className="feed-header">New Items From Your Friends</p> : null }
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