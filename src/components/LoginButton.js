import React from 'react'
import {connect} from 'react-redux'
import {authShowModal} from '../actions/auth'

function LoginButton({authShowModal}) {
	return <button className="link" onClick={authShowModal}>{'Login'}</button>
}
export default connect(null, {authShowModal})(LoginButton) 