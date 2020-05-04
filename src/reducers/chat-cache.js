import {
	CHAT_CACHE_FETCH_BY_PARTICIPANT, //TODO rename all actions to user FETCH_BY_SOMTH
	CHAT_CACHE_WAIT_BY_PARTICIPANT,
	CHAT_CACHE_ERROR_BY_PARTICIPANT,
	CHAT_CACHE_ADD_PUSH,
	CHAT_CACHE_ADD_WAIT,
	CHAT_CACHE_ADD_ERROR,
	CHAT_CACHE_LAST_MESSAGE_FETCH,
	CHAT_CACHE_FETCH_BY_ID,
	CHAT_CACHE_WAIT_BY_ID,
	CHAT_CACHE_ERROR_BY_ID
} from '../constants/action-types'

const initialState = {
	chatsByParticipantWait: {}, //Map, key: participantId, value Boolean is being fetched
	chatsByParticipantFetched: {}, //Map, key: participantId, value Boolean is fetched
	chatsByParticipantError: {}, //Map, key: participantId, value Error
	chatsByIdWait: {}, //Map, key chatId, value boolean is being fetched
	chatsByIdFetched: {}, //Map, key chatId, value boolean is fetched
	chatsByIdError: {}, //Map, key chatId, value Error fetching
	chats: {}, //Map, key: chatId, value Object chat
	chatsLastMessages: {}, //Map, key: chatId, value Object last message
	chatsNames: {}, //Map, key: chatId, value string name
	chatAddWait: false,
	chatAddError: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case CHAT_CACHE_FETCH_BY_PARTICIPANT: return {
			...state,
			chatsByParticipantWait: {
				...state.chatsByParticipantWait,
				[action.payload.participantId]: false
			},
			chatsByParticipantFetched: {
				...state.chatsByParticipantFetched,
				[action.payload.participantId]: true
			},
			chats: {
				...state.chats,
				...action.payload.chats
			},
			chatsByIdFetched: {
				...state.chatsByIdFetched,
				...objectMap(action.payload.chats, () => true)
			}
		}
		case CHAT_CACHE_WAIT_BY_PARTICIPANT: return {
			...state,
			chatsByParticipantWait: {
				...state.chatsByParticipantWait,
				[action.payload.participantId]: true
			},
			chatsByParticipantFetched: {
				...state.chatsByParticipantFetched,
				[action.payload.participantId]: false
			},
			chatsByParticipantError: {
				...state.chatsByParticipantError,
				[action.payload.participantId]: null
			}
		}
		case CHAT_CACHE_ERROR_BY_PARTICIPANT: return {
			...state,
			chatsByParticipantWait: {
				...state.chatsByParticipantWait,
				[action.payload.participantId]: false
			},
			chatsByParticipantFetched: {
				...state.chatsByParticipantFetched,
				[action.payload.participantId]: true
			},
			chatsByParticipantError: {
				...state.chatsByParticipantError,
				[action.payload.participantId]: action.payload.chatsByParticipantError
			},
		}
		case CHAT_CACHE_ADD_PUSH: return {
			...state,
			chats: {
				...state.chats,
				[action.payload.chatId]: action.payload.chat
			},
			chatAddWait: false
		}
		case CHAT_CACHE_ADD_WAIT: return {
			...state,
			chatAddWait: false,
			chatAddError: null
		}
		case CHAT_CACHE_ADD_ERROR: return {
			...state,
			chatAddWait: false,
			chatAddError: action.payload.addError
		}
		case CHAT_CACHE_LAST_MESSAGE_FETCH: return {
			...state,
			chatsLastMessages: {
				...state.chatsLastMessages,
				[action.payload.chatId]: action.payload.message
			}
		}
		case CHAT_CACHE_FETCH_BY_ID: return {
			...state,
			chats: {
				...state.chats,
				[action.payload.chatId]: action.payload.chat
			},
			chatsByIdWait: {
				...state.chatsByIdWait,
				[action.payload.chatId]: false
			},
			chatsByIdFetched: {
				...state.chatsByIdFetched,
				[action.payload.chatId]: true
			}
		}
		case CHAT_CACHE_WAIT_BY_ID: return {
			...state,
			chatsByIdWait: {
				...state.chatsByIdWait,
				[action.payload.chatId]: true
			},
			chatsByIdFetched: {
				...state.chatsByIdFetched,
				[action.payload.chatId]: false
			},
			chatsByIdError: {
				...state.chatsByIdError,
				[action.payload.chatId]: null
			}
		}
		case CHAT_CACHE_ERROR_BY_ID: return {
			...state,
			chatsByIdWait: {
				...state.chatsByIdWait,
				[action.payload.chatId]: false
			},
			chatsByIdFetched: {
				...state.chatsByIdFetched,
				[action.payload.chatId]: true
			},
			chatsByIdError: {
				...state.chatsByIdError,
				[action.payload.chatId]: action.payload.fetchError
			}
		}
		default: return state
	}
}
//TODO put this to utilities
/**
 * Converts map like object values using iteratee
 * @param {Object} list 
 * @param {function} iteratee is passed three arguments: the value, key and reference to list
 * @returns {Object} map with same keys but object represented by true
 */
function objectMap(list, iteratee) {
	let mappedList = {}
	for(let key in list) {
		mappedList[key] = iteratee(list[key], key, list)
	}
	return mappedList
}