import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'
import {userUpdateSaved} from '../actions/user-update'
import AskAuthenticate from '../components/ask-authenticate'
import ProfileForm from '../components/ProfileForm'
import ProfileControls from '../components/ProfileControls'
import Footer from '../components/Footer'
function PageProfile({userId, authData, savedUser, wait, userCacheFetchUserByIdRequest, userUpdateSaved}) {
	useEffect(() => {
		if(authData && !savedUser) {
			userCacheFetchUserByIdRequest(userId)
		}
	}, [authData, userId, savedUser, userCacheFetchUserByIdRequest])
	useEffect(() => {
		if(savedUser && !wait) {
			userUpdateSaved(savedUser)
		}
	}, [savedUser, wait, userUpdateSaved])

	if(!authData) {
		return <AskAuthenticate />
	}
	const isSelf = userId === authData?.uid
	return (
		<Fragment>
			<div>
				<ProfileForm userId={userId} readonly={!isSelf}/>
				{/* <AddressLookup userId={userId}/>
				<AddressSuggestions />
				<ProfileMap userId={userId}/> */}
				<ProfileControls userId={userId}/>
			</div>
			<Footer />
		</Fragment>
	)

}
const mapStateToProps = ({auth, userCache}, {match}) => {
	const userId = match.params.uid
	return {
		userId,
		authData: auth.authData,
		savedUser: userCache.users[userId],
		wait: userCache.userByIdWait || userCache.userUpdateWait
	}
}
const mapDispatchToProps = {
	userCacheFetchUserByIdRequest,
	userUpdateSaved
}
export default connect(mapStateToProps, mapDispatchToProps)(PageProfile)