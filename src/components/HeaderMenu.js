import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import HeaderProfile from './HeaderProfile'
import {
	PATH_PAGE_SEARCH,
	PATH_PAGE_CHATS,
	PATH_PAGE_OFFERS,
} from '../constants/paths'
function HeaderMenu({userId}) {
	return (
		<Fragment>
			<nav>
				<Link to={PATH_PAGE_SEARCH}>
					Find games
				</Link>
				{userId && <Link to={PATH_PAGE_OFFERS.replace(':userId', userId)}>
					My games
				</Link>}
				<Link to={PATH_PAGE_CHATS}>
					Deals
				</Link>
			</nav>
			<nav>
				<HeaderProfile/>
			</nav>
		</Fragment>
	)
}
const mapStateToProps = ({auth}) => ({
	userId: auth.authData?.uid
})
export default connect(mapStateToProps)(HeaderMenu)