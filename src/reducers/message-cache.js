import {
	MESSAGE_CACHE_FETCH,
	MESSAGE_CACHE_FETCH_WAIT,
	MESSAGE_CACHE_FETCH_ERROR,
	MESSAGE_CACHE_UPDATE,
	MESSAGE_CACHE_UPDATE_CONFIRM,
	MESSAGE_CACHE_SUBSCRITION
} from '../constants/action-types'

const initialState = {
	messages: [], //Message list for specific chat.
	messagesByChatWait: {},	//Map, key: chatId, value: Boolean is being Fetched
	messagesByChatFetched: {},	//Map, key: chatId, value: Boolean is Fetched
	messagesByChatError: {},	//Map, key: chatId, value: Error,
	messagesUnsubscribe: null //firebase unsubscribe function
}

export default function(state = initialState, action) {
	switch(action.type) {
		case MESSAGE_CACHE_FETCH: return {
			...state,
			messages: action.payload.messages,
			messagesByChatWait: {
				...state.messagesByChatWait,
				[action.payload.chatId]: false
			},
			messagesByChatFetched: {
				...state.messagesByChatFetched,
				[action.payload.chatId]: true
			},
		}
		case MESSAGE_CACHE_FETCH_WAIT: return {
			...state,
			messagesByChatWait: {
				...state.messagesByChatWait,
				[action.payload.chatId]: true
			},
			messagesByChatFetched: {
				...state.messagesByChatFetched,
				[action.payload.chatId]: false
			},
			messagesByChatError: {
				...state.messagesByChatError,
				[action.payload.chatId]: null
			}
		}
		case MESSAGE_CACHE_FETCH_ERROR: return {
			...state,
			messagesByChatWait: {
				...state.messagesByChatWait,
				[action.payload.chatId]: false
			},
			messagesByChatFetched: {
				...state.messagesByChatFetched,
				[action.payload.chatId]: true
			},
			messagesByChatError: {
				...state.messagesByChatError,
				[action.payload.chatId]: action.payload.fetchError
			}
		}
		case MESSAGE_CACHE_UPDATE: {
			const messageIndex = (action.payload.outdatedMessageId
				? state.messages.findIndex(message => message.id === action.payload.outdatedMessageId)
				: -1)
			if(messageIndex >= 0 ) { //message is in array, replace it with updated
				return {
					...state,
					messages: [
						...state.messages.slice(0, messageIndex),
						action.payload.updatedMessage,
						...state.messages.slice(messageIndex + 1)
					]
				}
			}
			return {//message is not in array, put in list as the last one, 
				...state,
				messages: [
					...state.messages,
					action.payload.updatedMessage
				]
			}
		}
		case MESSAGE_CACHE_UPDATE_CONFIRM: return {
			...state,
			messages: state.messages.map(message => {
				if(message.id === action.payload.confirmedMessageId) {
					return {
						...message,
						isUpdating: false
					}
				}
				return message
			})
		}
		case MESSAGE_CACHE_SUBSCRITION: return {
			...state,
			messagesUnsubscribe: action.payload.messagesUnsubscribe
		}
		default: return state
	}
}