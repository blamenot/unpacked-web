import React from 'react';
import {connect} from 'react-redux'
import {userUpdateUnsaved} from '../actions/user-update'
function ProfileForm({userId, user, updatedUser, isSelf, wait, onNameUpdate}) {
	function onNameChange(e) {
		onNameUpdate(user, e.target.value)
	}
	let name = ''
	if(user && user.name) {
		name = user.name
	}
	if(wait) {
		return <div>wait...</div>
	} else if(isSelf) {
		if(typeof(updatedUser && updatedUser.name) === 'string') {
			name = updatedUser.name
		}
		return (
			<div>
				<input
				 type="text" placeholder="name" value={name} onChange={onNameChange}/>
			</div>
		)
	} else {
		return <label> name: {name}</label>
	}
}

const mapStateToProps = ({userCache, auth, userUpdate}, {userId}) => ({
	user: userCache.users[userId],
	updatedUser: userUpdate.user,
	isSelf: auth.authData.uid === userId,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = dispatch => ({
	onNameUpdate(user, name) {
		dispatch(userUpdateUnsaved({
			...user,
			name
		}))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)