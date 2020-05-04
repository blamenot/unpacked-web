import firebase from 'firebase/app'
import 'firebase/firestore'
import {
	GAME_FINDER_SEARCH_PHRASE,
	GAME_FINDER_FETCH,
	GAME_FINDER_FETCH_WAIT,
	GAME_FINDER_FETCH_ERROR,
	GAME_FINDER_FETCH_CANCEL
} from '../constants/action-types'
import {COLLECTION_GAMES} from '../constants/collection-names'
import {gameCacheFetchById} from './game-cache'
//Actions
export function gameFinderSearchPhrase(searchPhrase) {
	return {
		type: GAME_FINDER_SEARCH_PHRASE,
		payload: {searchPhrase}
	}
}
function gameFinderFetch(pendingPromise) {
	return {
		type: GAME_FINDER_FETCH,
		payload: {pendingPromise}
	}
}
function gameFinderFetchWait(searchKey, pendingPromise) {
	return {
		type: GAME_FINDER_FETCH_WAIT,
		payload: {searchKey, pendingPromise}
	}
}
function gameFinderFetchError(gamesFetchError, pendingPromise) {
	return {
		type: GAME_FINDER_FETCH_ERROR,
		payload: {gamesFetchError, pendingPromise}
	}
}
export function gameFinderFetchCancel() {
	return {type: GAME_FINDER_FETCH_CANCEL}
}
//Thunks
/**
 * Fetches list of games according to search string,
 * Should not be used for filtering games
 * @param {String} searchKey 2 chars key stored for each game
 */
export function gameFinderFetchRequest(searchKey) {
	/*TODO create game cache for finding games,
		so you won't get possibly enormous ammount of queries */
	return async dispatch => {
		const gamesQuery = firebase.firestore()
			.collection(COLLECTION_GAMES)
			.where('searchKeys', 'array-contains', searchKey)
		const pendingPromise = gamesQuery.get()
		pendingPromise.then(
			querySnapshot => {
				const games = querySnapshot.docs.reduce((games, doc) => {
					games[doc.id] = doc.data()
					return games
				}, {})
				dispatch(gameFinderFetch(pendingPromise))
				for(let gameId in games) {
					dispatch(gameCacheFetchById(gameId, games[gameId]))
				}

			},
			gamesFetchError => {
				dispatch(gameFinderFetchError(gamesFetchError, pendingPromise))
			}
		)
		dispatch(gameFinderFetchWait(searchKey, pendingPromise))
	}
}