import React from 'react'
import {connect} from 'react-redux'
import OffersAddSuggestion from './offers-add-suggestion.js'

function GameFinderOffers ({games}) {
	let rederedResults = []
	for (let gameId in games) {
		rederedResults.push(<OffersAddSuggestion 
			gameId={gameId}
			game={games[gameId]}
			key={gameId}/>)
	}
	return rederedResults
}
//TODO same in game-finder results
const mapStateToProps = ({gameCache, gameFinder}) => {
	let filteredGames = {}
	const searchPhrase = gameFinder.searchPhrase.toLowerCase()
	for (let gameId in gameCache.games) {
		let game = gameCache.games[gameId]
		let isSuitable = game.tags.some((tag) => {
			return tag.toLowerCase().indexOf(searchPhrase) === 0
		})
		if(isSuitable) {
			filteredGames[gameId] = game
		}	
	}
	return {
		games: filteredGames
	}
}

export default connect(mapStateToProps)(GameFinderOffers)