import styled from "styled-components";
import {Link} from "react-router-dom";
// import Modal from "./HamsterModal";

const GalleryGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-auto-rows: auto;
	row-gap: 1.5em;
	column-gap: 2.5em;
	margin: 2em;

	> * {
		justify-self: center;
	}

	@media only screen and (min-width: 600px) {
		flex-direction: row;
		justify-content: center;
	}
`;


const Gallery = (props) => (
	<div className="main-view">
		<h1> Galleriet </h1>
		<GalleryGrid>
			<Link to="/form" className="add-hamster">
				<img src="/icons/hamster-logo.svg" alt="Hamster icon" className="hamster-img hamster-icon"></img>
				<div className="add-new">
					<h2>+ Add new hamster</h2>
				</div>
				
			</Link>
			
			{props.hamsters
				? props.hamsters.map((hamster) => (
						<div
							className="hamster-box"
							key={hamster.id}
							// onClick={(e) => {
							// 	this.showModal();
							// }}
						>
							<img
								src="/icons/delete.svg"
								alt="Cross icon"
								className="delete"
							></img>

							<img
								src={`/api/assets/${hamster.imgName}`}
								alt={`Hamster  ${hamster.id}`}
								className="hamster-img"
							></img>

							<div className="hamster-info">
								<h2>{hamster.name} </h2>
							</div>
						</div>
				  ))
				: "Preparing contestants"}
		</GalleryGrid>
		{/* <Modal /> */}
	</div>
);

export default Gallery;

// import { useEffect, useState } from 'react';

// const Gallery = () => {
// 	const [hamsters, setHamsters] = useState('');

// 	useEffect(() => {
// 		async function get() {
// 			const response = await fetch('/hamsters', { method: 'GET' });
// 			const data = await response.json();

// 			setHamsters(data);
// 		}
// 		get();
// 	}, []);

// 	return(
// 		<div>
// 			<h1> Galleriet </h1>

// 			{hamsters
// 				? hamsters.map(hamster => (
// 					<div key={hamster.id}>{hamster}</div>

// 				))
// 				: 'Preparing contestants'
// 			}

// 		</div>
// 	)
// }

// export default Gallery;
