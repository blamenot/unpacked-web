import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import AskAuthenticate from '../components/ask-authenticate'
import ProfileForm from '../components/profile-form'
import ProfileControls from '../components/ProfileControls'
import ProfileMap from '../components/profile-map'
import AddressLookup from '../components/address-lookup'
import AddressSuggestions from '../components/address-suggestions'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'

function PageProfile({match, authData, onUserCacheFetchUserByIdRequest}) {
	const userId = match.params.uid
	useEffect(() => {
		if(authData) {
			onUserCacheFetchUserByIdRequest(userId)
		}
	})

	if(!authData) {
		return <AskAuthenticate />
	}
	return (
		<div>
			<ProfileForm userId={userId}/>
			<AddressLookup userId={userId}/>
			<AddressSuggestions />
			<ProfileMap userId={userId}/>
			<ProfileControls userId={userId}/>
		</div>
	)

}

const mapStateToProps = ({auth}) => ({
	authData: auth.authData,
})

const mapDispatchToProps = dispatch => ({
	onUserCacheFetchUserByIdRequest(userId) {
		dispatch(userCacheFetchUserByIdRequest(userId))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(PageProfile)