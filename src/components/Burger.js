import React from 'react'
import styled from 'styled-components'
const BurgerButton = styled.button`
	cursor: pointer;
	height: 64px;
	width: 64px;
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
function Burger({onClick, isOpened}) {
	return (
		<BurgerButton onClick={onClick} type="button" isOpened={isOpened}>
			<svg viewBox="0 0 100 80" width="40" height="40" fill="#fff">
				<rect width="100" height="20"></rect>
				<rect y="30" width="100" height="20"></rect>
				<rect y="60" width="100" height="20"></rect>
			</svg>
		</BurgerButton>
	)
}
export default Burger