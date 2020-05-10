import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {authRequestLogout, authRequestSubscribe} from '../actions/auth'
import {PATH_PAGE_REGISTRATION} from '../constants/paths'

import LoginButton from './login-button'
import HeaderProfileName from './HeaderProfileName'

function HeaderProfile({
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
	}, [subscribed, onAuthSubscribe])

	if(wait) {//if pending authentication of fetching authorized user.
		return 'Loading...'
	}
	if(unregistered && authData?.uid ) {
		return <Redirect to={PATH_PAGE_REGISTRATION} />
	}
	if(authData) { //user is authenticated
		return (
			<Fragment>
				<HeaderProfileName />
				<div onClick={onAuthLogout}>Logout</div>
			</Fragment>
		)
	} 
	//user not authenticated
	return <LoginButton />
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