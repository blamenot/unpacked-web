import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {userUpdateCreateRequest} from '../actions/user-update'
import StyledButton from '../common/StyledButton'
const RegistrationFooter = styled.div`
	padding: 20px;
`
function RegistrationControls({userId, updatedUser, userUpdateCreateRequest}) {
	return (
		<RegistrationFooter>
			<StyledButton onClick={() => userUpdateCreateRequest(userId, updatedUser)} wide>
				Register
			</StyledButton>
		</RegistrationFooter>
	)
}

const mapStateToProps = ({userUpdate}) => ({
	updatedUser: userUpdate.user,
})
const mapDispatchToProps = {
	userUpdateCreateRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationControls)