import { CATEGORIES, initialFacts } from "../data";

function FactList() {
	const fact = initialFacts;

	return (
		<section>
			<ul className="facts-list">
				{fact.map(fact => (
					<Fact fact={fact} />
				))}
			</ul>
		</section>
	);
}

function Fact({ fact }) {
	return (
		<li key={fact.id} className="fact">
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
				<button>👍 {fact.votesInteresting}</button>
				<button>🤯 {fact.votesMindblowing}</button>
				<button>⛔️ {fact.votesFalse}</button>
			</div>
		</li>
	);
}

export default FactList;
