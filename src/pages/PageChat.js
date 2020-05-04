import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {PATH_PAGE_DEAL} from '../constants/paths.js'
import {chatCacheFetcByIdRequest} from '../actions/chat-cache'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'
import AskAuthenticate from '../components/ask-authenticate'
import MessageList from '../components/message-list'
import MessageInput from '../components/message-input'
function PageChat ({
	chatId,
	chat,
	userId,
	user,
	companionId,
	companion,
	onChatFetch,
	onUserFetch}) {
	useEffect(() => {
		if(userId && !user) {
			onUserFetch(userId)
		}
		if(companionId && !companion) {
			onUserFetch(companionId)
		}
		if(!chat && chatId) {
			onChatFetch(chatId)
		}
	}, [userId, user, chatId, chat, companionId, companion, onChatFetch, onUserFetch])
	if(!userId) {
		return <AskAuthenticate />
	}
	const path = PATH_PAGE_DEAL.replace(':chatId', chatId)
	return (<div>
		<p>chat{JSON.stringify(chat)}</p>
		<p>user{JSON.stringify(user)}</p>
		<p>companion{JSON.stringify(companion)}</p>
		<Link to={path}>Deal</Link>
		<MessageList chatId={chatId}/>
		<MessageInput chatId={chatId} recipientId={companionId}/>
	</div>)
}

const mapStateToProps = ({auth, chatCache, userCache},{match}) => {
	const chatId = match.params.chatId
	const userId = auth.authData && auth.authData.uid
	const chat = chatCache.chats[chatId]
	const companionId = (Array.isArray(chat && chat.participantIds) 
		? chat.participantIds.find(participantId => participantId !== userId)
		: null
	)
	return {
		chatId,
		chat,
		userId,
		user: userCache.users[userId],
		companionId,
		companion: userCache.users[companionId]
	}
}
const mapDispatchToProps = dispatch => ({
	onChatFetch(chatId) {
		dispatch(chatCacheFetcByIdRequest(chatId))
	},
	onUserFetch(userId) {
		dispatch(userCacheFetchUserByIdRequest(userId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageChat)