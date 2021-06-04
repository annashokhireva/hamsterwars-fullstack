export const fetchHamsterId = async (setHamster, hamsterId) => {
	
	try {
		const response = await fetch('/api/hamsters/' + hamsterId);
		const hamster = await response.json();
		setHamster({ 
			age: hamster.age,
			favFood: hamster.favFood,
			id: hamster.id,
			imgName: hamster.imgName,
			wins: hamster.wins,
			defeats: hamster.defeats,
			games: hamster.games,
			loves: hamster.loves,
			name: hamster.name
		});

	} catch(e) {
		
		console.log('Fetching hamster failed due to following error: ', e)
	
	}
};