import {
	BrowserRouter as Router,
	// Link,
	Switch,
	Route,
	NavLink,
	// Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Battle from "./components/Battle";
import Gallery from "./components/Gallery";
import HomePage from "./components/HomePage";
import "./sass/App.scss";

// const hamstersData = [];

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hamsters, setHamsters] = useState([]);

	useEffect(() => {
		fetch("/api/hamsters")
			.then((res) => res.json())
			.then(
				(data) => {
					setIsLoaded(true);
					setHamsters(data);
				},

				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		// return (
		// 	<ul>
		// 		{hamsters.map((hamster) => (
		// 			<li key={hamster.id}>{hamster.name}</li>
		// 		))}
		// 	</ul>
		// );
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<nav>
							<NavLink exact={true} activeClassName="is-active" to="/">
								{" "}
								Home{" "}
							</NavLink>
							<NavLink activeClassName="is-active" to="/battle">
								{" "}
								Compete{" "}
							</NavLink>
							<NavLink activeClassName="is-active" to="/gallery">
								{" "}
								Gallery{" "}
							</NavLink>
						</nav>
					</header>
				</div>
	
				<main>
					<img
						src="/img/space.jpg"
						alt="Space background"
						className="bkg-img"
					></img>

				<ul>
					{hamsters.map((hamster) => (
						<li key={hamster.id}>{hamster}</li>
					))}
				</ul>
					<Switch>
						<Route path="/battle">
							<Battle />
						</Route>
	
						<Route
							path="/gallery"
							render={() => <Gallery items={hamsters} />}
						/>
	
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</main>
			</Router>
		);
	}

}

export default App;
