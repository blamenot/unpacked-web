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
			{getBalanceStatus(evaluatedBalance)}: {Math.abs(evaluatedBalance)}
		</DealBalanceContainer>
	)
}
function getBalanceStatus(evaluatedBalance) {
	if(evaluatedBalance === 0) {
		return null;
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
		//TODO IMPORTANT, send error to server money evaluation!
		//must contain all games
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
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DealBalance)