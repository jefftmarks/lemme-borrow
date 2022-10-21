import React from "react";
import "./SearchResult.css";

function SearchResult({ result, type, onClickResult }) {

	// ---------- Render Search Card Based on User or Item ----------

	function renderSearchCard() {
		if (type === "user") {
			return (
				<>
					<img src={result.avatar} alt="avatar" />
					<p>{result.first_name} {result.last_name}</p>
				</>
			);
		} else {
			return (
				<>
					<img src={result.image} alt="item" />
					<p>{result.name}</p>
				</>
			)
		}

	}

	return (
		<div
			className={`search-result`}
			onClick={() => onClickResult(result.id)}
		>
			{renderSearchCard()}
		</div>
	);
}

export default SearchResult;