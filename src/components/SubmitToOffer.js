import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import StyledButton from '../common/StyledButton'
import {
	chatCacheFetchByParticipantRequest,
	chatCacheAddRequest
} from '../actions/chat-cache'
import {clauseCacheAddRequest} from '../actions/clause-cache'
import {PATH_PAGE_CHAT} from '../constants/paths'
function SubmitToOffer ({ownerId, gameId, authenticatedUserId, fetched, waitFetch, dealChatId,
	onChatCacheFetchByParticipantRequest, onChatAndClauseAddRequest, onClauseAddRequest}) {
	useEffect(() => {
		if(!waitFetch && !fetched) {
			onChatCacheFetchByParticipantRequest(authenticatedUserId) /*TODO fetch somwhere else.
			REDUX updates state (waitFetch, fetched) only after all of this components mounts,
			so each of them triggers this Fetch*/
		}
	}, [authenticatedUserId, fetched, waitFetch, onChatCacheFetchByParticipantRequest])

	const [redirectUrl, toggleRedirect] = useState('')

	function onSubmitToOffer() {
		if(!dealChatId) {
			// TODO User can not create chat with self
			onChatAndClauseAddRequest(ownerId, authenticatedUserId, ownerId, gameId, false, toggleRedirect)			
		} else {
			onClauseAddRequest(dealChatId, ownerId, authenticatedUserId, ownerId, gameId, false, toggleRedirect)
		}
	}
	if (redirectUrl) {
		return <Redirect to={redirectUrl} />
	}
	if(waitFetch) {
		return 'loading...'
	}
	if(fetched && authenticatedUserId) {
		return <StyledButton wide onClick={onSubmitToOffer}>apply deal</StyledButton>
	}
	return false
}

const mapStateToProps = ({auth, chatCache}, {ownerId}) => {
	const authenticatedUserId = auth.authData && auth.authData.uid
	
	let dealChatId = null //Chat beetwen the authenticated user and owner of the game
	for(let chatId in chatCache.chats) {
		let chat = chatCache.chats[chatId]
		if(Array.isArray(chat.participantIds)
			&& (chat.participantIds.indexOf(authenticatedUserId) >= 0)
			&& (chat.participantIds.indexOf(ownerId) >= 0)) {
			dealChatId = chatId
			break
		}
	} 
	return {
		authenticatedUserId,
		fetched: chatCache.chatsByParticipantFetched[authenticatedUserId],
		waitFetch: chatCache.chatsByParticipantWait[authenticatedUserId],
		dealChatId
	}
}
const mapDispatchToProps = dispatch => ({
	onChatCacheFetchByParticipantRequest(participantId) {
		dispatch(chatCacheFetchByParticipantRequest(participantId))
	},
	onChatAndClauseAddRequest(ownerId, suggesterId, respondentId, gameId, isDemand, toggleRedirect) {
		function onChatCreatedCallback(chatId) {
			function onClauseCreatedCallback(){
				toggleRedirect(PATH_PAGE_CHAT.replace(':chatId', chatId))
			}
			dispatch(clauseCacheAddRequest(chatId, ownerId, suggesterId, respondentId, gameId, isDemand, onClauseCreatedCallback))
		}
		dispatch(chatCacheAddRequest([suggesterId, respondentId], onChatCreatedCallback))
	},
	onClauseAddRequest(chatId, ownerId, suggesterId, respondentId, gameId, isDemand, toggleRedirect) {
		function onClauseCreatedCallback(){
			toggleRedirect(PATH_PAGE_CHAT.replace(':chatId', chatId))
		}
		dispatch(clauseCacheAddRequest(chatId, ownerId, suggesterId, respondentId, gameId, isDemand, onClauseCreatedCallback))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitToOffer)