import Header from "./components/header";
import NewFactForm from "./components/factForm";
import CategoryFilter from "./components/category";
import FactList from "./components/factList";
import "./style.css";

function App() {
	return (
		<>
			<Header />
			{/* <NewFactForm /> */}
			<main className="main">
				<CategoryFilter />
				<FactList />
			</main>
		</>
	);
}

export default App;

