import { useState } from "react";

const Hamster = ({ hamster, showDelete, onDelete }) => {
	const [visible, setVisible] = useState(false);

	async function deleteHamster(id) {
		await fetch("/api/hamsters/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			// console.log(JSON.stringify(res))
			// return res.json();
			onDelete(hamster);
		});
	};

	return (
		<div>
			<div
				className="hamster-box"
				key={hamster.id}
				onMouseEnter={() => {
					setVisible(true);
				}}
				onMouseLeave={() => {
					setVisible(false);
				}}
			>
				<div>
					<div className="hamster-img">
						<img
							src={`/api/assets/${hamster.imgName}`}
							alt={`Hamster + ${hamster.id}`}
						></img>
					</div>

					<div className="hamster-info">
						<h3>{hamster.name} </h3>
					</div>
				</div>

				{visible ? (
					<div className="extra-info">
						<p>
							<b>Age: </b>
							{hamster.age}
						</p>
						<p>
							<b>Favourite food: </b> {hamster.favFood}{" "}
						</p>
						<p>
							<b>Loves: </b>
							{hamster.loves}
						</p>
						<p>
							<b>Battles: </b>
							{hamster.games}{" "}
						</p>
						<p>
							<b>Wins: </b>
							{hamster.wins}
						</p>
						<p>
							<b>Defeats: </b>
							{hamster.defeats}{" "}
						</p>
						{showDelete ? (
							<img
								src="/icons/delete.svg"
								alt="Cross icon"
								className="delete"
								onClick={() => deleteHamster(hamster.id)}
								// onClick={() => hamster.action}
								//filter (ändra function) (listor)
							></img>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
};
export default Hamster;
