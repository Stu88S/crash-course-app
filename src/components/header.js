export { Header };

function Header() {
	return (
		<header className="header">
			<div className="logo">
				<img src="logo.png" alt="Today I Learned Logo" />
				<h1>Today I Learned!</h1>
			</div>
			<button className="btn btn-large btn-share">Share a fact</button>
		</header>
	);
}

export default Header;
