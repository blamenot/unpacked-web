import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
	CLAUSE_STATUS_SUGGESTED,
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
import {gameCacheFetchMissingGamesRequest} from '../actions/game-cache'

function ClauseBalance ({chatId, userId, chatClausesArray, games, gamesByIdWait, gamesFetchErrors, isGamesFetched, isGamesWait, hasAllRequiredGames, fetchGames}) {
	useEffect(()=> {
		const gameIds = chatClausesArray.map(clause => clause.gameId)
		fetchGames(gameIds, games, gamesByIdWait)
	})

	if(isGamesWait || !isGamesFetched) {
		return <div>Wait...</div>
	}
	if(!hasAllRequiredGames) {
		//TODO ERROR HANDLER
		return (<div>
			Error fetching Games
			<pre>{JSON.stringify(gamesFetchErrors)}</pre>
		</div>)
	}
	return <div>Price accepted: {getBalance(chatClausesArray, games, userId, CLAUSE_STATUS_ACCEPTED)}</div>
}
function getBalance(clausesArray, games, userId, clauseStatus) {
	return clausesArray.reduce((balance, clause) => {
		if(clause.status !== clauseStatus) {
			return balance
		}
		//TODO IMPORTANT, send error to server money evaluation!
		const gamePrice = +(games[clause.gameId] && games[clause.gameId].unpackedPrice)
		if(userId === clause.respondentId) {
			return balance + gamePrice
		}
		return balance - gamePrice

	}, 0)
}

const mapStateToProps = ({clauseCache, gameCache, auth}, {chatId}) => {
	//TODO check why this mapStateToProps evaluated multiple times
	const chatClausesArray = Object.values(clauseCache.clauses).filter(clause => clause.chatId = chatId)
	const gamesFetchErrors = chatClausesArray.reduce((gamesFetchErrors, clause) => {
		if(gameCache.gamesByIdError[clause.gameId]) {
			return [...gamesFetchErrors, gameCache.gamesByIdError[clause.gameId]]
		}
		return gamesFetchErrors
	}, [])

	const isGamesFetched = chatClausesArray.every(clause => gameCache.gamesByIdFetched[clause.gameId])
	const isGamesWait = chatClausesArray.some(clause => gameCache.gamesByIdWait[clause.gameId])
	const hasAllRequiredGames = chatClausesArray.every(clause => gameCache.games[clause.gameId])

	return {
		userId: auth.authData && auth.authData.uid,
		chatClausesArray,
		games: gameCache.games,
		gamesByIdWait: gameCache.gamesByIdWait,
		gamesFetchErrors,
		isGamesFetched,
		isGamesWait,
		hasAllRequiredGames
	}
}

const mapDispatchToProps = dispatch => ({
	fetchGames(gameIds, games, gamesByIdWait) {
		dispatch(gameCacheFetchMissingGamesRequest(gameIds, games, gamesByIdWait))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ClauseBalance)