import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {PATH_PAGE_OFFERS} from '../constants/paths'
import {userUpdateCreateRequest} from '../actions/user-update'
import StyledButton from '../common/StyledButton'
const RegistrationFooter = styled.div`
	padding: 20px;
`
const RegistrationPrecondition = styled.div`
	padding: 16px 0;
`
const RegistrationPreconditionLink = styled.a`
	text-transform: none;
	text-decoration: underline;
`
function RegistrationControls({userId, updatedUser, wait, userUpdateCreateRequest}) {
	const {push} = useHistory()
	const afterRegistration = () => {
		push(PATH_PAGE_OFFERS.replace(':userId', userId))
	}
	if(wait) {
		return <RegistrationFooter>Loading...</RegistrationFooter>
	}
	return (
		<RegistrationFooter>
			<RegistrationPrecondition>By presssing the register button you agree to our <RegistrationPreconditionLink href="/conditions" target="_blank">terms and conditions</RegistrationPreconditionLink> 
			</RegistrationPrecondition>
			<StyledButton onClick={() => userUpdateCreateRequest(userId, updatedUser, afterRegistration)} wide>
				Register
			</StyledButton>
		</RegistrationFooter>
	)
}

const mapStateToProps = ({userUpdate, userCache}) => ({
	wait: userCache.userUpdateWait,
	updatedUser: userUpdate.user,
})
const mapDispatchToProps = {
	userUpdateCreateRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationControls)