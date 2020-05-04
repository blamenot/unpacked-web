import React from 'react'
import {connect} from 'react-redux'
import {userCacheDeleteUserGameRequest} from '../actions/user-cache'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'
function UserGame({gameId, ownerId, authUserId, onOffersDeleteRequest}) {
	const deleteButton = (authUserId === ownerId
		? <button className="offer-delete"
					onClick={() => onOffersDeleteRequest(ownerId, gameId)}>
						&times;
			</button> 
		: '')
	return (
			<div className="offer">
				<GameLoader gameId={gameId} Component={GameTile} isBig/>
				{deleteButton}
			</div>
		)
}
const mapStateToProps = ({auth}) => ({
	authUserId: auth.authData && auth.authData.uid
})
const mapDispatchToProps = dispatch => ({
	onOffersDeleteRequest(userId, offerId) {
		dispatch(userCacheDeleteUserGameRequest(userId, offerId, false))
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(UserGame)