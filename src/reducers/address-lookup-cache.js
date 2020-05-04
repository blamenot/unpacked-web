import {
	ADDRESS_LOOKUP_CACHE_FETCH,
	ADDRESS_LOOKUP_CACHE_FETCH_WAIT,
	ADDRESS_LOOKUP_CACHE_FETCH_ERROR,
} from '../constants/action-types'

const initialState = {
	lookupPhrase: '', //Lookup phrase
	suggestions: [], //Array of places, https://nominatim.org/release-docs/develop/api/Output/
	suggestionsFetchWait: false,
	suggestionsFetchError: null,
	suggestionsFetched: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ADDRESS_LOOKUP_CACHE_FETCH: return {
			...state,
			suggestions: action.payload.suggestions,
			suggestionsFetchWait: false,
			suggestionsFetched: true
		}
		case ADDRESS_LOOKUP_CACHE_FETCH_WAIT: return {
			...state,
			lookupPhrase: action.payload.lookupPhrase,
			suggestionsFetchWait: true,
			suggestionsFetched: false,

		}
		case ADDRESS_LOOKUP_CACHE_FETCH_ERROR: return {
			...state,
			suggestionsFetchWait: false,
			suggestionsFetched: true,
			suggestionsFetchError: action.payload.suggestionsFetchError
		}
		default: return state
	}
}