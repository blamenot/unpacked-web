import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {userCacheFetchByOfferRequest} from '../actions/user-cache'

function OffersCounter ({gameId, userCount, wait, error, fetched, onUserCacheFetchByOfferRequest}) {
	useEffect(() => {
		if(!wait && !fetched) {
			onUserCacheFetchByOfferRequest(gameId)
		}
	}, [gameId, wait, fetched, onUserCacheFetchByOfferRequest])
	if(wait) {
		return <span>Wait ...</span>
	} else if (error) {
		return <span>{error.toString()}</span>
	} else if (!fetched) {
		return false
	} else {
		return userCount
	}
}

const mapStateToProps = ({userCache}, {gameId}) => {
	const userCount = Object.values(userCache.users)
		.filter(user => user && user.offerIds && user.offerIds.indexOf(gameId) >= 0).length
	return {
		userCount,
		wait: userCache.usersByOfferWait[gameId],
		error: userCache.usersByOfferError[gameId],
		fetched: userCache.usersByOfferFetched[gameId]
	}
}
const mapDispatchToProps = dispatch => ({
	onUserCacheFetchByOfferRequest(gameId) {
		dispatch(userCacheFetchByOfferRequest(gameId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersCounter)