import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Hamster from "./Hamster";

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

// let hamster;

// function hamsterI(hamsters) {
// 	for (let index = 0; index < hamsters.length; index++) {
// 	hamster = hamsters[index];
// 	return hamster;
// 	}
// }

const Gallery = (props) => {
	const [active, setActive] = useState({});
	// const [show, setShow] = useState(false);
	let hamsters;

	async function deleteHamster(id) {
		await fetch("/api/hamsters/" + id, { method: "DELETE" })
			.then((res) => {
				return res.json();
			})
			.then(
				(result) => {
					hamsters = result;
					hamsters.filter((hamster) => hamster.id !== id);
				},

				(error) => {
					console.log("Delete failed, ", error);
					return null;
				}
			);
	}

	// async function deleteHamster(id){

	// 	const requestOptions = {
	// 		method: 'DELETE'
	// 	};

	// 	try {
	// 		console.log(id);

	// 		const response = await fetch('/api/hamsters/' + id, requestOptions)
	// 		const data = await response.json();
	// 		console.log(data);
	// 		return data;
	// 	}
	// 	catch (error) {
	// 		console.log("Delete failed, ", error);
	// 		return null;
	// 	}
	// }

	// function filterHamsters(id) {
	// 	console.log(props.hamsters);
	// 	props.hamsters.filter(hamster => hamster.id === id);
	// }

	function showInfo(index) {
		setActive((prevState) => {
			return { active: { ...prevState.active, [index]: true } };
		});
	}

	function hideInfo(index) {
		setActive((prevState) => {
			return { active: { ...prevState.active, [index]: false } };
		});
	}

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

				{/* <Hamster props={props}/> */}
				{props.hamsters ? (
					props.hamsters.map((hamster, index) => (
						// <Hamster hamster={hamster}/>
						<div
							className="hamster-box"
							key={hamster.id}
							onMouseEnter={(e) => {
								showInfo(index);
							}}
							onMouseLeave={(e) => {
								hideInfo(index);
							}}
							// onClick={(e) => {showModal()}}
						>
							<img
								src={`/api/assets/${hamster.imgName}`}
								alt={`Hamster  ${hamster.id}`}
								className="hamster-img"
							></img>

							<div className="hamster-info">
								<h2>{hamster.name} </h2>

								<div className={active ? "extra-info" : null}>
									<p>Age:{hamster.age}</p>
									<p>Favourite food: {hamster.favFood} </p>
									<p>Loves: {hamster.loves}</p>
									<p>Battles: {hamster.games} </p>
									<p>Wins: {hamster.wins}</p>
									<p>Defeats: {hamster.defeats} </p>
									<img
										src="/icons/delete.svg"
										alt="Cross icon"
										className="delete"
										onClick={() => {
											deleteHamster(hamster.id)
											}}
										//filter (ändra function) (listor)
									></img>
								</div>
							</div>
						</div>
					))
				) : (
					<div class="loader">
						<div class="loading">
							<p>loading hamsters</p>
							<span></span>
						</div>
					</div>
				)}

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
