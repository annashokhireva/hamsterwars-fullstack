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
import Statistics from "./components/Statistics";
import History from "./components/History";
import "./sass/App.scss";
// import Hamster from "./components/Hamster";

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
					console.log(error);
				}
			);
	}, []);

	// function afterDelete(hamsterId){
	// 	const currentHamsters = hamsters;
	// 	setHamsters (
	// 		currentHamsters.filter(hamster => hamster.id !== hamsterId)
	// 	);
	// }
	// function afterDelete() {
	// 	console.log('it is working!!!!');
	// }

	if (error) {
		return (
			<div className="error-message">
				<img src="/img/500-error.png" alt="error 500"></img>
			</div>
		);
	} else if (!isLoaded) {
		return (
			<div className="loader">
				<div className="loading">
					<p>loading hamsters</p>
					<span></span>
				</div>
			</div>
		);
	} else {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<nav>
							<NavLink exact={true} activeClassName="is-active" to="/">
								Home
							</NavLink>
							<NavLink activeClassName="is-active" to="/battle">
								Compete
							</NavLink>
							<NavLink activeClassName="is-active" to="/gallery">
								Gallery
							</NavLink>
							<NavLink activeClassName="is-active" to="/statistics">
								Statistics
							</NavLink>
							<NavLink activeClassName="is-active" to="/history">
								History
							</NavLink>
						</nav>
						{/* <Modal /> */}
					</header>
				</div>

				<main>
					<img
						src="/img/space.jpg"
						alt="Space background"
						className="bkg-img"
					></img>

					<Switch>
						<Route path="/form">
							<HamsterForm />
						</Route>

						<Route path="/history">
							<History hamsters={hamsters}/>
						</Route>

						<Route path="/statistics">
							<Statistics />
						</Route>

						<Route path="/battle">
							<Battle hamsters={hamsters} />
						</Route>

						<Route path="/gallery">
							{/* <Gallery hamsters={hamsters} render={() => <Hamster hamsters={hamsters} action={() => afterDelete()}/>}/> */}
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
