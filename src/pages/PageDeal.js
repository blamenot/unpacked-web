/**
 * Shows all active clauses for chat Id with controls
 * displays total balance
 */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {clauseCacheFetchActiveByChatRequest} from '../actions/clause-cache'
import AskAuthenticate from '../components/ask-authenticate'
import Deal from '../components/deal'

function PageDeal ({match, userId, clausesByChatWait, onClauseFetchRequest}) {
	const chatId = match.params.chatId
	useEffect(() => {
		if(userId && match.params.chatId) {
			onClauseFetchRequest(match.params.chatId)
		}
	}, [userId, match.params.chatId, onClauseFetchRequest])
	
	if(!userId) {
		return <AskAuthenticate />
	}
	if(clausesByChatWait[chatId] !== false) { //TODO check if explicit wait = false is correct, at first it is undefined
		return <div>Wait...</div>
	}
	return <Deal chatId={chatId} />
}

const mapStateToProps = ({auth, clauseCache}) => ({
	userId: auth.authData && auth.authData.uid,
	clausesByChatWait: clauseCache.clausesByChatWait
})
const mapDispatchToProps = dispatch => ({
	onClauseFetchRequest(chatId) {
		dispatch(clauseCacheFetchActiveByChatRequest(chatId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageDeal)