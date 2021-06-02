// import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import Hamster from "./Hamster";

// export const GalleryGrid = styled.div`
// 	width: 100%;
// 	display: grid;
// 	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
// 	grid-auto-rows: auto;
// 	row-gap: 1.5em;
// 	column-gap: 2.5em;
// 	margin: 2em;
// 	padding: 0 2em;

// 	> * {
// 		justify-self: center;
// 	}

// 	@media only screen and (min-width: 600px) {
// 		flex-direction: row;
// 		justify-content: center;
// 	}
// `;


const Gallery = (props) => {

	return (
		<div className="main-view">
			<h1> Galleriet </h1>
			<div className="gallery-grid">
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

				{/* <Hamster props={props}/> */}
				{props.hamsters ? (
					props.hamsters.map((hamster, i) => (
						<Hamster hamster={hamster} showDelete={true} key={hamster.id}/>
						// <div
						// 	className="hamster-box"
						// 	key={hamster.id}
						// >
						// 	<img
						// 		src={`/api/assets/${hamster.imgName}`}
						// 		alt={`Hamster  ${hamster.id}`}
						// 		className="hamster-img"
						// 	></img>

						// 	<div className="hamster-info">
						// 		<h2>{hamster.name} </h2>

						// 		<div className="extra-info"
						// 		>
						// 			<p>Age:{hamster.age}</p>
						// 			<p>Favourite food: {hamster.favFood} </p>
						// 			<p>Loves: {hamster.loves}</p>
						// 			<p>Battles: {hamster.games} </p>
						// 			<p>Wins: {hamster.wins}</p>
						// 			<p>Defeats: {hamster.defeats} </p>
						// 			<img
						// 				src="/icons/delete.svg"
						// 				alt="Cross icon"
						// 				className="delete"
						// 				onClick={() => {
						// 					deleteHamster(hamster.id)
						// 					}}
						// 				//filter (ändra function) (listor)
						// 			></img>
						// 		</div>
						// 	</div>
						// </div>
						
					))
				) : (
					<div className="loader">
						<div className="loading">
							<p>loading hamsters</p>
							<span></span>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export default Gallery;
