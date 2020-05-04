import {
	OFFER_FINDER_FETCH,
	OFFER_FINDER_WAIT,
	OFFER_FINDER_ERROR,
} from '../constants/action-types'

const initialState = {
	offersForGameWait: {}, //map key - gameId, value Boolean is being fetched
	offersForGameFetched: {}, //map key - gameId, value Boolean is fetched
	offers: {}, //map of offers
	offersFetchErrors: {} //map key - gameId, value query Error
}

export default function(state = initialState, action) {
	switch(action.type) {
		case OFFER_FINDER_FETCH: {
			//Fetched all active offers for the game.
			//All previous offer are outdated
			let filteredOffers = {}
			for(let offerId in state.offers) {
				if(state.offers[offerId].gameId !== action.payload.gameId) {
					filteredOffers[offerId] = state.offers[offerId]
				}
			}
			return {
				...state,
				offersForGameWait: {
					...state.offersForGameWait,
					[action.payload.gameId]: false
				},
				offersForGameFetched: {
					...state.offersForGameFetched,
					[action.payload.gameId]: true
				},
				offers: {
					...filteredOffers,
					...action.payload.offersToAdd
				}
			}
		}
		case OFFER_FINDER_WAIT: return {
			...state,
			offersForGameWait: {
				...state.offersForGameWait,
				[action.payload.gameId]: true
			},
			offersForGameFetched: {
				...state.offersForGameFetched,
				[action.payload.gameId]: false
			},
			offersFetchErrors: {
				...state.offersFetchErrors,
				[action.payload.gameId]: ''
			}
		}
		case OFFER_FINDER_ERROR: return {
			...state,
			offersForGameWait: {
				...state.offersForGameWait,
				[action.payload.gameId]: false
			},
			offersForGameFetched: {
				...state.offersForGameFetched,
				[action.payload.gameId]: true
			},
			offersFetchErrors: {
				...state.offersFetchErrors,
				[action.payload.gameId]: action.payload.offersFetchError
			}
		}
		default: return state
	}
}