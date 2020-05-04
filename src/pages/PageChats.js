import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Chat from '../components/chat'
import {chatCacheFetchByParticipantRequest} from '../actions/chat-cache'
function PageChats ({history, match, userId, wait, error, fetched, chats, fetchChats}) {
	useEffect(() => {
		if(userId && !wait && !error && !fetched) {
			fetchChats(userId)
		}
	})
	if(error) {
		console.log(error)
		return <div>{error.toString()}</div> //Todo universal error handler
	}
	if(wait) {
		return <div>Wait...</div> //TODO universal wait handler
	}
	const userChats = filterChatsByParticipant(chats, userId)
	return renderChats(userChats)
}
function renderChats(userChats) {
	let renderedChats = []
	for (let chatId in userChats) {
		renderedChats.push(<Chat key={chatId} chatId={chatId} chat={userChats[chatId]}/>)
	}
	return renderedChats
}
function filterChatsByParticipant(chats, userId) {
	let filteredChats = {}
	for(let chatId in chats) {
		if( chats[chatId] 
			&& Array.isArray(chats[chatId].participantIds) 
			&& (chats[chatId].participantIds.indexOf(userId) >= 0)) {
			filteredChats[chatId] = chats[chatId]
		}
	}
	return filteredChats
}
const mapStateToProps = ({auth, chatCache}) => {
	const userId = auth.authData && auth.authData.uid
	return {
		userId,
		wait:  chatCache.chatsByParticipantWait[userId],
		error: chatCache.chatsByParticipantError[userId],
		fetched: chatCache.chatsByParticipantFetched[userId],
		chats: chatCache.chats
	}
}
const mapDispatchToProps = dispatch => ({
	fetchChats(userId) {
		dispatch(chatCacheFetchByParticipantRequest(userId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageChats)