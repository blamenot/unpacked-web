import {
	GAME_FINDER_SEARCH_PHRASE,
	GAME_FINDER_FETCH,
	GAME_FINDER_FETCH_WAIT,
	GAME_FINDER_FETCH_ERROR,
	GAME_FINDER_FETCH_CANCEL
} from '../constants/action-types'

const initialState = {
	searchPhrase: '', //Whole phrase user is searching
	searchKey: '', //String search key usualy 2 letters
	pendingPromise: null, //Last fetch promise 
	gamesFetchError: null, //Last fetch error for searchKey
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GAME_FINDER_SEARCH_PHRASE: return {
			...state,
			searchPhrase: action.payload.searchPhrase
		}
		case GAME_FINDER_FETCH: if (state.pendingPromise === action.payload.pendingPromise) {
			//request is still being expected
			return {
				...state,
				pendingPromise: null
			}
		} else {
			//this request was cancelled
			return state
		}
		case GAME_FINDER_FETCH_WAIT: return {
			...state,
			searchKey: action.payload.searchKey,
			pendingPromise: action.payload.pendingPromise,
			gamesFetchError: ''
		}
		case GAME_FINDER_FETCH_ERROR: if(state.pendingPromise === action.payload.pendingPromise) {
			return {
				...state,
				pendingPromise: null,
				games: {},
				gamesFetchError: action.payload.gamesFetchError
			}
		} else {
			//TODO log error
			return state
		}
		case GAME_FINDER_FETCH_CANCEL: return {
			...state,
			pendingPromise: null
		}
		default: return state
	}
}