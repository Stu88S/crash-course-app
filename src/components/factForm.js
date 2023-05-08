import { useState } from "react";
import supabase from "../supabase.js";
import CATEGORIES from "../data.js";

function isValidUrl(urlString) {
	try {
		new URL(urlString);
		return true;
	} catch (error) {
		return false;
	}
}

function NewFactForm({ setFacts, setShowForm }) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("https://example.com");
	const [category, setCategory] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const textLength = text.length;

	async function handleSubmit(e) {
		// 1. Prevent browser reload
		e.preventDefault();

		// 2. Check if data is valid. If sp, create a new fact
		if (text && isValidUrl(source) && category && textLength <= 200) {
			// 3. Create a new fact object
			// const newFact = {
			// 	id: Math.round(Math.random() * 1000000),
			// 	text,
			// 	source,
			// 	category,
			// 	votesInteresting: 0,
			// 	votesMindblowing: 0,
			// 	votesFalse: 0,
			// 	createdIn: new Date().getFullYear(),
			// };

			// 3. Upload fact to Supabase and recieve the new fact object
			setIsUploading(true);
			const { data: newFact, error } = await supabase.from("facts").insert([{ text, source, category }]).select();
			setIsUploading(false);

			// 4. Add the new fact to the UI: add the fact to state
			if (!error) setFacts(facts => [newFact[0], ...facts]);

			// 5. Reset the input fields
			setText("");
			setSource("");
			setCategory("");

			// 6. Close the form
			setShowForm(false);
		}
	}

	return (
		<form className="fact-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Share a fact with the world..."
				value={text}
				onChange={e => setText(e.target.value)}
				disabled={isUploading}
				maxLength={200}
			/>
			<span>{200 - textLength}</span>
			<input type="text" placeholder="Trustworthy source..." value={source} onChange={e => setSource(e.target.value)} />
			<select value={category} onChange={e => setCategory(e.target.value)} disabled={isUploading}>
				<option value="">Choose category</option>
				{CATEGORIES.map(cat => (
					<option key={cat.name} value={cat.name}>
						{" "}
						{cat.name.toUpperCase()}{" "}
					</option>
				))}
			</select>
			<button className="btn btn-large" disabled={isUploading}>
				Post
			</button>
		</form>
	);
}

export default NewFactForm;
