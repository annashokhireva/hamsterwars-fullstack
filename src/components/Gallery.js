import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hamster from "./Hamster";

const Gallery = ({ hamsters }) => {
	const [galleryHamsters, setGalleryHamsters] = useState(null);

	useEffect(() => {
		if (hamsters) {
			setGalleryHamsters([...hamsters]);
		}
	}, [hamsters]);

	function afterDeleteHamster(hamster) {
		fetch("/api/hamsters", { method: "GET" })
			.then((res) => res.json())
			.then(
				(result) => {
					setGalleryHamsters(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}


	return (
		<div className="main-view">
			<div className="gallery-view">
				<Link to="/form" className="hamster-btn">
					<img
						src="/icons/hamster-logo.svg"
						alt="Hamster icon"
						className="hamster-img hamster-icon"
					/>
					<div className="add-new">
						<h3>+ Add new hamster</h3>
					</div>
				</Link>

				{galleryHamsters ? (
					galleryHamsters.map((hamster) => (
						<Hamster
							hamsters={hamsters}
							hamster={hamster}
							showDelete={true}
							key={hamster.id}
							onDelete={() => afterDeleteHamster(hamster)}
						/>
					))
				) : (
					<div className="loader">
						<div className="loading">
							<p>loading hamsters</p>
							<span></span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Gallery;
