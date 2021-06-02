const express = require('express');
const router = express.Router();

const db = require('../database.js')();

// GET /hamsters
router.get('/', async (req, res) => {	
	let snapshot;

	try {
		snapshot = await db.collection('hamsters').get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

	if (snapshot.empty) {
		res.sendStatus(400);
		return; // necessary? 
	}

	let items = [];

	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
	});

	res.send(items);
});


// GET /hamsters/random

router.get('/random', async (req, res) => {
	var randomRef;

	try {
		randomRef = await db.collection('hamsters').get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
	
	if (randomRef.empty) {
		res.send([]);
		return;
	}

	let items = [];
	let randomData;

	randomRef.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		items.push(data);
		randomData = items[Math.floor(Math.random() * items.length)];
	});

	res.send(randomData);
});


// GET /hamsters/:id

	router.get('/:id', async (req, res) => {
	const id = req.params.id;
	let docRef;
	
	try {
		docRef = await db.collection('hamsters').doc(id).get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}

	if (!docRef.exists) {
		res.status(404).send("Whops! Hamster not found.");
		return;
	}

	try {
		const data = docRef.data();
		res.status(200).send(data);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}
	
});


// POST /hamsters (CHECK IF HAMSTER EXISTS)
router.post('/', async (req, res) => {
	const object = req.body;

	if(!isValidHamsterObj(object) || Object.keys(object).length === 0) {
		res.sendStatus(400);
		return;
	}

	let docRef;

	try {
		docRef = await db.collection('hamsters').add(object);

		const newObj = { id: docRef.id };

		res.send(newObj);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});


function isValidHamsterObj(testItem) {


	if( testItem && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(t => testItem.hasOwnProperty(t)) ) {
		
		if (testItem.age < 0 || !Number.isInteger(testItem.age)) return false;
		
		if (!Number.isInteger(testItem.wins)) return false;
		
		if (!Number.isInteger(testItem.defeats)) return false;
		
		if (!Number.isInteger(testItem.games)) return false;
		
		return true;
	}
	console.log('7');
	return false;
};


// PUT /hamsters/:id 
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const object = req.body;

	console.log('id: ', id, 'obj: ', object.wins, object.defeats);

	if(!object || !id) {
		res.sendStatus(400);
		return;
	}

	const docRef = db.collection('hamsters').doc(id);
	// const increment = firebase.firestore.FieldValue.increment(1);
	// const decrement = firebase.firestore.FieldValue.decrement(-1);
	let hamsterRef;

	try {
		hamsterRef = await docRef.get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}

	if(!hamsterRef.exists) {
		res.status(404).send("Whops! Hamster not found.");
		return;
	}
	
	// else {
	// 	let hamster = hamsterRef.data();
	// 	console.log(hamster);
	// 	const increment = firebase.firestore.FieldValue.increment(1);

	// 	if(object.wins !== (1 || 0) && object.defeats !== (1 || 0)){
	// 		res.status(400).send('Wins value must be 1 or 0.');
	// 	}
	// 	else {
	
	// 		if(object.wins !== object.defeats) {
	// 			let wins = object.wins
	// 			let defeats = object.defeats;
	
	// 			if(hamster.wins) {
	// 				docRef.update({ wins: increment });
	// 			}
	// 			if(hamster.defeats){
	// 				docRef.update({ defeats: increment });
	// 			}
				
	// 			docRef.update({ games: increment });
				
	// 			try {
	// 				await docRef.set(object, { merge: true });
			
	// 				if(Object.keys(object).length === 0) {
	// 					res.sendStatus(400);
	// 					return;
	// 				}
			
	// 				res.sendStatus(200);
	// 			}
			
	// 			catch(error) {
	// 				console.log(error.message);
	// 				res.status(500).send(error.message);
	// 			}
	// 		}
	// 		else {   
	// 			res.status(400).send('Values cannot be equal')
	// 		}
	// 	}
	// }
	
		
	

	try {
		await docRef.set(object, { merge: true });

		if(Object.keys(object).length === 0) {
			res.sendStatus(400);
			return;
		}

		res.sendStatus(200);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});


// DELETE /hamsters/:id 
router.delete('/:id', async (req, res) => {
	const id = req.params.id;

	if(!id) {
		res.sendStatus(400);
		return;
	}

	let docRef;

	try {
		docRef = await db.collection('hamsters').doc(id).get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
		return;
	}

	if(!docRef.exists) {
		res.sendStatus(404);
		return;
	}

	try {
		await db.collection('hamsters').doc(id).delete()
		res.sendStatus(200);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});


module.exports = router;