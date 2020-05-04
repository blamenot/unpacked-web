import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app'
import 'firebase/auth'
import styled from 'styled-components'
import * as firebaseui from 'firebaseui'
import {connect} from 'react-redux'
import Modal from './modal'
import {authHideModal} from '../actions/auth'

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
	// We will display Google and Email as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	credentialHelper: firebaseui.auth.CredentialHelper.NONE,
	callbacks: {
		signInSuccessWithAuthResult() {
			return false
		}
	}
}

const AuthModalContainer = styled.div`
	color: black;
	& input {
		color: black;
	}
`

// Auth component
function AuthModal({onHideModal}) {
	const renderCallback = () => (
		<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
	)
	return (
		<AuthModalContainer>
			<Modal renderCallback={renderCallback} closeCallback={onHideModal}/>
		</AuthModalContainer>
	)
}
const mapDispatchToProps = dispatch => ({
    onHideModal() {
        return dispatch(authHideModal())
    }
})
export default connect(null, mapDispatchToProps)(AuthModal)