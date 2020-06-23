import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
const DealBalanceContainer = styled.div`
	color: #FDE74C;
	padding: 20px;
`
function DealBalance ({chatClausesArray, games, userId}) {
	const evaluatedBalance = getBalance(chatClausesArray, games, userId, CLAUSE_STATUS_ACCEPTED)
	return (
		<DealBalanceContainer>
			{getBalanceStatus(evaluatedBalance)}{evaluatedBalance ? `: ${Math.abs(evaluatedBalance)} ₽` : ''}
		</DealBalanceContainer>
	)
}
function getBalanceStatus(evaluatedBalance) {
	if(evaluatedBalance === 0) {
		return 'No games submitted'
	} 
	if(evaluatedBalance > 0) {
		return 'You receive'
	}
	if(evaluatedBalance < 0) {
		return 'You pay'
	}
}
function getBalance(clausesArray, games, userId, clauseStatus) {
	return clausesArray.reduce((balance, clause) => {
		if(clause.status !== clauseStatus) {
			return balance
		}
		const gamePrice = +(games[clause.gameId].unpackedPrice)
		if(userId === clause.ownerId) {
			return balance + gamePrice
		}
		return balance - gamePrice
	}, 0)
}

const mapStateToProps = ({auth, gameCache}) => ({
	userId: auth.authData && auth.authData.uid,
	games: gameCache.games
})


export default connect(mapStateToProps)(DealBalance)