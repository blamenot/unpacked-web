import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import HeaderMenu from './HeaderMenu'
import HeaderPage from './HeaderPage'
import Burger from './Burger'
import Logo from '../common/Logo'
const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	position: relative;
`
const HeaderLogo = styled.div`
	line-height: 50px;
	width: 60px;
	text-align: center;
	padding-top: 7px;
`
const MenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	@media(max-width: 767px) {
		position: absolute;
		z-index: 2;
		flex-direction: column;
		top: 50px;
		right: 0;
		padding: 0 10px;
		background-color: #13131D;
		opacity: .9;
		${
			({isToggled}) => !isToggled &&`
				display: none;
			`
		}
		> nav {
			display: flex;
			align-items: flex-end;
			flex-direction: column;
		}
	}
`
const HeaderPageContainer = styled.h1`
	margin: 0;
	padding: 0;
	line-height: 50px;
	font-size: inherit;
	font-weight: normal;
	text-transform: uppercase;
	@media(min-width: 768px) {
		display: none;
	}
`
function Header() {
	const [isToggled, toggle] = useState(false)
	useEffect(() => {
		function closeMenu() {
			toggle(false)
		}
		window.addEventListener('click', closeMenu)
		return () => window.removeEventListener('click', closeMenu)
	}, [toggle])
	function onBurgerClick(e) {
		e.stopPropagation()
		toggle(!isToggled)
	}
	return (
		<HeaderContainer>
			<HeaderLogo>
				<Logo />
			</HeaderLogo>
			<MenuContainer isToggled={isToggled}>
				<HeaderMenu/>
			</MenuContainer>
			<HeaderPageContainer>
				<HeaderPage/>
			</HeaderPageContainer>
			<Burger onClick = {onBurgerClick}/>
		</HeaderContainer>
	)
}

export default Header