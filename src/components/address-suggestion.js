import React from 'react'
import {connect} from 'react-redux'
import {userUpdateUnsaved} from '../actions/user-update'

function AddressSuggestion ({suggestion, user, onLocationUpdate}) {
	function onLocationClick() {
		onLocationUpdate(
			user,
			suggestion.display_name,
			+suggestion.lon,
			+suggestion.lat
		)
	}
	return (
		<li onClick={onLocationClick}>{suggestion.display_name}</li>
	)
}

const mapStateToProps = ({userUpdate}) => ({
	user: userUpdate.user
})

const mapDispatchToProps = dispatch => ({
	onLocationUpdate(user, place, longitude, latitude){
		dispatch(userUpdateUnsaved({
			...user,
			place,
			longitude,
			latitude
		}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressSuggestion)