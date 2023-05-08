import { useState } from "react";
import CATEGORIES from "../data.js";
import supabase from "../supabase.js";

function FactList({ facts, setFacts }) {
	if (facts.length === 0) {
		return <p className="message">No facts for this category yet! Create the first one ✌️</p>;
	}

	return (
		<section>
			<ul key={facts.id} className="facts-list">
				{facts.map(fact => (
					<Fact key={fact.id} fact={fact} setFacts={setFacts} />
				))}
			</ul>
		</section>
	);
}

function Fact({ fact, setFacts }) {
	const [isUpdating, setIsUpdating] = useState(false);

	async function handleVote(columnName) {
		setIsUpdating(true);
		const { data: updatedFact, error } = await supabase
			.from("facts")
			.update({ [columnName]: fact[columnName] + 1 })
			.eq("id", fact.id)
			.select();
		setIsUpdating(false);

		if (!error) setFacts(facts => facts.map(f => (f.id === fact.id ? updatedFact[0] : f)));
	}

	return (
		<li className="fact">
			<p>
				{fact.text}
				<a className="source" href={fact.source} rel="noreferrer" target="_blank">
					(Source)
				</a>
			</p>
			<span className="tag" style={{ backgroundColor: CATEGORIES.find(cat => cat.name === fact.category).color }}>
				{fact.category}
			</span>
			<div className="vote-buttons">
				<button onClick={() => handleVote("votesInteresting")} disabled={isUpdating}>
					👍 {fact.votesInteresting}
				</button>
				<button onClick={() => handleVote("votesMindblowing")} disabled={isUpdating}>
					🤯 {fact.votesMindblowing}
				</button>
				<button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
					⛔️ {fact.votesFalse}
				</button>
			</div>
		</li>
	);
}

export default FactList;
