import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {PATH_PAGE_OFFERS} from '../constants/paths'
import LoginButton from './login-button'

function HeaderOffers({authData}) {
	if(authData) {
		return (
			<Link to={PATH_PAGE_OFFERS.replace(':userId',authData.uid)}>
				My games
			</Link>
		)
	} else {
		return <LoginButton customText='My games'/>
	}
}

const mapStateToProps = ({auth}) => ({
	authData: auth.authData
})
export default connect(mapStateToProps)(HeaderOffers) 