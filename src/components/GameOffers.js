import React from 'react'
import GameOffer from './GameOffer'
import StyledLink from '../common/StyledLink'
import { PATH_PAGE_GAME } from '../constants/paths'
function GameOffers ({gameId, users}) {
	let renderedOffers = []
	for (let userId in users) {
		renderedOffers.push(<GameOffer 
			gameId={gameId}
			user={users[userId]}
			ownerId={userId}
			key={userId}/>)
	}
	return (
		<div>
			<StyledLink	to={PATH_PAGE_GAME.replace(':gameId', gameId)}
						left
						bold>
				Offers list
			</StyledLink>
			{renderedOffers}
		</div>
	)
}
export default(GameOffers)