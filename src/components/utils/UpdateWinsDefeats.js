export const updateWinsDefeats = async (winner, loser) => {
	try {
		const winnerRes = await fetch("/api/hamsters/" + winner.id + "/result", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				wins: 1,
			}),
		});

		const loserRes = await fetch("/api/hamsters/" + loser.id + "/result", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				defeats: 1,
			}),
		});

		const winnerData = await winnerRes.json();
		const loserData = await loserRes.json();

		return console.log("Winner: ", winnerData, "Loser: ", loserData);
	} 
	catch (error) {
		console.log("Update failed, ", error);
		return null;
	}
};
