

const Gallery = (items) => (
	<div>
		<h1> Galleriet </h1>
		<div>{items.name}</div>
	</div>
)

export default Gallery;



// import { useEffect, useState } from 'react';

// const Gallery = () => {
// 	const [hamsters, setHamsters] = useState('');

// 	useEffect(() => {
// 		async function get() {
// 			const response = await fetch('/hamsters', { method: 'GET' });
// 			const data = await response.json();
		
// 			setHamsters(data);
// 		}
// 		get();
// 	}, []);


// 	return(
// 		<div>
// 			<h1> Galleriet </h1>

// 			{hamsters
// 				? hamsters.map(hamster => (
// 					<div key={hamster.id}>{hamster}</div>
			
// 				))
// 				: 'Preparing contestants'
// 			}
				
// 		</div>
// 	)
// }

// export default Gallery;