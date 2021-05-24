import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route,
	NavLink,
	Redirect,
} from "react-router-dom";
import Battle from './components/battle/Battle';
import Gallery from './components/gallery/Gallery';
import HomePage from './components/home/HomePage'
import './sass/App.scss';

function App() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<nav>
						<img src="/icons/hamster-logo.svg" class="logo"></img>
						
						<div class="nav-links">
							<div></div>
							<Link to="/"> Home </Link>
							<Link to="/battle"> Compete </Link>
							<Link to="/gallery"> Gallery </Link>
						</div>
						
					</nav>
				</header>
			</div>

			<main>
				<img src="/img/space.jpg" class="bkg-img"></img>
				<Switch>
					<Route path="/battle">
						<Battle />
					</Route>

					<Route path="/gallery">
						<Gallery />
					</Route>

					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
				
			</main>
		</Router>
	);
}

export default App;
