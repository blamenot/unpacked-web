import React, {useRef} from 'react'
import {connect} from 'react-redux'
import {messageCacheSendMessageRequest} from '../actions/message-cache'
function MessageInput ({chatId, recipientId, userId, onSendMessage}) {
	const inputEl = useRef()
	function onClick() {
		onSendMessage(chatId, inputEl.current.value, userId, recipientId)
		inputEl.current.value=''
	}
	return (
		<div>
			<input type="text" ref={inputEl} placeholder="Type your message here"/>
			<button type="button" onClick={onClick}>Send</button>
		</div>
	)
}

const mapStateToProps = ({auth}) => ({
	userId: auth.authData && auth.authData.uid
})
const mapDispatchToProps = dispatch => ({
	onSendMessage(text, chatId, authorId, recipientId) {
		dispatch(messageCacheSendMessageRequest(text, chatId, authorId, recipientId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput)