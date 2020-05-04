import firebase from 'firebase/app'
import 'firebase/firestore'
import {COLLECTION_GAMES} from '../constants/collection-names'
import {
	GAME_CACHE_FETCH_BY_ID,
	GAME_CACHE_WAIT_BY_ID,
	GAME_CACHE_ERROR_BY_ID
} from '../constants/action-types'
//Actions
export function gameCacheFetchById(gameId, game) {
	return {
		type: GAME_CACHE_FETCH_BY_ID,
		payload: {
			gameId,
			game
		}
	}
}
function gameCacheWaitById(gameId) {
	return {
		type: GAME_CACHE_WAIT_BY_ID,
		payload: {gameId}
	}
}
function gameCacheErrorById(gameId, gameByIdError) {
	return {
		type: GAME_CACHE_ERROR_BY_ID,
		payload: {gameId, gameByIdError}
	}
}
//Thunks
/**
 * Fetches single game by Id,
 * @param {String} gameId id id datebase
 */
 export function gameCacheFetchByIdRequest(gameId) {
 	return async dispatch => {
 		const ref = firebase.firestore()
 			.collection(COLLECTION_GAMES)
 			.doc(gameId)
 		dispatch(gameCacheWaitById(gameId))
 		try {
			const doc = await ref.get()
			if(!doc.exists) {
				throw new Error('Could not find game for gameId: ' + gameId)
			} 
 			dispatch(gameCacheFetchById(gameId, doc.data()))
 		} catch(gameByIdError) {
 			dispatch(gameCacheErrorById(gameId, gameByIdError))
 		}
 	}
 }
/**
 * Fetches games that haven't beent fetched
 * @param {Object} 
 */
 export function gameCacheFetchMissingGamesRequest(gameIds, games, gamesByIdWait) {
 	return async dispatch => {
 		//TODO convert to single bulk dispatch and fetch
 		gameIds.forEach(gameId => {
 			if(!gamesByIdWait[gameId] && !games[gameId]) {
 				dispatch(gameCacheFetchByIdRequest(gameId))
 			}
 		})
 	}
 }