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
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="0" y1="3" x2="32" y2="3" stroke="white" strokeWidth="6"/>
				<line x1="0" y1="16" x2="32" y2="16" stroke="white" strokeWidth="6"/>
				<line x1="0" y1="29" x2="32" y2="29" stroke="white" strokeWidth="6"/>
			</svg>
		</BurgerButton>
	)
}
export default Burger