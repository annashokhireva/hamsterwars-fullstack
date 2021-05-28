export function validName(name) {
	
	let validName = typeof name === "string" && isNaN(Number(name));

	if (validName) {
		return ["valid", ""];
	} 
	else {
		return ["invalid", "Please enter a name using letters only"];
	}
}

export function validAge(age) {
	let validAge = new RegExp('^0?[1-6]$');
	let checked =  validAge.test(age);

	if(checked) {
		return ["valid", ""];
	} 
	else {
		return ["invalid", "Please enter valid age"];
	}
	
}

const phoneRegEx = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;