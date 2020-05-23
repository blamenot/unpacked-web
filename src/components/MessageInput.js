import React, {useState} from 'react'
import {connect} from 'react-redux'
import {messageCacheSendMessageRequest} from '../actions/message-cache'
import StyledInput from '../common/StyledInput'
import styled from 'styled-components'
const MeassageInputContainer = styled.div`
	position: fixed;
	box-sizing: border-box;
	width: 100%;
	padding: 4px 20px;
	left: 0;
	bottom: 0;
`
function MessageInput ({chatId, recipientId, userId, onSendMessage}) {
	const [message, setMessage] = useState('')
	function onSubmit() {
		onSendMessage(chatId, message, userId, recipientId)
		setMessage('');
	}
	return (
		<MeassageInputContainer>
			<StyledInput	value={message}
							placeholder="Type your message here"
							onChange={setMessage}
							onSubmit={onSubmit}/>
		</MeassageInputContainer>
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