import { useState, useEffect } from 'react';
import { fetchHamsterId } from './utils/HamsterId';
import { useParams } from 'react-router-dom';


const History = (props) => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [matches, setMatches] = useState(null);

	const [winner, setWinner] = useState({});
	const [loser, setLoser] = useState({});

	// const params = useParams();
	
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
			)
		};
		getMatches();

		// const params = useParams();

	
		// async function getHamsters() {

		// 	if(params.id1 && params.id2) {
				
		// 		fetchHamsterId(setHamster1, params.id1);
		// 		fetchHamsterId(setHamster2, params.id2);

		// 	} else {
				
		// 		await getMatches(setHamster1);
		// 		await getMatches(setHamster1);;

		// 	}

		// }
		
		// getHamsters();

	}, []);

	// function showWinner(matches, props) {
	// 	// matches.map((match) => 
	// 	// 	{setWinner(match.winnerId)});
	// 	console.log(matches, props);	
	// 	// props.hamsters.filter(hamster => hamster.id === {winner})
	// }
	// showWinner();
	// console.log(matches, props);

	// let matchWinner = matches.map(match => match.winnerId);

	// let test = props.hamsters.filter(hamster => hamster.id === this.match.winnerId);

	// let test = matches.map((match) => {match.winnerId});

	let hamsters = props.hamsters;

	console.log(hamsters);


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
						<div key={match.id} >
							{match.winnerId} vs {match.loserId}
							
						</div>
					))
				):
				'loading'}
			</div>
		);
	}
};

export default History;
