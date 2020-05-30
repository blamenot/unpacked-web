import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect, useRouteMatch} from 'react-router-dom';
import {authRequestLogout, authRequestSubscribe} from '../actions/auth'
import {PATH_PAGE_REGISTRATION, PATH_PAGE_PROFILE} from '../constants/paths'
import LoginButton from './LoginButton'
import HeaderProfileName from './HeaderProfileName'

function HeaderProfile({
	subscribed,
	authData,
	unregistered,
	wait,
	authRequestSubscribe,
	authRequestLogout})
{
	useEffect(() => {
		if(!subscribed) { //Subscribe to auth change on firebase
			authRequestSubscribe()
		}
	}, [subscribed, authRequestSubscribe])
	const isRegisterirng = useRouteMatch(PATH_PAGE_REGISTRATION);
	if(wait) {//if pending authentication of fetching authorized user.
		return 'Loading...'
	}
	if(unregistered && authData?.uid && !isRegisterirng) {
		return <Redirect to={PATH_PAGE_REGISTRATION} />
	}
	if(!unregistered && authData?.uid && isRegisterirng) {
		return <Redirect to={PATH_PAGE_PROFILE.replace(':uid', authData.uid)} />
	}
	if(authData) { //user is authenticated
		return (
			<Fragment>
				<HeaderProfileName />
				<button onClick={authRequestLogout}>Logout</button>
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
const mapDispatchToProps = {
	authRequestSubscribe,
	authRequestLogout,
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile)