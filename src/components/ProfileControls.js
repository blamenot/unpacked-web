import React from 'react'
import {connect} from 'react-redux'
import {
	userUpdateSaveRequest,
	userUpdateCreateRequest
} from '../actions/user-update'
function ProfileControls({userId, isRegistration = false, updatedUser, onProfileUserSaveRequest, onProfileUserCreateRequest}) {
	function onSave() {
		if(isRegistration) {
			return onProfileUserCreateRequest(userId, updatedUser)
		}
		onProfileUserSaveRequest(userId, updatedUser)
	}
	return (
		<div>
			<button onClick={onSave}>
				Save
			</button>
		</div>
	)
}
const mapStateToProps = ({userCache, auth, userUpdate}, {userId}) => ({
	user: userCache.users[userId],
	updatedUser: userUpdate.user,
	isSelf: auth.authData.uid === userId,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = dispatch => ({
	onProfileUserSaveRequest(userId, updatedUser) {
		dispatch(userUpdateSaveRequest(userId, updatedUser))
	},
	onProfileUserCreateRequest(userId, user) {
		dispatch(userUpdateCreateRequest(userId, user))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileControls)