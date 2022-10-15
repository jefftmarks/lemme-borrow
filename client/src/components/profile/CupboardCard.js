import React from "react";
import "./CupboardCard.css";

function CupboardCard({ item }) {

	return (
		<div id="cupboard-card"
		>
			<div id="cupboard-image"
				style={{backgroundImage: `url("${item.image}")`}}
			>
			</div>
			<h2>{item.name}</h2>
		</div>
	);
}

export default CupboardCard;