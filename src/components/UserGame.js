import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {userCacheDeleteUserGameRequest} from '../actions/user-cache'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'

const OfferDelete = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -6px;
  right: -6px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-size: 24px;
  color: #FDE74C;
  text-shadow: 0 0 8px #154ea3;
`

function UserGame({gameId, ownerId, authUserId, onOffersDeleteRequest}) {
	const deleteButton = (authUserId === ownerId
		? <OfferDelete
					onClick={() => onOffersDeleteRequest(ownerId, gameId)}>
						&times;
			</OfferDelete> 
		: '')
	return (
			<div className="offer">
				<GameLoader gameId={gameId} Component={GameTile}/>
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