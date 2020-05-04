import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {gameCacheFetchByIdRequest} from '../actions/game-cache'
import StyledWait from '../common/StyledWait'
import StyledError from '../common/StyledError'
function GameLoader({
	gameId,
	Component,
	CompoenentWait = StyledWait,
	ComponentError = StyledError,
	game,
	fetchWait,
	fetchError,
	fetchById,
	...props
}) {
	useEffect(() => {
		if(!game && !fetchWait && !fetchError) {
			fetchById(gameId)
		}
	}, [gameId, game, fetchWait, fetchError, fetchById])
	if(fetchError) {
		return <ComponentError gameId={gameId} error={fetchError}/>
	}
	if(game) {
		return <Component gameId={gameId} game={game} {...props} />
	}
	return <CompoenentWait gameId={gameId}/>
}

const mapStateToProps = ({gameCache}, {gameId}) => ({
	game: gameCache.games[gameId],
	wait: gameCache.gamesByIdWait[gameId],
	error: gameCache.gamesByIdError[gameId]
})

const mapDispatchToProps = dispatch => ({
	fetchById(gameId) {
		dispatch(gameCacheFetchByIdRequest(gameId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(GameLoader)