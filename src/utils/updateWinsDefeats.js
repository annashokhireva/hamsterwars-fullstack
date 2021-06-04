export const updateWinsDefeats = async (winner, loser) => {

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


		await fetch("/api/hamsters/" + loser.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				defeats:  loser.defeats + 1,
				games: loser.games + 1
			}),
		});

	} 
	catch (error) {
		console.log("Update failed, ", error);
		return null;
	}
};
