import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Avatar from '../common/Avatar'
import {PATH_PAGE_CHAT} from '../constants/paths'
import {chatCacheFetchLastMessageRequest} from '../actions/chat-cache'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'
const ChatContainer = styled.div`
	display: flex;
	height: 58px;
	line-height: 58px;
	align-items: center;
	margin 10px 0;
	padding 0 20px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border 1px solid #454651;
`
const ChatInfo = styled.div`
	margin-left: 10px;
`
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
	return (
		<Link to={path}>
			<ChatContainer>
				<Avatar pic={companion?.pic} name={companion?.name || ''}/>
				<ChatInfo>{companion?.name}</ChatInfo>
			</ChatContainer>
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