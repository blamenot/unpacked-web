import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {
	PATH_TAB_LIST,
	PATH_TAB_LOCATION,
} from '../constants/paths'
import {userCacheFetchByOfferRequest} from '../actions/user-cache'
import GameInfo from '../components/GameInfo'
import GameOffers from '../components/GameOffers'
import GameLocations from '../components/GameLocations'
function PageGame({gameId, activeTab, authUserId, users, error, userCacheFetchByOfferRequest}) {
	useEffect(()=> {
		if(authUserId && !users && !error) {
			userCacheFetchByOfferRequest()
		}
	}, [authUserId, users, error, userCacheFetchByOfferRequest])
	if(error) {
		return <div>{error.toString()}</div>
	}
	if(users) {
		const usersWithOffer = getUsersWithOffer(users, gameId, authUserId)
		return (
			<Fragment>
				{!activeTab && <GameInfo gameId={gameId}/>}
				{activeTab === PATH_TAB_LIST 
								&& <GameOffers gameId={gameId} users={usersWithOffer} />}
				{activeTab === PATH_TAB_LOCATION
								&& <GameLocations gameId={gameId} users={usersWithOffer} />}
			</Fragment>
		)
	}
	return <div>Wait...</div>
}
function getUsersWithOffer(users, gameId, authUserId) {
	let usersWithOffer = {}
	for(let userId in users) {
		if(
			users[userId].offerIds 
			&& users[userId].offerIds.indexOf(gameId) >= 0
			&& userId !== authUserId
		) {
			usersWithOffer[userId] = users[userId]
		}
	}
	return usersWithOffer
}
const mapStateToProps = ({userCache, auth}, {match}) => {
	const gameId = match.params.gameId;
	const fetched = userCache.usersByOfferFetched[gameId]
	const wait = userCache.usersByOfferWait[gameId]
	return {
		gameId,
		authUserId: auth.authData && auth.authData.uid,
		users: fetched && !wait ? userCache.users : null,
		error: fetched && !wait ? userCache.usersByOfferError[gameId] : null,
	}
}
const mapDispatchToProps = (dispatch, {match}) =>({
	userCacheFetchByOfferRequest() {
		return dispatch(userCacheFetchByOfferRequest(match.params.gameId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PageGame)