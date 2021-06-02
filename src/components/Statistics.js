import { useState, useEffect } from "react";
import Hamster from "./Hamster";

const Statistics = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [winners, setWinners] = useState(null);
	const [losers, setLosers] = useState(null);
	
	useEffect(() => {
		function getWinners() {
			fetch("/api/winners", { method: "GET" })
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setWinners(result);
				},

				(error) => {
					setIsLoaded(true);
					setError(error);
					console.log(error);
				}
			);
		};
		getWinners();

		function getLosers() {
			fetch("/api/losers", { method: "GET" })
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setLosers(result);
				},

				(error) => {
					setIsLoaded(true);
					setError(error);
					console.log(error);
				}
			);
		};
		getLosers();

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
					<p>loading winners</p>
					<span></span>
				</div>
			</div>
		);
	} else {
		return (
			<div className="main-view">
				<div className="list-of-5">
					<h2>Top 5 winners</h2>
					<div className="stat-view">
						{winners ? (
							winners.map((winner, i) => (
								// <div className="hamster-box"
								// key={winner.id}>
								// 	<div> {winner.name} </div>
								// </div>
								<Hamster hamster={winner} key={i}/>
							))
						) : (
							<div className="loader">
								<div className="loading">
									<p>loading winners</p>
									<span></span>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="list-of-5">
					<h2>Top 5 losers</h2>
					<div className="stat-view">
						{losers ? (
							losers.map((loser, i) => (
								// <div className="hamster-box"
								// key={winner.id}>
								// 	<div> {winner.name} </div>
								// </div>
								<Hamster hamster={loser} key={i}/>
							))
						) : (
							<div className="loader">
								<div className="loading">
									<p>loading losers</p>
									<span></span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
};

export default Statistics;
