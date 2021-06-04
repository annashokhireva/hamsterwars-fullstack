import { useState } from "react";


const Hamster = ({ hamsters, hamster, showDelete, onDelete }) => {
	const [visible, setVisible] = useState(false);
	const [defeated, setDefeated] = useState(null);
	const [defeatedShown, setDefeatedShown] = useState(false);

	async function deleteHamster(id) {
		await fetch("/api/hamsters/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			console.log(JSON.stringify(res));
			onDelete(hamster);
		});
	};

	async function getDefeated(id) {
		const response = await fetch('/api/matchWinners/' + id, {method: 'GET'})
		if(response.ok){
			const data = await response.json();
			setDefeated(data); 
		}
		else {
			setDefeated([]);
		}	
		
		if(!defeatedShown){
			setDefeatedShown(true);
		}
		else {
			setDefeatedShown(false);
		}

	}

	function showDefeated() {
		if (hamsters && defeated) {
			return (
				<ul className="losers">
					{defeated
						? defeated.map((defeat) => {
								if (!hamsters) return (
									<p>"No hamsters were found"</p>
								);

								let matching = hamsters.find(({ id }) => id === defeat.loserId);

								if (!matching) return (
									<p>"Hamster hasn't defeated anyone yet."</p>
								);

								return (
									<li key={matching.id}>
										{matching.name}
									</li>
								);
						  })
						: "Searching for defeated hamsters."}
				</ul>
			);
		}

		else {
			return (<p>Hamstar hasn't defited anyone yet.</p>)
		}
	}

	const defeatedHamsters = showDefeated();

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
				<div className="hamster-card">
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
					<section className="hidden-info">
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
							{defeated ? defeated.map(def => (
								<p>{def.name}</p>
							)):null }
							<div className="pointer show-more" onClick={() => getDefeated(hamster.id)}>
								<p className="text">Show defeated</p>
								<img src="/icons/more.svg" alt="error 500" width="30"/>
							</div>	

							{showDelete ? (
								<img
									src="/icons/delete.svg"
									alt="Cross icon"
									className="delete"
									onClick={() => deleteHamster(hamster.id)}
								></img>
							) : null}

						</div>
						{defeatedShown ? (
							<div className="defeated-hamsters">{defeatedHamsters}</div>		
						) : null} 
						
					</section>
				) : null}
			</div>
		</div>
	);
};
export default Hamster;
