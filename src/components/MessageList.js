import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import MessageListBody from './MessagesListBody'
import {messageCacheFetchRequest} from '../actions/message-cache'
import {clauseCacheFetchActiveByChatRequest} from '../actions/clause-cache'
const MessageListContainer = styled.div`
	height: calc(100vh - 230px);
	overflow: auto;
`
function MessageList ({
		chatId,
		messagesFetched,
		messagesFetching,
		messages,
		clausesFetched,
		clausesFetching,
		clauses,
		onMessagesFetch,
		onClauseFetch
	}) {
	// fetch messages
	useEffect(() => {
		if(!messagesFetching && !messagesFetched) {
			onMessagesFetch(chatId)
		}
	}, [chatId, messagesFetched, messagesFetching, onMessagesFetch])

	// fetch clauses
	useEffect(()=> {
		if(!clausesFetching && !clausesFetched) {
			onClauseFetch(chatId)
		}
	}, [chatId, clausesFetched, clausesFetching, onClauseFetch])

	if(!clausesFetched && !clausesFetched) {
		return <div>wait...</div>
	}
	return (
		<MessageListContainer>
			<MessageListBody messages={messages} clauses={clauses}/>
		</MessageListContainer>
	)
}
const mapStateToProps = ({messageCache, clauseCache}, {chatId}) => ({
	messagesFetched: messageCache.messagesFetched,
	messagesFetching: messageCache.messagesFetching,
	messages: messageCache.messages,
	clausesFetched: clauseCache.clausesByChatFetched[chatId],
	clausesFetching: clauseCache.clausesByChatWait[chatId],
	clauses: clauseCache.clauses
})
const mapDispatchToProps = dispatch => ({
	onMessagesFetch(chatId) {
		dispatch(messageCacheFetchRequest(chatId))
	},
	onClauseFetch(chatId) {
		dispatch(clauseCacheFetchActiveByChatRequest(chatId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)