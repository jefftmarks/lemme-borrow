import React from "react";
import "./CupboardCard.css";

function CupboardCard({ item, onClickItem }) {

	return (
		<div className="cupboard-card"
			onClick={() => onClickItem(item.id)}
		>
			<div style={{backgroundImage: `url(${item.image})` }}>
			</div>
			<p>{item.name}</p>
		</div>
	);
}

export default CupboardCard;