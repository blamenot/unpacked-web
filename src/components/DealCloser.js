import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {
	CLAUSE_STATUS_SUGGESTED,
	CLAUSE_STATUS_COMPLETED,
	CLAUSE_STATUS_REJECTED,
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
import {clauseCacheBulkStatusUpdateRequest} from '../actions/clause-cache'
import StyledButton from '../common/StyledButton'
const DealCloserWrapper = styled.div`
	padding: 20px;
	border-bottom: 1px solid #454651; 
	
`
const DealCloserControls= styled.div`
	display: flex;
	margin: 0 -10px
`
function DealCloser({
	acceptedChatClauseIds,
	suggestedChatClauseIds,
	completeAcceptedClauses,
	rejectAllClauses}) {
	if(!acceptedChatClauseIds.length && !suggestedChatClauseIds.length) {
		return 'No suggested or accepted clauses were found. Please find games you are willing to play, or offer something you have.'
	}
	return(
		<DealCloserWrapper>
			{!!suggestedChatClauseIds.length && 'Some clauses not accepted yet... Make sure you and your exchange mate apprved all game suggestions.'}
			{!suggestedChatClauseIds.length && 'All suggestions were accepted, please let us know if exchange took place or failed. to start new deals.'}
			<br /><br />
			<StyledButton	disabled={suggestedChatClauseIds.length}
							onClick={() => completeAcceptedClauses(acceptedChatClauseIds)}
							wide>
				Exchage successful
			</StyledButton>
			<br /><br />
			<StyledButton	onClick={() => rejectAllClauses([...acceptedChatClauseIds, ...suggestedChatClauseIds])}
							reject
							wide>
				Exchage failed
			</StyledButton>
		</DealCloserWrapper>
	)
}
const mapStateToProps = ({clauseCache}, {chatId}) => {
	let acceptedChatClauseIds = []
	let suggestedChatClauseIds = []
	for(let clauseId in clauseCache.clauses) {

		if(chatId && clauseCache.clauses[clauseId] 
			&& clauseCache.clauses[clauseId].chatId === chatId) {
			if(clauseCache.clauses[clauseId].status === CLAUSE_STATUS_ACCEPTED) {
				acceptedChatClauseIds.push(clauseId)
			}
			if(clauseCache.clauses[clauseId].status === CLAUSE_STATUS_SUGGESTED) {
				suggestedChatClauseIds.push(clauseId)
			}
		}
	}
	//TODO check why this mapStateToProps evaluated multiple times
	return {
		acceptedChatClauseIds,
		suggestedChatClauseIds
	}
}
const mapDispatchToProps = dispatch => ({
	completeAcceptedClauses(clauseIds) {
		dispatch(clauseCacheBulkStatusUpdateRequest(clauseIds, CLAUSE_STATUS_COMPLETED))
	},
	rejectAllClauses(clauseIds) {
		dispatch(clauseCacheBulkStatusUpdateRequest(clauseIds, CLAUSE_STATUS_REJECTED))
	}
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DealCloser)