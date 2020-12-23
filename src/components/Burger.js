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
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="0" y1="2" x2="24" y2="2" stroke="white" strokeWidth="3"/>
				<line x1="0" y1="12" x2="24" y2="12" stroke="white" strokeWidth="3"/>
				<line x1="0" y1="22" x2="24" y2="22" stroke="white" strokeWidth="3"/>
			</svg>
		</BurgerButton>
	)
}
export default Burger