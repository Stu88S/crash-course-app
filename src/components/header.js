function Header({ showForm, setShowForm }) {
	return (
		<header className="header">
			<div className="logo">
				<img src="logo.png" alt="Today I Learned Logo" />
				<h1>Today I Learned!</h1>
			</div>
			{/* 3. Update state variable */}
			<button className="btn btn-large btn-share" onClick={() => setShowForm(show => !show)}>
				{showForm ? "Close" : "Share a fact"}
			</button>
		</header>
	);
}

export default Header;
