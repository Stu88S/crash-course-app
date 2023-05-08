import Header from "./components/header";
import NewFactForm from "./components/factForm";
import CategoryFilter from "./components/category";
import FactList from "./components/factList";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function App() {
	// 1. Define state variable
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

	useEffect(
		function () {
			async function getFacts() {
				setIsLoading(true);

				let query = supabase.from("facts").select("*");

				if (currentCategory !== "all") query = query.eq("category", currentCategory);

				const { data: facts, error } = await query.order("votesInteresting", { ascending: false }).limit(100);

				if (!error) setFacts(facts);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getFacts();
		},
		[currentCategory]
	);

	return (
		<>
			<Header showForm={showForm} setShowForm={setShowForm} />
			{/* 2. Use state variable */}
			{showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}

			<main className="main">
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				{isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
			</main>
		</>
	);
}

export default App;
