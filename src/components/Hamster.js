import { render } from "@testing-library/react";
import { useState, useEffect } from "react";

const Hamster = (props) => {

	const [hamster, setHamster] = useState({...props.hamster});

	function deleteHamster(){
		// 	const index = hamsters.indexOf(hamster);
		// 				hamsters.splice(index, 1);
		
	}

	// useEffect(() => {
	// 	setHamster(props.hamsters);
	// }, [props.hamster])

	render(
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
					onClick={deleteHamster}
				></img>
			</div>
		</div>
	);
}
export default Hamster;