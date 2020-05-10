import React from 'react'
import styled from 'styled-components'
const BurgerButton = styled.button`
	cursor: pointer;
	height: 50px;
	width: 60px;
	user-select: none;
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	outline: inherit;
	@media (min-width: 768px) {
		display: none;
	}
`
function Burger(props) {
	return (
		<BurgerButton {...props} type="button">
			<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="1" y1="1" x2="19" y2="1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
				<line x1="1" y1="7" x2="19" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
				<line x1="1" y1="13" x2="19" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		</BurgerButton>
	)
}
export default Burger