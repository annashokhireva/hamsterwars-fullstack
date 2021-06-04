export const fetchSmth = async (setHamster, hamsterId) => {
	try {
		let hamster = {};

		do {
			const response = await fetch("/api/matchWinners/" + 1, { method: "GET" });
			hamster = await response.json();
			await setHamster({
				age: hamster.age,
				favFood: hamster.favFood,
				id: hamster.id,
				imgName: hamster.imgName,
				wins: hamster.wins,
				defeats: hamster.defeats,
				games: hamster.games,
				loves: hamster.loves,
				name: hamster.name,
			});
		} 
		while (hamsterId === hamster.id);
	} 
	catch (error) {
		console.log(
			"Fetching random hamster failed due to following error: ",
			error
		);
	}
};
