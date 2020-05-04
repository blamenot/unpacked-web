import {
	ADDRESS_LOOKUP_CACHE_FETCH,
	ADDRESS_LOOKUP_CACHE_FETCH_WAIT,
	ADDRESS_LOOKUP_CACHE_FETCH_ERROR,
} from '../constants/action-types'
//Actions
function addressLookupCacheFetch(suggestions) {
	return {
		type: ADDRESS_LOOKUP_CACHE_FETCH,
		payload: {suggestions}
	}
}
function addressLookupCacheFetchWait(lookupPhrase) {
	return {
		type: ADDRESS_LOOKUP_CACHE_FETCH_WAIT,
		payload: {lookupPhrase}
	}
}
function addressLookupCacheFetchError(suggestionsFetchError) {
	return {
		type: ADDRESS_LOOKUP_CACHE_FETCH_ERROR,
		payload: {suggestionsFetchError}
	}
}
//Thunks
export function addressLookupCacheFetchRequest(lookupPhrase) {
	return async dispatch => {
		const query = ('https://nominatim.openstreetmap.org?osm_ids=[N]&format=json&limit=5&q=' 
			+ encodeURI(lookupPhrase))
		dispatch(addressLookupCacheFetchWait(lookupPhrase))
		try {
			const response = await fetch(query)
			const suggestions = await response.json()
			dispatch(addressLookupCacheFetch(suggestions))
		} catch(suggestionsFetchError) {
			dispatch(addressLookupCacheFetchError(suggestionsFetchError))
		}
	}
}