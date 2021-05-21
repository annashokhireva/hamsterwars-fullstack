import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route,
	NavLink,
	Redirect,
} from "react-router-dom";
import "./App.css";
import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import Start from './components/start/Start'

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<nav>
						<Link to="/"> Start </Link>
						<Link to="/battle"> Tävla </Link>
						<Link to="/gallery"> Galleri </Link>
					</nav>
				</header>
			</div>

			<main>
				<Switch>
					<Route path="/battle">
						<Battle />
					</Route>

					<Route path="/gallery">
						<Gallery />
					</Route>

					<Route path="/">
						<Start />
					</Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;
