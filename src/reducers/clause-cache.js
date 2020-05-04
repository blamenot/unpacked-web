import {
	CLAUSE_CACHE_ADD_PUSH,
	CLAUSE_CACHE_ADD_WAIT,
	CLAUSE_CACHE_ADD_ERROR,
	CLAUSE_CACHE_FETCH_BY_CHAT,
	CLAUSE_CACHE_WAIT_BY_CHAT,
	CLAUSE_CACHE_ERROR_BY_CHAT,
	CLAUSE_CACHE_UPDATE_STATUS,
	CLAUSE_CACHE_UPDATE_WAIT,
	CLAUSE_CACHE_UPDATE_ERROR
} from '../constants/action-types'

const initialState = {
	clauses: {},	/* Map, key: clauseId, value Object clause.
					All clauses from this collection, are displayed in chat. */
	clauseAddWait: false,	//Boolean flag, clause is now being added to server
	clauseAddError: null,	//Error on adding clause object to (server database)
	clausesByChatWait: {},	//Map, key: chatId, value: Boolean is being Fetched
	clausesByChatFetched: {},	//Map, key: chatId, value: Boolean is Fetched
	clausesByChatError: {},	//Map, key: chatId, value: Error
	clausesUpdateWait: false,	//Boolean flag, clause is being updated
	clausesUpdateError: null	//Error on updating clause specifficaly status
}

export default function(state = initialState, action) {
	switch(action.type) {
		case CLAUSE_CACHE_ADD_PUSH: return {
			...state,
			clauses: {
				...state.clauses,
				[action.payload.clauseId]: action.payload.clause
			},
			clauseAddWait: false
		}
		case CLAUSE_CACHE_ADD_WAIT: return {
			...state,
			clauseAddWait: true,
			clauseAddError: null
		}
		case CLAUSE_CACHE_ADD_ERROR: return {
			...state,
			clauseAddWait: false,
			clauseAddError: action.payload.addError
		}
		case CLAUSE_CACHE_FETCH_BY_CHAT: return {
			...state,
			clauses: {
				...state.clauses,
				...action.payload.clauses
			},
			clausesByChatWait: {
				...state.clausesByChatWait,
				[action.payload.chatId]: false
			},
			clausesByChatFetched: {
				...state.clausesByChatFetched,
				[action.payload.chatId]: true
			}
		}
		case CLAUSE_CACHE_WAIT_BY_CHAT: return {
			...state,
			clausesByChatWait: {
				...state.clausesByChatWait,
				[action.payload.chatId]: true
			},
			clausesByChatFetched: {
				...state.clausesByChatFetched,
				[action.payload.chatId]: false
			},
			clausesByChatError: {
				...state.clausesByChatError,
				[action.payload.chatId]: null
			}
		}
		case CLAUSE_CACHE_ERROR_BY_CHAT: return {
			...state,
			clausesByChatWait: {
				...state.clausesByChatWait,
				[action.payload.chatId]: false
			},
			clausesByChatFetched: {
				...state.clausesByChatFetched,
				[action.payload.chatId]: true
			},
			clausesByChatError: {
				...state.clausesByChatError,
				[action.payload.chatId]: action.payload.clausesByChatError
			}
		}
		case CLAUSE_CACHE_UPDATE_STATUS: return {
			...state,
			clauses: {
				...state.clauses,
				[action.payload.clauseId]: action.payload.clause
			},
			clausesUpdateWait: false
		}
		case CLAUSE_CACHE_UPDATE_WAIT: return {
			...state,
			clausesUpdateWait: true,
			clausesUpdateError: null,
		}
		case CLAUSE_CACHE_UPDATE_ERROR: return {
			...state,
			clausesUpdateWait: false,
			clausesUpdateError: action.payload.updateError
		}
		default: return state
	}
}