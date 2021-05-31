import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Hamster from "./Hamster";

const GalleryGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-auto-rows: auto;
	row-gap: 1.5em;
	column-gap: 2.5em;
	margin: 2em;
	padding: 0 2em;

	> * {
		justify-self: center;
	}

	@media only screen and (min-width: 600px) {
		flex-direction: row;
		justify-content: center;
	}
`;

function deleteHamster(target){
	// 	const index = hamsters.indexOf(hamster);
	// 				hamsters.splice(index, 1);
	console.log(target);
}


const Gallery = (props) => {
	// const [style, setStyle] = useState({display: 'none'});


	return (
		<div className="main-view">
			<h1> Galleriet </h1>
			<GalleryGrid>
				<Link to="/form" className="add-hamster">
					<img
						src="/icons/hamster-logo.svg"
						alt="Hamster icon"
						className="hamster-img hamster-icon"
					></img>
					<div className="add-new">
						<h3>+ Add new hamster</h3>
					</div>
				</Link>

				{props.hamsters
					? props.hamsters.map((hamster) => (
						// <Hamster hamster={hamster}/>
						<div
							className="hamster-box"
							key={hamster.id}
							// onMouseEnter={e => {
							// 	setStyle({display: 'block'});
							// }}
							// onMouseLeave={e => {
							// 	setStyle({display: 'none'})
							// }}
							// onClick={(e) => {
							// 	this.showModal();
							// }}
						>

							<img
								src={`/api/assets/${hamster.imgName}`}
								alt={`Hamster  ${hamster.id}`}
								className="hamster-img"
							></img>

							<div className="hamster-info">
								<h2>{hamster.name} </h2>
								<img
									src="/icons/delete.svg"
									alt="Cross icon"
									className="delete"
									onClick={(event) =>deleteHamster(event.target.parentElement)}
								></img>
							</div>
						</div>
					  ))
					: "Preparing contestants"} 

					{/* {del ? (
						<img
							src="/icons/delete.svg"
							alt="Cross icon"
							className="delete"
							onClick={(event) =>deleteHamster(event.target)}
						></img>
					) : null} */}

				{/* <div>
					<Hamster hamsters={props.hamsters} />
				</div> */}

				
			</GalleryGrid>
			
		</div>
	);
};

export default Gallery;

