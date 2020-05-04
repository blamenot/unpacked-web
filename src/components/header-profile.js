import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {authRequestLogout, authRequestSubscribe} from '../actions/auth'
import {PATH_PAGE_REGISTRATION} from '../constants/paths'

import LoginButton from './login-button'
import HeaderProfileName from './header-profile-name'

function HeaderProfile({
	history,
	subscribed,
	authData,
	unregistered,
	wait,
	onAuthSubscribe,
	onAuthLogout})
{
	useEffect(() => {
		if(!subscribed) { //Subscribe to auth change on firebase
			onAuthSubscribe()
		}
		if(unregistered && authData && authData.uid ) {
			history.push(PATH_PAGE_REGISTRATION)
		}
	}, [subscribed, onAuthSubscribe, unregistered, authData, history])

	if(wait) {//if pending authentication of fetching authorized user.
		return (
			<nav>
				<div>wait...</div>
			</nav>
		)
	} else if(authData) { //user is authenticated
		return (
			<nav>
				<HeaderProfileName />
				<div onClick={onAuthLogout}>Logout</div>
			</nav>
		)
	} else { //user not authenticated
		return (
			<nav>
				<LoginButton />
			</nav>
		)
	}
}
const mapStateToProps = ({auth, userCache}) => {
	const userId = auth.authData && auth.authData.uid
	return {
		subscribed: auth.subscribed,
		authData: auth.authData,
		unregistered: userCache.users[userId] === null,
		wait: auth.wait || userCache.userByIdWait
	}
}
const mapDispatchToProps = dispatch => ({
	onAuthSubscribe() {
		return dispatch(authRequestSubscribe())
	},
	onAuthLogout() {
		return dispatch(authRequestLogout())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile)