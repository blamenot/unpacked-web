import React, {Fragment} from 'react'
import styled from 'styled-components'
import {useRouteMatch} from "react-router-dom"
import StyledLink from '../common/StyledLink'
import {
	PATH_TAB_LIST,
	PATH_TAB_LOCATION,
} from '../constants/paths'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'
const TileContainer = styled.div`
	text-align: center;
`
function GameInfoDescription({game}) {
	return (
		<Fragment>
			<TileContainer>
				<GameTile game={game} isBig/>
			</TileContainer>
			<h2>{game.name}</h2>
			<div><label>PLATFORM:</label> {game.platform}</div>
			<div><label>DESCRIPTION:</label></div>
			<div>{game.description}</div>
		</Fragment>
	)
}
function GameInfo({gameId}) {
	const {url} = useRouteMatch();
	return (
		<Fragment>
			<GameLoader gameId={gameId} Component={GameInfoDescription}/>
			<StyledLink to={`${url}/${PATH_TAB_LIST}`} right withBackground>Offers list</StyledLink>
			<StyledLink to={`${url}/${PATH_TAB_LOCATION}`} right withBackground>Offers map</StyledLink>
		</Fragment>
	)
}

export default GameInfo