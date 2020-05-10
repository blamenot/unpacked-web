import React, {Fragment} from 'react'
import styled from 'styled-components'
import Map from '../common/Map/Map'
import { PATH_PAGE_GAME } from '../constants/paths'
import StyledLink from '../common/StyledLink'
import SubmitToOffer from './SubmitToOffer'
const UserNameContainer = styled.div`
	margin: 10px;
`
function GameLocations({users, gameId}) {
	return (
		<Fragment>
			<StyledLink	to={PATH_PAGE_GAME.replace(':gameId', gameId)} 
						left
						bold>
				Offers map
			</StyledLink>
			<Map points={getPointsForUsers(users, gameId)}/>
		</Fragment>
	)
}
function getPointsForUsers(users, gameId) {
	let points = []
	for(let userId in users) {
		points.push({
			id: userId,
			position: [users[userId].latitude, users[userId].longitude],
			contents: getContents(userId, users[userId], gameId)
		})
	}
	return points
}
function getContents(userId, user, gameId) {
	return ( 
		<Fragment>
			<UserNameContainer>{user.name}</UserNameContainer>
			<SubmitToOffer ownerId={userId} gameId={gameId}/>
		</Fragment>
	)
} 
export default GameLocations