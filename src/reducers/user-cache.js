import {
	USER_CACHE_FETCH_BY_OFFER,
	USER_CACHE_WAIT_BY_OFFER,
	USER_CACHE_ERROR_BY_OFFER,
	USER_CACHE_FETCH_BY_ID,
	USER_CACHE_WAIT_BY_ID,
	USER_CACHE_ERROR_BY_ID,
	USER_CACHE_UPDATE,
	USER_CACHE_UPDATE_WAIT,
	USER_CACHE_UPDATE_ERROR
} from '../constants/action-types'

const initialState = {
	usersByOfferWait: {}, //Map, key: GameId, value: Boolean is being fetched
	usersByOfferFetched: {}, //Map, key: GameId, value: Boolean is fetched
	usersByOfferError: {},  //Map, key: GameId, value Error fetching Error
	userByIdWait: false,
	userByIdError: null,
	userUpdateWait: false,
	userUpdateError: '',
	users: {} //Map, key: user UID, value Object user
}

export default function(state = initialState, action) {
	switch(action.type) {
		case USER_CACHE_FETCH_BY_OFFER: return {
			...state,
			usersByOfferWait: {
				...state.usersByOfferWait,
				[action.payload.gameId]: false
			},
			usersByOfferFetched: {
				...state.usersByOfferFetched,
				[action.payload.gameId]: true
			},
			users: {
				...state.users,
				...action.payload.users
			}
		}
		case USER_CACHE_WAIT_BY_OFFER: return {
			...state,
			usersByOfferWait: {
				...state.usersByOfferWait,
				[action.payload.gameId]: true
			},
			usersByOfferFetched: {
				...state.usersByOfferFetched,
				[action.payload.gameId]: false
			},
			usersByOfferError: {
				...state.usersByOfferError,
				[action.payload.gameId]: null
			}
		}
		case USER_CACHE_ERROR_BY_OFFER: return {
			...state,
			usersByOfferWait: {
				...state.usersByOfferWait,
				[action.payload.gameId]: false
			},
			usersByOfferFetched: {
				...state.usersByOfferFetched,
				[action.payload.gameId]: true
			},
			usersByOfferError: {
				...state.usersByOfferError,
				[action.payload.gameId]: action.payload.usersByOfferError
			}
		}
		case USER_CACHE_FETCH_BY_ID: return {
			...state,
			userByIdWait: false,
			users: {
				...state.users,
				[action.payload.userId]:action.payload.user
			}
		}
		case USER_CACHE_WAIT_BY_ID: return {
			...state,
			userByIdWait: true,
			userByIdError: null
		}
		case USER_CACHE_ERROR_BY_ID: return {
			...state,
			userByIdWait: false,
			userByIdError: action.payload.userByIdError
		}
		case USER_CACHE_UPDATE: return {
			...state,
			userUpdateWait: false,
			users: {
				...state.users,
				[action.payload.userId]: action.payload.user
			}
		}
		case USER_CACHE_UPDATE_WAIT: return {
			...state,
			userUpdateWait: true,
			userUpdateError: false
		}
		case USER_CACHE_UPDATE_ERROR: return {
			...state,
			userUpdateWait: false,
			userUpdateError: action.payload.userUpdateError
		}
		default: return state
	}
}