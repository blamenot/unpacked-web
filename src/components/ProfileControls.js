import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {userUpdateSaveRequest} from '../actions/user-update'
import StyledButton from '../common/StyledButton'
const ProfileControlsContainer = styled.div`
	padding: 20px;
`
function ProfileControls({userId, updatedUser, userUpdateSaveRequest}) {
	return (
		<ProfileControlsContainer>
			<StyledButton onClick={() => userUpdateSaveRequest(userId, updatedUser)} wide>
				Save
			</StyledButton>
		</ProfileControlsContainer>
	)
}
const mapStateToProps = ({userCache, auth, userUpdate}, {userId}) => ({
	user: userCache.users[userId],
	updatedUser: userUpdate.user,
	isSelf: auth.authData.uid === userId,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = {
	userUpdateSaveRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileControls)