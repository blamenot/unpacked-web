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
const GameName = styled.h2`
	font-size: 24px;
	padding: 10px 20px;
	margin: 0;
	margin-top: 15px;
`
const StyledLabel = styled.label`
	color: #5F606C;
	font-size: 12px;
	text-transform: uppercase;
`
const Section = styled.section`
	padding 10px 20px;
	font-size: 12px;
`
function GameInfoDescription({game}) {

	return (
		<Fragment>
			<TileContainer>
				<GameTile game={game} isBig/>
			</TileContainer>
			<GameName>{game.name}</GameName>
			<Section>
				<StyledLabel>Platform: </StyledLabel>
				{game.platform}
			</Section>
			{!!game.generes?.length && (
				<Section>
					<StyledLabel>Genere: </StyledLabel>
					{game.generes.join(', ')}
				</Section>
			)}
		</Fragment>
	)
}
function GameInfo({gameId}) {
	const {url} = useRouteMatch();
	return (
		<div>
			<GameLoader gameId={gameId} Component={GameInfoDescription}/>
			<StyledLink to={`${url}/${PATH_TAB_LIST}`} right withBackground>Offers list</StyledLink>
			<StyledLink to={`${url}/${PATH_TAB_LOCATION}`} right withBackground>Offers map</StyledLink>
		</div>
	)
}

export default GameInfo