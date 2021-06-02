import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { getHamsters } from './utils/GetHamsters';
import { fetchRandomHamster } from './utils/RandomHamster';
import { fetchHamsterId } from './utils/HamsterId';
import { updateWinsDefeats } from './utils/UpdateWinsDefeats';
import { updateMatch } from './utils/UpdateMatch';


const Contestants = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2em;

	@media only screen and (min-width: 600px) {
		flex-direction: row;
		justify-content: center;
	}
`

const Battle = () => {

	const [hamster1, setHamster1] = useState({});
	const [hamster2, setHamster2] = useState({});

	const [showInfo, setShowInfo] = useState(false);
	
	const params = useParams();

	async function getHamsters() {

		if(params.id1 && params.id2) {
			
			fetchHamsterId(setHamster1, params.id1);
			fetchHamsterId(setHamster2, params.id2);

		} else {
			
			await fetchRandomHamster(setHamster1);
			await fetchRandomHamster(setHamster2, hamster1.id);

		}

	};
	useEffect(() => {

		getHamsters();

    }, [params])

	let contestants = hamster1 && hamster2;

	// let winnerHamster;

	

	async function handleWinner (winner, loser) {
		console.log('winner: ' + winner.name, 'loser: ' + loser.name);
	
		updateWinsDefeats(winner, loser);
		updateMatch(winner, loser);

		// winnerHamster = winner.name;

		setShowInfo(true);

	}

	return(
		<div className="main-view">
			<h2> Fight! </h2>
	
			{contestants ? (
				<Contestants>
					<div>
						<img
							src={`/api/assets/${hamster1.imgName}`}
							alt={`Hamster  ${hamster1.id}`}
							className="hamster-box-battle"
							onClick={() => (handleWinner(hamster1, hamster2))}
						></img>
						{ showInfo ? (
							<div className='game-info'>
								<h3>{hamster1.name}</h3>
								<p><b>Won:</b> { hamster1.wins } times</p>
								<p><b>Lost:</b> { hamster1.defeats } times</p>
								<p><b>Total battles:</b> { hamster1. games }</p>
							</div>
						):
						null }
					</div>
					
			
					<div>
						<img
							src={`/api/assets/${hamster2.imgName}`}
							alt={`Hamster  ${hamster2.id}`}
							className="hamster-box-battle"
							onClick={() => (handleWinner(hamster2, hamster1))}
						></img>
						{ showInfo ? (
							<div className='game-info'>
								<h3>{hamster2.name}</h3>
								<p><b>Won:</b> { hamster2.wins } times</p>
								<p><b>Lost:</b> { hamster2.defeats } times</p>
								<p><b>Total battles:</b> { hamster2. games }</p>
							</div>
						):
						null }
					</div>
					
				</Contestants>
			) : <div className="loader">
					<div className="loading">
						<p>loading contestants</p>
						<span></span>
					</div>
		 		</div> 
			}
			
			{ showInfo ? (
				<button onClick={() => getHamsters()}>Restart</button>
			):
			null
			}
			
			
		</div>
	)
}

export default Battle;

// on reload får felmeddelande