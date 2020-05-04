import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import AskAuthenticate from '../components/ask-authenticate'
import ProfileForm from '../components/profile-form'
import ProfileControls from '../components/ProfileControls'
import {userUpdateUnsaved} from '../actions/user-update'
import {PATH_PAGE_PROFILE} from '../constants/paths'

function Registration({history, registeredUser, authData, updatedUser, onProfileUserUnregistered}) {
	useEffect(() => {
		if(authData && registeredUser) {
			history.push(PATH_PAGE_PROFILE.replace(':uid', authData.uid))
		}
		if(authData && !updatedUser) { //user authenticated
			onProfileUserUnregistered(authData)
		}
	}, [authData, updatedUser, onProfileUserUnregistered, history, registeredUser])
	if(!authData) {
		return <AskAuthenticate />
	} else {
		return (
		<div>
			<ProfileForm userId={authData.uid}/>
			<ProfileControls userId={authData.uid} isRegistration={true}/>
		</div>
	)
	}
}

const mapStateToProps = ({userCache, auth, userUpdate}) => ({
	registeredUser: auth.authData && userCache.users[auth.authData.uid],
	authData: auth.authData,
	updatedUser: userUpdate.user,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = dispatch => ({
	onProfileUserUnregistered(authData) {
		const userUnregistered = {
			name: authData.displayName
		}
		dispatch(userUpdateUnsaved(userUnregistered))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(Registration) 