import firebase from 'firebase/app'
import 'firebase/firestore'
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
import {
	COLLECTION_CHATS,
	COLLECTION_MESSAGES
} from '../constants/collection-names'
//Actions
function chatCacheFetchByParticipant(participantId, chats) {
	return {
		type: CHAT_CACHE_FETCH_BY_PARTICIPANT,
		payload: {participantId, chats}
	}
}
function chatCacheWaitByParticipant(participantId) {
	return {
		type: CHAT_CACHE_WAIT_BY_PARTICIPANT,
		payload: {participantId}
	}
}
function chatCacheErrorByParticipant(participantId, chatsByParticipantError) {
	return {
		type: CHAT_CACHE_ERROR_BY_PARTICIPANT,
		payload: {participantId, chatsByParticipantError}
	}
}
function chatCacheAddPush(chatId, chat) {
	return {
		type: CHAT_CACHE_ADD_PUSH,
		payload: {chatId, chat}
	}
}
function chatCacheAddWait() {
	return {
		type: CHAT_CACHE_ADD_WAIT
	}
}
function chatCacheAddError(addError) {
	return {
		type: CHAT_CACHE_ADD_ERROR,
		payload: {addError}
	}
}
export function chatCacheFetchLastMessage(message) {
	return {
		type: CHAT_CACHE_LAST_MESSAGE_FETCH,
		payload: {chatId: message.chatId, message}
	}
}
function chatCacheFetchById(chatId, chat) {
	return {
		type: CHAT_CACHE_FETCH_BY_ID,
		payload: {chatId, chat}
	}
}
function chatCacheWaitById(chatId) {
	return {
		type: CHAT_CACHE_WAIT_BY_ID,
		payload: {chatId}
	}
}
function chatCacheErrorById(chatId, fetchError) {
	return {
		type: CHAT_CACHE_ERROR_BY_ID,
		payload: {chatId, fetchError}
	}
}
//Thunks
/**
 * Fetches all chats for specified User
 * @param {String} participantId user id of any participant in chat
 */
export function chatCacheFetchByParticipantRequest(participantId) {
	return async dispatch => {
		//TODO triggered multiple times
		const query = firebase.firestore().collection(COLLECTION_CHATS)
			.where('participantIds', 'array-contains', participantId)
		dispatch(chatCacheWaitByParticipant(participantId))
		try {
			const querySnapshot = await query.get()
			const chats = querySnapshot.docs.reduce((chats, doc) => {
				chats[doc.id] = doc.data()
				return chats
			}, {})
			dispatch(chatCacheFetchByParticipant(participantId, chats))
		} catch(chatsByParticipantError) {
			dispatch(chatCacheErrorByParticipant(participantId, chatsByParticipantError))
		}
	}
}
/**
 * Fetches single chat object
 * @param {string} chatId 
 */
export function chatCacheFetcByIdRequest(chatId) {
	return async dispatch => {
		const ref = firebase.firestore()
		.collection(COLLECTION_CHATS)
		.doc(chatId)
		dispatch(chatCacheWaitById(chatId))
		try {
			const doc = await ref.get()
			dispatch(chatCacheFetchById(chatId, doc.data()))
		} catch (fetchError) {
			dispatch(chatCacheErrorById(chatId, fetchError))
		}
	}
}
/**
 * Creates new chat in chats collection
 * @param {Array} participantIds
 */
export function chatCacheAddRequest(participantIds, successCallback) {
	return async dispatch => {
		const chat = {participantIds}
		dispatch(chatCacheAddWait())
		try {
			const chatRef = await firebase.firestore()
				.collection(COLLECTION_CHATS).add(chat)
			dispatch(chatCacheAddPush(chatRef.id, chat))
			if(typeof(successCallback) === 'function') {
				successCallback(chatRef.id)
			}
		} catch(addError) {
			dispatch(chatCacheAddError(addError))
		}
	}
}
/**
 * Fetches last message for chat
 */
export function chatCacheFetchLastMessageRequest(chatId) {
	return async dispatch => {
		const query = firebase.firestore().collection(COLLECTION_MESSAGES)
		.where('chatId', '==', chatId)
		.orderBy('sendDate', 'desc')
		try {
			const querySnapshot = await query.get()
			const doc = querySnapshot.docs[0]
				dispatch(chatCacheFetchLastMessage(chatId, doc && doc.data()))

		} catch (fetchLastMessageError) {
			dispatch(chatCacheFetchLastMessage(chatId, null))
			throw fetchLastMessageError
		}
	}
}