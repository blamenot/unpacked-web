import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import DealBalance from './deal-balance'
import DealClauses from './deal-clauses'
import {gameCacheFetchMissingGamesRequest} from '../actions/game-cache'
function Deal ({
	chatId,
	chatClausesArray,
	games,
	gamesByIdWait,
	gamesFetchErrors,
	isGamesFetched,
	isGamesWait,
	hasAllRequiredGames,
	fetchGames
}) {
	useEffect(()=> {
		const gameIds = chatClausesArray.map(clause => clause.gameId)
		fetchGames(gameIds, games, gamesByIdWait)
	})
	if(isGamesWait || !isGamesFetched) {
		return <div>Wait...</div>
	}
	if(!hasAllRequiredGames) {
		//TODO ERROR DISPLAYER
		return (<div>
			Error fetching Games
			<pre>{JSON.stringify(gamesFetchErrors)}</pre>
		</div>)
	}
	return (<div>
		<DealClauses chatId={chatId}/>
		<DealBalance chatClausesArray={chatClausesArray}/>
	</div>)
}

const mapStateToProps = ({clauseCache, gameCache}, {chatId}) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Deal)