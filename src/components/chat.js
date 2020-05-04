import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {PATH_PAGE_CHAT} from '../constants/paths'
import {chatCacheFetchLastMessageRequest} from '../actions/chat-cache'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'
function Chat ({chatId, chat, userId, lastMessage, companionId, companion, fetchLastMessage, fetchCompanion}) {
	useEffect(() => {
		if(lastMessage === undefined) {
			fetchLastMessage(chatId)
		}
		if(!companion && companionId) {
			fetchCompanion(companionId)
		}
	})
	const path = PATH_PAGE_CHAT.replace(':chatId', chatId)
	const briefText = lastMessage && lastMessage.text
	return (
		<Link to={path}>
			<div>{companion && companion.name}</div>
			<div>{briefText}</div>
		</Link>
	)
}

const mapStateToProps = ({auth, chatCache, userCache}, {chatId, chat}) => {
	const userId = auth.authData && auth.authData.uid
	const lastMessage = chatCache.chatsLastMessages[chatId]
	const companionId = (chat.participantIds || [])
		.filter(participant => participant !== userId)[0]
	const companion = userCache.users[companionId]
	return {
		userId,
		lastMessage,
		companionId,
		companion
	}
}
const mapDispatchToProps = dispatch => ({
	fetchLastMessage(chatId) {
		dispatch(chatCacheFetchLastMessageRequest(chatId))
	},
	fetchCompanion(companionId) {
		dispatch(userCacheFetchUserByIdRequest(companionId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)