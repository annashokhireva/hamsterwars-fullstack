import { useState } from "react";
// import { validName, validAge } from "./utils/controller";

const HamsterForm = () => {
	const [name, setName] = useState("");
	// const [nameErr, setNameErr] = useState(false);
	const [nameTouched, setNameTouched] = useState(false);
	const [age, setAge] = useState("");
	const [ageTouched, setAgeTouched] = useState(false);
	const [ageErr, setAgeErr] = useState(false);
	const [loves, setLoves] = useState("");
	const [favFood, setFavfood] = useState("");
	const [image, setImage] = useState("");

	let validName = true;
	let nameErrorMessage= '';
	if( name === '' || !isNaN(Number(name))) {
		validName = false;
		nameErrorMessage = "Please write your hamster's name.";
	}
	let nameClass = '';
	if( nameTouched ) {
		nameClass = (validName ? 'valid' : 'error');
	}

	const ageRegExp = new RegExp('^0?[1-6]$');
	let validAge = true;
	let ageErrorMessage= '';
	let checkedAge =  ageRegExp.test(age);

	if (!checkedAge) {
		validAge = false;
		ageErrorMessage = "Please enter age between 1 and 6.";
	}
	let ageClass = ''
	if( ageTouched ) {
		ageClass = (validAge ? 'valid' : 'error');
	}

	// function validAge(age) {
	// 	let validAge = new RegExp('^0?[1-6]$');
	// 	let checked =  validAge.test(age);
	
	// 	if(checked) {
	// 		return ["valid", ""];
	// 	} 
	// 	else {
	// 		return ["invalid", "Please enter valid age"];
	// 	}
		
	// };

	async function addHamster(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				authorization: process.env.REACT_APP_FIREBASE_KEY,
			},
			body: JSON.stringify({
				name: name,
				age: age,
				loves: loves,
				favFood: favFood,
				imgName: image,
			}),
		};

		try {
			console.log(
				requestOptions.body,
				requestOptions.headers,
				process.env.REACT_APP_FIREBASE_KEY
			);
			const response = await fetch("/api/hamsters", requestOptions);
			console.log(response);
			const data = await response.json();
			console.log(data);
			return data;
		} catch (e) {
			console.log("Upload failed, ", e);
			return null;
		}
	}

	return (
		<div className="main-view">
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			></form>
			<div>
				<label>Hamster's name</label>
				<input
					value={name}
					type="text"
					placeholder="Enter name"
					onBlur={() => setNameTouched(true)}
					onChange={(event) => setName(event.target.value)}
					className={nameClass}
				></input>
				{nameTouched ? <div className="message"> {nameErrorMessage} </div> : null}
			</div>
			{/* <span>
				<label>Hamster's age</label>
				<input
					value={age}
					placeholder="Enter age"
					onChange={(event) => setAge(event.target.value)}
					onBlur={() => setAgeTouched(true)}
				></input>
				<p>{ageErr && <p>Hamster's age is invalid</p>}</p>
			</span> */}
			<div>
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
			<button onClick={addHamster}>Add hamster</button>
		</div>
	);
};

export default HamsterForm;
