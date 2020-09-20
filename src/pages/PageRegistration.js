import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {PS4} from '../constants/platform-types'
import AskAuthenticate from '../components/ask-authenticate'
import ProfileForm from '../components/ProfileForm'
import RegistrationControls from '../components/RegistrationControls'
import {userUpdateUnsaved} from '../actions/user-update'

function PageRegistration({authData, updatedUser, onProfileUserUnregistered}) {
	useEffect(() => {
		if(authData && !updatedUser) {
			//Create user object in userCache with name from authdata.displayName
			onProfileUserUnregistered(authData)
		}
	}, [authData, updatedUser, onProfileUserUnregistered])
	if(!authData) {
		return <AskAuthenticate />
	} else {
		return (
		<Fragment>
			<ProfileForm userId={authData.uid}/>
			<RegistrationControls userId={authData.uid}/>
		</Fragment>
	)
	}
}

const mapStateToProps = ({userCache, auth, userUpdate}) => ({
	authData: auth.authData,
	updatedUser: userUpdate.user,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = dispatch => ({
	onProfileUserUnregistered(authData) {
		const userUnregistered = {
			name: authData.displayName,
			platforms: [PS4],
		}
		dispatch(userUpdateUnsaved(userUnregistered))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(PageRegistration) 