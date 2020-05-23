import React, {Fragment, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {PATH_PAGE_CHATS} from '../constants/paths.js'
import StyledLink from '../common/StyledLink'
import StyledSpoiler from '../common/StyledSpoiler'
import IconList from '../common/Icons/IconList'
import {chatCacheFetcByIdRequest} from '../actions/chat-cache'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache'
import AskAuthenticate from '../components/ask-authenticate'
import Deal from '../components/Deal'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import styled from 'styled-components'
const IconContainer = styled.span`
	display: inline-block;
	vertical-align: midle;
	float: right;
`
const ChatContainer = styled.div`
	margin-bottom: 82px;
`
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
	const [dealToggled, setDealToggled] = useState(false)
	if(!userId) {
		return <AskAuthenticate />
	}
	return (
		<Fragment>
			<ChatContainer>
				<StyledLink to={PATH_PAGE_CHATS} left bold >
					Chat with {companion?.name}
					<IconContainer><IconList /></IconContainer>
				</StyledLink>
				<StyledSpoiler	title="Exchange details"
								toggled={dealToggled}
								onClick={() => setDealToggled(!dealToggled)}>
					<Deal chatId={chatId} />
				</StyledSpoiler>
				<MessageList chatId={chatId}/>
			</ChatContainer>
			<MessageInput chatId={chatId} recipientId={companionId}/>
		</Fragment>
	)
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