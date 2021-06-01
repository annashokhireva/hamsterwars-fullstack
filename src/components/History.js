import { useState, useEffect } from "react";

const History = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [matches, setMatches] = useState(null);
	
	useEffect(() => {
		function getMatches() {
			fetch("/api/matches", { method: "GET" })
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setMatches(result);
				},

				(error) => {
					setIsLoaded(true);
					setError(error);
					console.log(error);
				}
			);
		};
		getMatches();
	}, []);

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
					<p>loading matches</p>
					<span></span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="main-view">
				{matches ? (
					matches.map((match) => (
						<div key={match.id}>{match.loserId}</div>
					))
				):
				'loading'}
			</div>
		);
	}
};

export default History;
