import { useState, useEffect } from "react";

const History = ({ hamsters }) => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [matches, setMatches] = useState(null);

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
	}

	useEffect(() => {
		getMatches();
	}, []);

	async function deleteMatch(id) {
		await fetch("/api/matches/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			// console.log(JSON.stringify(res))
			// return res.json();
			getMatches();
		});
	}


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
				{matches
					? matches.map((match) => (
							<div key={match.id} className="history-view">
								{hamsters
									.filter(
										(hamster) =>
											hamster.id === match.winnerId &&
											match.winnerId !== match.loserId
									)
									.map((filteredHamster) => (
										<div key={match.winnerId} className="history-box">
											<div className="hamster-img">
												<img
													src={`/api/assets/${filteredHamster.imgName}`}
													alt={`Hamster + ${filteredHamster.id}`}
												/>
											</div>
											<div className="hamster-info">
												<h3>{filteredHamster.name}</h3>
											</div>
										</div>
									))}
								<div className="delete-match">
									<h2> 1:0 </h2>
									<button
										className="match-del-btn"
										onClick={() => deleteMatch(match.id)}
									>
										Delete match
									</button>
								</div>

								{hamsters
									.filter(
										(hamster) =>
											hamster.id === match.loserId &&
											match.winnerId !== match.loserId
									)
									.map((filteredHamster) => (
										<div key={match.loserId} className="history-box">
											<div className="hamster-img">
												<img
													src={`/api/assets/${filteredHamster.imgName}`}
													alt={`Hamster + ${filteredHamster.id}`}
												/>
											</div>
											<div className="hamster-info">
												<h3>{filteredHamster.name}</h3>
											</div>
										</div>
									))}

								{/* 
							<div> {hamsters.filter(hamster => hamster.id === match.loserId).map(filteredHamster => (
								<div>{filteredHamster.name}</div>
							))}
							</div> */}
							</div>
					  ))
					: "loading"}
			</div>
		);
	}
};

export default History;
