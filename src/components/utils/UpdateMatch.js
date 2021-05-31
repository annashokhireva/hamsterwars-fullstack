export const updateMatch = async (winner, loser) => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			winnerId: winner.id,
			loserId: loser.id,
		}),
	};

	try {
		const response = await fetch("/api/matches", requestOptions);
		const data = await response.json();
		console.log("match", data);
		return data;
    } 
    catch (e) {
		console.log("Upload failed, ", e);
		return null;
	}
};
