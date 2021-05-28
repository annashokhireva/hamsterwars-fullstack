import styled from "styled-components";
import {Link} from "react-router-dom";

// const HomeMain = styled.div`
// 	overflow: scroll;
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	align-items: center;
// `
const HeaderImg = styled.img`
	width: 20em;
	margin-top: 4em;

	@media only screen and (min-width: 600px) {
		width: 30em;
	}
	
	@media only screen and (min-width: 768px) {
		width: 40em;
	}
`

const HomePage = () => (
	<div className="main-view">
		<HeaderImg src="/icons/h-w-logo.svg"></HeaderImg>
		<h3> Let the cutest hamster win! </h3>
		<Link to="/battle" className="button"> Start battle </Link> 
		<div></div>
	</div>
)

export default HomePage;