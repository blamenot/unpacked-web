import React, {Fragment} from 'react'
import Map from '../common/Map/Map'
import { PATH_PAGE_GAME } from '../constants/paths'
import StyledLink from '../common/StyledLink'
function GameLocations({users, gameId}) {

	return (
		<Fragment>
			<StyledLink	to={PATH_PAGE_GAME.replace(':gameId', gameId)} 
						left
						bold>
				Offers map
			</StyledLink>
			<Map points={getPointsForUsers(users)}/>
		</Fragment>
	)
}
function getPointsForUsers(users) {
	let points = []
	for(let userId in users) {
		points.push({
			id: userId,
			position: [users[userId].latitude, users[userId].longitude]
		})
	}
	return points
}
export default GameLocations