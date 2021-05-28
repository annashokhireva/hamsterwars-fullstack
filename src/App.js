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
import HamsterForm from "./components/HamsterForm";
import "./sass/App.scss";

//const hamstersData = [];

function App() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hamsters, setHamsters] = useState(null);

	useEffect(() => {
		fetch("/api/hamsters", { method: "GET" })
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setHamsters(result);
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
		return <div>Loading hamsters...</div>;
	} else {
		
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

					{/* <ul>
						{hamsters.map((hamster) => (
							<li key={hamster.id}>{hamster.name}</li>
						))}
					</ul> */}

					<Switch>
						<Route path="/form">
							<HamsterForm/>
						</Route>

						<Route path="/battle">
							<Battle hamsters={hamsters}/>
						</Route>

						<Route path="/gallery">
							<Gallery hamsters={hamsters} />
						</Route>
						
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
