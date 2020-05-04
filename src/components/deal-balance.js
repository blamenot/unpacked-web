import React from 'react'
import {connect} from 'react-redux'
import {
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'

function DealBalance ({chatClausesArray, games, userId}) {
	return <div>Price accepted: {getBalance(chatClausesArray, games, userId, CLAUSE_STATUS_ACCEPTED)}</div>
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