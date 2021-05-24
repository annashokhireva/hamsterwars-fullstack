import styled from 'styled-components';

const HomeMain = styled.div`
	overflow: scroll;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`
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
	<HomeMain>
		<HeaderImg src="/icons/h-w-logo.svg"></HeaderImg>
		<h3> Let the cutest hamster win! </h3>
		<button> Start battle </button> 
		<div></div>
	</HomeMain>
)

export default HomePage;