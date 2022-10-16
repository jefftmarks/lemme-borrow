import React from "react";
import "./Controls.css"

function Controls({ ticket, isOwner, onClickUndo }) {

	function renderButtons() {
		// If not your item
		if (!isOwner) {
			if (ticket.status === "requested") {
				return (
					<button onClick={onClickUndo}>
						Undo Your Request
					</button>
				)
			}
		}
	}

	return (
		<div id="controls">
			{renderButtons()}
		</div>
	);
}

export default Controls;