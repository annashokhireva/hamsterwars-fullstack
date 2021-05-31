import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchRandomHamster } from './utils/RandomHamster';
import { fetchHamsterId } from './utils/HamsterId';
import { handleWinner } from './utils/HandleWinner';

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
	
	const params = useParams();

	useEffect(() => {
		async function getHamsters() {

			if(params.id1 && params.id2) {
				
				fetchHamsterId(setHamster1, params.id1);
				fetchHamsterId(setHamster2, params.id2);

			} else {
				
				await fetchRandomHamster(setHamster1);
				await fetchRandomHamster(setHamster2, hamster1.id);

			}

		}
		
		getHamsters();

    }, [params])

	let contestants = hamster1 && hamster2;

	return(
		<div className="main-view">
			<h2> Fight! </h2>
	
			{contestants ? (
				<Contestants>
					
					<img
						src={`/api/assets/${hamster1.imgName}`}
						alt={`Hamster  ${hamster1.id}`}
						className="hamster-box-battle"
						onClick={() => (handleWinner(hamster1, hamster2))}
					></img>
			
				
					<img
						src={`/api/assets/${hamster2.imgName}`}
						alt={`Hamster  ${hamster2.id}`}
						className="hamster-box-battle"
						onClick={() => (handleWinner(hamster2, hamster1))}
					></img>
					
				</Contestants>
			) : <div class="loader">
					<div class="loading">
						<p>loading contestants</p>
						<span></span>
					</div>
		 		</div> 
			}
				
			
		</div>
	)
}

export default Battle;

// on reload får felmeddelande