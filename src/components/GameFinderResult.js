import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {PATH_PAGE_GAME} from '../constants/paths'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'
import OffersCounter from './OffersCounter'
const GameFinderResultContainer = styled.div`
	text-transform: none;
	border: 1px solid #5F606C;
	height: 88px;
	margin: 10px 0;
	padding: 20px;
	display: flex;
`
const GameInfo = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	color: #5F606C;
	padding-left: 20px;
`
const GameInfoName = styled.div`
	color: white;
`
const GamePrice = styled.div`
	color: white;
`
function GameRow({gameId, game}) {
	return (
		<Fragment>
			<GameTile game={game}/>
			<GameInfo>
				<GameInfoName>{game.name}</GameInfoName>
				<div>{game.platform}</div>
				<GamePrice>{game.unpackedPrice} rub.</GamePrice>
				<div>Offers found: <OffersCounter gameId={gameId}/></div>
			</GameInfo>
		</Fragment>
	)
}
function GameFinderResult ({gameId}) {
	return (<Link to={PATH_PAGE_GAME.replace(':gameId', gameId)}>
			<GameFinderResultContainer>
				<GameLoader gameId={gameId} Component={GameRow}/>
			</GameFinderResultContainer>
		</Link>)
}

export default GameFinderResult