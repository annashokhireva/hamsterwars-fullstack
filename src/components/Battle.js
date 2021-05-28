import styled from "styled-components";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

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

const HamsterBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10em;	
	height: 5em;	
	border: 2px solid yellow;
	margin: 3em 1em; 

	@media only screen and (min-width: 600px) {
		margin: 1em 3em; 
	}
`

const Battle = (props) => {

	// const [hamster1, setHamster1] = useState({});
	// const [hamster2, setHamster2] = useState({});
	// const params = useParams();

	// useEffect(() => {

	// 	async function getHamsters() {
	// 		if(params.id1 && params.id2) {
                
    //             fetchIdHamster(setHamster1, params.id1);
    //             fetchIdHamster(setHamster2, params.id2);

    //         } else {
                
    //             await fetchHamster(setHamster1);
    //             await fetchHamster(setHamster2, hamster1.id);

    //         }
	// 	}

	// 	getHamsters();
	// }, [params])

	// const [hamsters, setHamsters] = useState('');

	// useEffect(() => {
	// 	async function get() {
	// 		const response = await fetch('/hamsters', { method: 'GET' });
	// 		const data = await response.json();
		
	// 		setHamsters(data);
	// 	}
	// 	get();
	// }, []);

	return(
		<div className="main-view">
			<h2> Fight! </h2>
			<Contestants>
			{props.hamsters
				? props.hamsters.map(hamster => ( 
					<HamsterBox> {hamster.name}</HamsterBox>
					// <HamsterBox ></HamsterBox>
			
				))
				: 'Preparing contestants' 
			}
				
			</Contestants>
		</div>
	)
}

export default Battle;