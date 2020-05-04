import React from 'react'
import {connect} from 'react-redux'

function Message ({message}) {
	return (
		<div> {message.id} {message.text} {getStatusSign(message)}</div>
	)
}
function getStatusSign(message) {
	if(message.isUpdating) {
		return String.fromCharCode(8987)
	}
	return String.fromCharCode(10003)
}
const mapStateToProps = ({statePart}) => ({
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)