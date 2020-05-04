import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import HeaderOffers from './header-offers'
import HeaderProfile from './header-profile'
import {
	PATH_PAGE_SEARCH,
	PATH_PAGE_CHATS
} from '../constants/paths'
import Burger from './Burger'
const MenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-grow: 1;
	@media(max-width: 767px) {
		display: none;
	}
`
function Header({history}) {
	return (
		<header>
			<MenuContainer>
				<nav>
					<div>UNPACKED</div>
					<Link to={PATH_PAGE_SEARCH}>Find games</Link>
					<HeaderOffers/>
					<Link to={PATH_PAGE_CHATS}>Deals</Link>
				</nav>
				<HeaderProfile history={history} />
			</MenuContainer>
			<Burger/>
		</header>
	)
}

export default Header