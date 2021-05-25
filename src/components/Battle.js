import styled from 'styled-components';
// import { useEffect, useState } from 'react';

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

const Battle = () => {

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
			{/* {hamsters
				? hamsters.map(hamster => ( */}
					<HamsterBox></HamsterBox>
				<HamsterBox ></HamsterBox>
			
				{/* ))
				: 'Preparing contestants' */}
			{/* } */}
				
			</Contestants>
		</div>
	)
}

export default Battle;