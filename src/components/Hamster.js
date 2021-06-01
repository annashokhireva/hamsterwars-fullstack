// import { render } from "@testing-library/react";
// import { response } from "express";
import { useState } from "react";

const Hamster = (hamster) => {

	const [visible, setVisible] = useState(false);
	let gallery = true;

	async function deleteHamster(id) {

		await fetch("/api/hamsters/" + id, { method: "DELETE", 
			headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		   }})

			.then((res) => {
				console.log(JSON.stringify(res))
				// return res.json();
			})
			
			// .then(
			// 	(result) => {
			// 		const hamstersArr = result;
			// 		hamstersArr.filter((item) => item.id !== id);
			// 		console.log(hamstersArr);
			// 	},

			// 	(error) => {
			// 		console.log("Delete failed, ", error);
			// 		return null;
			// 	}
			// );
	}
	// useEffect(() => {
	// 	setHamster(props.hamsters);
	// }, [props.hamster])

	// ADD onClick listener


	return(
		<div>
				<div
					className="hamster-box"
					key={hamster.hamster.id}
					onMouseEnter={() => {setVisible(true)}}
					onMouseLeave={() => {setVisible(false)}}
				>
	
					<img
						src={`/api/assets/${hamster.hamster.imgName}`}
						alt={`Hamster  ${hamster.hamster.id}`}
						className="hamster-img"
					></img>

					<div className="hamster-info">
						<h2>{hamster.hamster.name} </h2>
						{/* <img
							src="/icons/delete.svg"
							alt="Cross icon"
							className="delete"
							onClick={() => deleteHamster(hamster.hamster.id)}
							// onCLick={onClick}
						></img> */}
						{visible ? (
							<div className="extra-info">
								<p>Age:{hamster.hamster.age}</p>
								<p>Favourite food: {hamster.hamster.favFood} </p>
								<p>Loves: {hamster.hamster.loves}</p>
								<p>Battles: {hamster.hamster.games} </p>
								<p>Wins: {hamster.hamster.wins}</p>
								<p>Defeats: {hamster.hamster.defeats} </p>
								{gallery ? (
									<img
										src="/icons/delete.svg"
										alt="Cross icon"
										className="delete"
										onClick={() => deleteHamster(hamster.hamster.id)}
										//filter (ändra function) (listor)
									></img>
								):
								null}
							</div>
						):
						null}
					</div>
				</div>
		</div>
)
}
export default Hamster;