import {
	GAME_CACHE_FETCH_BY_ID,
	GAME_CACHE_WAIT_BY_ID,
	GAME_CACHE_ERROR_BY_ID
} from '../constants/action-types'

const initialState = {
	gamesByIdWait: {}, //Map, key: id of game, value: Boolean is being Fetched
	gamesByIdFetched: {}, //Map, key: id of game, value: Boolean is already fetche (successfull or not)
	gamesByIdError: {},//Map, key: id of game, value: Error on game fetching
	games: {} //Map, key: id of game, value: game object
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GAME_CACHE_FETCH_BY_ID: return {
			...state,
			gamesByIdWait: {
				...state.gamesByIdWait,
				[action.payload.gameId]: false
			},
			gamesByIdFetched: {
				...state.gamesByIdFetched,
				[action.payload.gameId]: true,
			},
			games: {
				...state.games,
				[action.payload.gameId]: action.payload.game
			}
		}
		case GAME_CACHE_WAIT_BY_ID: return {
			...state,
			gamesByIdWait: {
				...state.gamesByIdWait,
				[action.payload.gameId]: true
			},
			gamesByIdFetched: {
				...state.gamesByIdFetched,
				[action.payload.gameId]: false
			},
			gamesByIdError: {
				...state.gamesByIdError,
				[action.payload.gameId]: null
			}
		}
		case GAME_CACHE_ERROR_BY_ID: return {
			...state,
			gamesByIdWait: {
				...state.gamesByIdWait,
				[action.payload.gameId]: false
			},
			gamesByIdFetched: {
				...state.gamesByIdFetched,
				[action.payload.gameId]: true
			},
			gamesByIdError: {
				...state.gamesByIdError,
				[action.payload.gameId]: action.payload.gameByIdError
			}	
		}
		default: return state
	}
}