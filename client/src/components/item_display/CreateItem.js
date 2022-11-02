import React, { useState, useEffect, useContext } from "react";
import { ActiveUserContext } from "../../context/active_user";
import "./CreateItem.css";

const initialState = {
	name: "",
	image: "",
	description: "",
	tags: "",
}

function CreateItem({ setShowItem }) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [formData, setFormData] = useState(initialState);
	const [tagCards, setTagCards] = useState([]);	

	// ---------- Render Tag Cards to Confirm Correct Format ----------

	useEffect(() => {
		// Use setTimeout so there isn't "typewriter" effect
		const updateTagCards = setTimeout(() => {
		// Remove semi-colons
		const arr = formData.tags.split(/\s*;\s*/gm);
		// Filter out empty elements and grab first five
		const filteredArr = arr.filter((el) => el !== "").splice(0, 5);
		// Add lowercase tags to a set to account for uniqueness
		const set = new Set();
		filteredArr.forEach((el) => set.add(el.toLowerCase()));
		// Render tag cards
		setTagCards(Array.from(set));
		}, 300);

		return () => {
			clearTimeout(updateTagCards);
		}
	}, [formData.tags]);

	// ---------- Submit New Item ----------

	function handleChange(e) {
		const { value, name } = e.target;
		setFormData({...formData, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newItem = {
			name: formData.name,
			image: formData.image,
			description: formData.description,
			owner_id: activeUser.id,
			tags: tagCards,
			status: "home"
		}
		fetch("/api/items", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})
			.then((res) => {
				if (res.ok) {
					res.json().then((item) => {
						setShowItem({item: null, mode: ""});
						setFormData(initialState);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}

	return (
		<div className="edit-item">
			<form onSubmit={handleSubmit}>
				<label><p>Item Name:</p>
					<input
					required
					type="text"
					name="name"
					onChange={handleChange}
					value={formData.name}
					/>
				</label>
				<label><p>Image:</p>
					<input
					required
					type="text"
					name="image"
					onChange={handleChange}
					value={formData.image}
					/>
				</label>
				<label><p>Description:</p>
					<textarea
					name="description"
					rows="5"
					onChange={handleChange}
					value={formData.description}
					>
					</textarea>
				</label>
				<label className="tags-label"><p>Tags:</p>
					<div className="edit-tags">
						<div className="instructions">
							<p>maximum five tags separated by a semi-colon</p>
							<p>tags must be unique</p>
							<p>book; sci-fi; used;</p>
						</div>
						<textarea
						name="tags"
						rows="2"
						onChange={handleChange}
						value={formData.tags}
						>
						</textarea>
						<div className="tag-display">
							{tagCards.map((tag) => (
								<p key={tag}>{tag}</p>
							))}
						</div>
					</div>
				</label>
				<button className="update-item-btn">Create Item</button>
			</form>
		</div>
	);
}

export default CreateItem;