import React, {useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {PATH_PAGE_OFFERS} from '../constants/paths'
import {userUpdateCreateRequest} from '../actions/user-update'
import StyledButton from '../common/StyledButton'
import {getValidationErrors} from './ProfileForm'

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
const RegistrationPreconditionError = styled.div`
	padding-top: 20px;
`
function RegistrationControls({userId, updatedUser, wait, userUpdateCreateRequest}) {
	const {push} = useHistory()
	const afterRegistration = () => {
		push(PATH_PAGE_OFFERS.replace(':userId', userId))
	}
	const [errors, setErrors] = useState([])
	const onRegister = () => {
		const errors = getValidationErrors(updatedUser)
		if(errors.length){
			setErrors(errors);
			return;
		}
		userUpdateCreateRequest(userId, updatedUser, afterRegistration);
	}
	if(wait) {
		return <RegistrationFooter>Loading...</RegistrationFooter>
	}
	return (
		<RegistrationFooter>
			<RegistrationPrecondition>
				By presssing the register button you agree to our <RegistrationPreconditionLink href="/conditions" target="_blank">terms and conditions</RegistrationPreconditionLink>
				{errors.map(error => <RegistrationPreconditionError>{error}</RegistrationPreconditionError>)}
			</RegistrationPrecondition>
			<StyledButton onClick={onRegister} wide>
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