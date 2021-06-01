// const db = firebase.firestore();

export const updateWinsDefeats = async (winner, loser) => {

	// const increment = firebase.firestore.FieldValue.increment(1);
	// const incr = hamsterRef.update({ wins: increment });	
	// const hamstersRef = db.collection('hamsters').doc(id);


	try {
		const winnerRes = await fetch("/api/hamsters/" + winner.id, {
			method: "PUT",
			headers: { 
				"Content-Type": "application/json",
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				wins: 1,
			}),
		});

		// hamstersRef.update({ wins: incr });

		const loserRes = await fetch("/api/hamsters/" + loser.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				defeats: 1,
			}),
		});

		// hamstersRef.update({ defeats: decrement });

		const winnerData = await winnerRes.json();
		const loserData = await loserRes.json();

		return console.log("Winner: ", winnerData, "Loser: ", loserData);
	} 
	catch (error) {
		console.log("Update failed, ", error);
		return null;
	}
};
