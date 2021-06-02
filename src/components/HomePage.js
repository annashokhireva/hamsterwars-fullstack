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
		<p className="description"> In this game you'll get pictures of 2 randomly selected hamsters. All you have to do is to click on the one that you like the most. Let the cutest hamster win! <br/><br/> <b>Press the button to start the game.</b></p>
		<Link to="/battle" className="button"> Start battle </Link> 
		<div></div>
	</div>
)

export default HomePage;