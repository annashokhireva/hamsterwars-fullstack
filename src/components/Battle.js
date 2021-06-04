import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchRandomHamster } from '../utils/randomHamster.js';
import { fetchHamsterId } from '../utils/hamsterId.js';
import { updateWinsDefeats } from '../utils/updateWinsDefeats.js';
import { updateMatch } from '../utils/updateMatch.js';

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
`;

const Battle = () => {
	const [hamster1, setHamster1] = useState({});
	const [hamster2, setHamster2] = useState({});
	const [hamster1isWinner, setHamster1IsWinner] = useState(false);
	const [hamster2isWinner, setHamster2IsWinner] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [clicked, setClicked] = useState(false);

	const params = useParams();

	async function getHamsters() {
		if (params.id1 && params.id2) {
			fetchHamsterId(setHamster1, params.id1);
			fetchHamsterId(setHamster2, params.id2);
		} else {
			await fetchRandomHamster(setHamster1);
			await fetchRandomHamster(setHamster2, hamster1.id);
		}

		setClicked(false);
		setHamster1IsWinner(false);
		setHamster2IsWinner(false);
	}
	useEffect(() => {
		getHamsters();
		setShowInfo(false);
	},[params]);

	let contestants = hamster1 && hamster2;

	async function handleWinner(winner, loser) {

		if (!clicked) {
			setClicked(true);			

			if (hamster1 === winner) {
				setHamster1IsWinner(true);
				winner = { ...hamster1, wins: hamster1.wins +1, games: hamster1.games +1 }
				setHamster1(winner);
				loser = { ...hamster2, defeats:  hamster2.defeats +1, games: hamster2.games +1 }
				setHamster2(loser);
			}
			else if(hamster2 === winner) {
				setHamster2IsWinner(true);
				winner = { ...hamster2, wins: hamster1.wins +1, games: hamster2.games +1 }
				setHamster2(winner);
				loser = { ...hamster1, defeats: hamster2.defeats +1, games: hamster1.games +1 }
				setHamster1(loser);
			}

			updateWinsDefeats(winner, loser);
			updateMatch(winner, loser);

			setShowInfo(true);
			
		}

		else {
			console.log('You can only choose 1 time')
		}
	}

	return (
		<div className="main-view">
			<h2> Choose the cutest hamster! </h2>

			{contestants ? (
				<Contestants>
					<div className="battle-view">
						<img
							src={`/api/assets/${hamster1.imgName}`}
							alt={`Hamster  ${hamster1.id}`}
							className={hamster1isWinner ? "selected hamster-box-battle" : "hamster-box-battle"}
							onClick={() => handleWinner(hamster1, hamster2)}
						/>
						{showInfo ? (
							<div className="game-info">
								{hamster1isWinner ? (
									<div className="winner">
										<h3>Winner</h3>
										<img src="/icons/cup.svg" alt="Winner cup"/>
									</div>
								):
								(<div className="loser">
									<h3>Loser</h3>
									<img src="/icons/sad-hamster.svg" alt="Sad hamster"/>
								</div>)}
								<h3>{hamster1.name}</h3>
								<p>
									<b>Won:</b> {hamster1.wins} times
								</p>
								<p>
									<b>Lost:</b> {hamster1.defeats} times
								</p>
								<p>
									<b>Total battles:</b> {hamster1.games}
								</p>
							</div>
						) : null}
					</div>

					<div className="battle-view">
						<img
							src={`/api/assets/${hamster2.imgName}`}
							alt={`Hamster  ${hamster2.id}`}
							className={hamster2isWinner ? "selected hamster-box-battle" : "hamster-box-battle"}
							onClick={() => handleWinner(hamster2, hamster1)}
						/>
						{showInfo ? (
							<div className="game-info">
								{hamster2isWinner ? (
									<div className="winner">
										<h3>Winner</h3>
										<img src="/icons/cup.svg" alt="Winner cup"/>
									</div>
								):
								(<div className="loser">
									<h3>Loser</h3>
									<img src="/icons/sad-hamster.svg" alt="Sad hamster"/>
								</div>)}
								<h3>{hamster2.name}</h3>
								<p>
									<b>Won:</b> {hamster2.wins} times
								</p>
								<p>
									<b>Lost:</b> {hamster2.defeats} times
								</p>
								<p>
									<b>Total battles:</b> {hamster2.games}
								</p>
							</div>
						) : null}
					</div>
				</Contestants>
			) : (
				<div className="loader">
					<div className="loading">
						<p>loading contestants</p>
						<span></span>
					</div>
				</div>
			)}

			{showInfo ? (
				<button
					className="button"
					onClick={() => {
						getHamsters();
						setShowInfo(false);
					}}
				>
					New Battle
				</button>
			) : null}
		</div>
	);
};

export default Battle;
