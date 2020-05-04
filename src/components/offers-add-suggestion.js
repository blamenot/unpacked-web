import React from 'react'
import {connect} from 'react-redux'
import {userCacheAddUserGameRequest} from '../actions/user-cache'
import {offersAddHideModal} from '../actions/offers-add'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'

function OffersAddSuggestion({ gameId, userId, onUserCacheAddUserGameRequest}) {
	const onClick = () => {
		onUserCacheAddUserGameRequest(userId, gameId, false)
	}
	return (
		<div className="offers-add-suggestion">
			<GameLoader gameId={gameId} Component={GameTile} onClick={onClick}/>
		</div>
	)
}

const mapStateToProps = ({auth, userCache}) => ({
	userId: auth.authData && auth.authData.uid,
	user: userCache[auth.authData && auth.authData.uid]
})
const mapDispatchToProps = dispatch => ({
	onUserCacheAddUserGameRequest(userId, gameId, isDemand) {
		dispatch(userCacheAddUserGameRequest(userId, gameId, isDemand))
		dispatch(offersAddHideModal())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(OffersAddSuggestion) 