import React, { useState, useEffect } from "react";
import CupboardCard from "./CupboardCard";
import "./Cupboard.css";

function Cupboard({ profile }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(`/items/belongings/${profile.id}"`)
			.then((res) => {
				if (res.ok) {
					res.json().then((items) => setItems(items));
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, [profile]);

	return (
		<div id="cupboard">
			{items.map((item) => (
				<CupboardCard
					key={item.id}
					item={item}
				/>
			))}
		</div>
	);
}

export default Cupboard;