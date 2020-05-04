import React from 'react'
import {connect} from 'react-redux'
import {authShowModal} from '../actions/auth'

function LoginButton({customText, onAuthShowModal}) {
	return (
		<button className="link" onClick={onAuthShowModal}>{customText || 'Login'}</button>
	)
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
	onAuthShowModal() {
		return dispatch(authShowModal())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginButton) 