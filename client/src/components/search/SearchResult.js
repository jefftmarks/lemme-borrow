import React from "react";
import "./SearchResult.css";

function SearchResult({ result, type, onClickResult }) {

	// ---------- Render Search Card Based on User or Item ----------

	function renderSearchCard() {
		if (type === "user") {
			return (
				<>
					<div><img src={result.avatar} alt="avatar" /></div>
					<p>{result.first_name} {result.last_name}</p>
				</>
			);
		} else {
			return (
				<>
					<div><img src={result.image} alt="item" /></div>
					<p>{result.name}</p>
				</>
			)
		}

	}

	return (
		<div
			className={`search-result ${type}-card`}
			onClick={() => onClickResult(result.id)}
		>
			{renderSearchCard()}
		</div>
	);
}

export default SearchResult;