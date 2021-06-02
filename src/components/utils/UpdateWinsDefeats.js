// const db = firebase.firestore();

export const updateWinsDefeats = async (winner, loser) => {

	// const increment = firebase.firestore.FieldValue.increment(1);
	// const incr = hamsterRef.update({ wins: increment });	
	// const hamstersRef = db.collection('hamsters').doc(id);


	try {
		await fetch("/api/hamsters/" + winner.id, {
			method: "PUT",
			headers: { 
				"Content-Type": "application/json",
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				wins: winner.wins + 1,
				games: winner.games + 1
			}),
		});

		// hamstersRef.update({ wins: incr });

		await fetch("/api/hamsters/" + loser.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				defeats:  loser.defeats + 1,
				games: loser.games + 1
			}),
		});

		// hamstersRef.update({ defeats: decrement });

		// const winnerData = await winnerRes.json();
		// const loserData = await loserRes.json();

		// return console.log("Winner: ", winnerData, "Loser: ", loserData);
	} 
	catch (error) {
		console.log("Update failed, ", error);
		return null;
	}
};
