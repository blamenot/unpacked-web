import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import GameFinderInput from '../components/GameFinderInput'
import GameFinderResults from '../components/GameFinderResults'
const PageContents = styled.div`
	padding: 0 20px;
`
function PageSearch ({games}) {
	return (
		<Fragment>
			<PageContents>
				<GameFinderInput />
				<GameFinderResults games={games}/>
			</PageContents>
			<Footer/>
		</Fragment>
	)
}

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

export default connect(mapStateToProps)(PageSearch)