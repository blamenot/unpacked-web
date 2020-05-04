import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {offerFinderFetchRequest} from '../actions/offer-finder'

function OffersFinder ({gameId, offers, offersForGameWait, offersForGameFetched, offersFetchErrors, onOfferFinderFetchRequest}) {
	const offersRequested = offersForGameWait[gameId] || offersForGameFetched[gameId]
	useEffect(() => {
		if(!offersRequested) {
			onOfferFinderFetchRequest(gameId)
		}
	},[offersRequested, gameId, onOfferFinderFetchRequest])
	
	if(offersForGameWait[gameId]) {
		return <span>Wait ...</span>
	} else if(offersFetchErrors[gameId]) {
		return <span>{offersFetchErrors[gameId]}</span>
	} else if(!offersForGameFetched[gameId]) {
		return false
	} else {
		let offersCount = 0
		for(let offerId in offers) {
			if(offers[offerId].gameId === gameId) {
				offersCount ++
			}
		}
		return <span>Offers: {offersCount}</span>
	}
}

const mapStateToProps = ({offerFinder}) => ({
	...offerFinder
})
const mapDispatchToProps = (dispatch) => ({
	onOfferFinderFetchRequest(gameId) {
		dispatch(offerFinderFetchRequest(gameId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersFinder)