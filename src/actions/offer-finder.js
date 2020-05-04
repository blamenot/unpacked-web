//TODO rename to offers cache and reuse it
import firebase from 'firebase/app'
import 'firebase/firestore'
import {
	OFFER_FINDER_FETCH,
	OFFER_FINDER_WAIT,
	OFFER_FINDER_ERROR,
} from '../constants/action-types'
import {COLLECTION_OFFERS} from '../constants/collection-names'
//Actions
function offerFinderFetch(gameId, offersToAdd) {
	return {
		type: OFFER_FINDER_FETCH,
		payload: {gameId, offersToAdd}
	}
}
function offerFinderWait(gameId) {
	return {
		type: OFFER_FINDER_WAIT,
		payload: {gameId}
	}
}
function offerFinderError(gameId, offersFetchError) {
	return {
		type: OFFER_FINDER_ERROR,
		payload: {gameId, offersFetchError}
	}
}

//Thunks
/**
 * Fetches all offers for specified gameId
 * @param {String} gameId 
 */
export function offerFinderFetchRequest(gameId) {
	return async dispatch => {
		const offersQuery = firebase.firestore()
			.collection(COLLECTION_OFFERS)
			.where('gameId', '==', gameId)
		dispatch(offerFinderWait(gameId))
		try {
			const querySnapshot = await offersQuery.get()
			const offersToAdd = querySnapshot.docs.reduce((offersToAdd, doc)=> {
					offersToAdd[doc.id] = doc.data()
					return offersToAdd
			}, {})
			dispatch(offerFinderFetch(gameId, offersToAdd))
		} catch(offersFetchError) {
			dispatch(offerFinderError(gameId, offersFetchError.toString()))
			//TODO convert all errors from strings, string looses part of information
		}
	}
}