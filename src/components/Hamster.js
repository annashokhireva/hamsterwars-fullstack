// import { render } from "@testing-library/react";
import { useState, useEffect } from "react";

const Hamster = (hamster) => {

	// function deleteHamster(id){
	// 	// 	const index = hamsters.indexOf(hamster);
	// 	// 				hamsters.splice(index, 1);

	// 	console.log(id);

	// }

	// useEffect(() => {
	// 	setHamster(props.hamsters);
	// }, [props.hamster])

	// ADD onClick listener


	return(
		<div>
				<div
					className="hamster-box"
					key={hamster.hamster.id}
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
						src={`/api/assets/${hamster.hamster.imgName}`}
						alt={`Hamster  ${hamster.hamster.id}`}
						className="hamster-img"
					></img>

					<div className="hamster-info">
						<h2>{hamster.hamster.name} </h2>
						<img
							src="/icons/delete.svg"
							alt="Cross icon"
							className="delete"
							// onClick={() => deleteHamster(hamster.hamster.id)}
							// onCLick={onClick}
						></img>
					</div>
				</div>
		</div>
)
}
export default Hamster;