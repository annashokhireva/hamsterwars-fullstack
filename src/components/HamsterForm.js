import { useState } from 'react';

const HamsterForm = () => {
	const [name, setName] = useState('');
	const [nameTouched, setNameTouched] = useState(false);
	const [age, setAge] = useState('');
	const [ageTouched, setAgeTouched] = useState(false);
	const [loves, setLoves] = useState('');
	const [lovesTouched, setLovesTouched] = useState(false);
	const [favFood, setFavfood] = useState('');
	const [favFoodTouched, setFavFoodTouched] = useState(false);
	const [imgName, setImg] = useState('');
	const [imgTouched, setImgTouched] = useState(false);

	let validName = true;
	let nameErrorMessage = "";
	if (name === "" || !isNaN(Number(name))) {
		validName = false;
		nameErrorMessage = "Please write your hamster's name.";
	}
	let nameClass = "";
	if (nameTouched) {
		nameClass = validName ? "valid" : "error";
	}

	const ageRegExp = new RegExp("^0?[1-6]$");
	let validAge = true;
	let ageErrorMessage = "";
	let checkedAge = ageRegExp.test(age);

	if (!checkedAge) {
		validAge = false;
		ageErrorMessage = "Please write age between 1 and 6.";
	}
	let ageClass = "";
	if (ageTouched) {
		ageClass = validAge ? "valid" : "error";
	}

	let validLoves = true;
	let lovesErrorMessage = "";
	if (loves === "" || !isNaN(Number(loves))) {
		validLoves = false;
		lovesErrorMessage = "Please describe hamster's favourite activity.";
	}
	let lovesClass = "";
	if (lovesTouched) {
		lovesClass = validLoves ? "valid" : "error";
	}

	let validFavFood = true;
	let favFoodErrorMessage = "";
	if (favFood === "" || !isNaN(Number(favFood))) {
		validFavFood = false;
		favFoodErrorMessage = "Please write hamster's favourite food.";
	}
	let favFoodClass = "";
	if (favFoodTouched) {
		favFoodClass = validFavFood ? "valid" : "error";
	}

	const imgRegExp = new RegExp("[\S]*\.(?:png|jpe?g|gif|svg)");
	let validImg = true;
	let imgErrorMessage = "";
	let checkedImg = imgRegExp.test(imgName);

	if(!checkedImg) {
		validImg = false;
		imgErrorMessage = "Please write the name of the file ending with (.png, .jpg, .jpeg, .gig or .svg)";
	}

	let imgClass = "";
	if (imgTouched) {
		imgClass = validImg ? "valid" : "error";
	}

	let invalidForm = !validName || !validAge || !validLoves || !validFavFood || !validImg;

	
	async function addHamster(event) {
		event.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
				age: Number(age),
				loves: loves,
				favFood: favFood,
				imgName: imgName,
				wins: 0,
				defeats: 0,
				games: 0
			}),
		};

		try {
			const response = await fetch('/api/hamsters', requestOptions);
			const data = await response.json();
			alert('Upload successful');
			return data;
		}	
		catch (error) {
			console.log("Upload failed, ", error);
			return null;
		}

	}


	return (
		<div className="main-view">
			<div className="hamster-form">
				<h2> Hamster's profile </h2>
				<div className="input-field">
					<label>Hamster's name</label>
					<input
						value={name}
						type="text"
						placeholder="Enter name"
						onBlur={() => setNameTouched(true)}
						onChange={(event) => setName(event.target.value)}
						className={nameClass}
					></input>
					{nameTouched ? (
						<div className="message"> {nameErrorMessage} </div>
					) : null}
				</div>

				<div className="input-field">
					<label>Hamster's age</label>
					<input
						value={age}
						type="text"
						placeholder="Enter hamster's age in years"
						onBlur={() => setAgeTouched(true)}
						onChange={(event) => setAge(event.target.value)}
						className={ageClass}
					></input>
					{ageTouched ? <div className="message"> {ageErrorMessage} </div> : null}
				</div>

				<div className="input-field">
					<label>What does your hamster love to do?</label>
					<input
						value={loves}
						type="text"
						placeholder="Enter hamster's favourite activity"
						onBlur={() => setLovesTouched(true)}
						onChange={(event) => setLoves(event.target.value)}
						className={lovesClass}
					></input>
					{lovesTouched ? (
						<div className="message"> {lovesErrorMessage} </div>
					) : null}
				</div>

				<div className="input-field">
					<label>What is your hamster's favourite food?</label>
					<input
						value={favFood}
						type="text"
						placeholder="Enter hamster's favourite food"
						onBlur={() => setFavFoodTouched(true)}
						onChange={(event) => setFavfood(event.target.value)}
						className={favFoodClass}
					></input>
					{favFoodTouched ? (
						<div className="message"> {favFoodErrorMessage} </div>
					) : null}
				</div>

				<div className="input-field">
					<label>Upload your hamster's cutest image</label>
					<input
						value={imgName}
						type="text"
						onBlur={() => setImgTouched(true)}
						placeholder = "Enter file name ending with (.png, .jpg, .jpeg, .gig or .svg)"
						onChange= {(event) => setImg(event.target.value)}
						className={imgClass}
					></input>
					{imgTouched ? <div className="message"> {imgErrorMessage} </div> : null}
				</div>

				<button onClick={addHamster} disabled={invalidForm} className="submit-hamster">
					Add hamster
				</button>
			</div>
		</div>
	);
};

export default HamsterForm;
