import React from 'react'
import GameFinderResult from './GameFinderResult'
function GameFinderResults ({games}) {
	let rederedResults = []
	for (let gameId in games) {
		rederedResults.push(<GameFinderResult 
			gameId={gameId}
			game={games[gameId]}
			key={gameId}/>)
	}
	return rederedResults
}

export default GameFinderResults