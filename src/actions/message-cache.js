import firebase from 'firebase/app'
import 'firebase/firestore'
import {
	MESSAGE_CACHE_FETCH,
	MESSAGE_CACHE_FETCH_WAIT,
	MESSAGE_CACHE_FETCH_ERROR,
	MESSAGE_CACHE_UPDATE,
	MESSAGE_CACHE_UPDATE_CONFIRM,
	MESSAGE_CACHE_SUBSCRITION
} from '../constants/action-types'
import {COLLECTION_MESSAGES} from '../constants/collection-names'
import {chatCacheFetchLastMessage} from './chat-cache'
//Actions
function messageCacheFetch(messages, chatId) {
	return {
		type: MESSAGE_CACHE_FETCH,
		payload: {
			messages,
			chatId,
		}
	}
}
function messageCacheFetchWait(chatId) {
	return {
		type: MESSAGE_CACHE_FETCH_WAIT,
		payload: {
			chatId,
		}
	}
}
function messageCacheFetchError(fetchError, chatId) {
	return {
		type: MESSAGE_CACHE_FETCH_ERROR,
		payload: {
			fetchError,
			chatId
		}
	}
}
function messageCacheUpdate(outdatedMessageId, updatedMessage) {
	return {
		type: MESSAGE_CACHE_UPDATE,
		payload: {
			outdatedMessageId,
			updatedMessage
		}
	}
}
function messageCacheUpdateConfirm(confirmedMessageId) {
	return {
		type: MESSAGE_CACHE_UPDATE_CONFIRM,
		payload: {
			confirmedMessageId
		}
	}
}
function messageCacheSubscribe(messagesUnsubscribe) {
	return {
		type: MESSAGE_CACHE_SUBSCRITION,
		payload: {
			messagesUnsubscribe
		}
	}
}
export function messageCacheUnsubscribe(messagesUnsubscribe) {
	messagesUnsubscribe()
	return {
		type: MESSAGE_CACHE_SUBSCRITION,
		payload: {
			messagesUnsubscribe: null
		}
	}
}
//Thunks
/**
 * Fetches last 100 messages for specified chat
 * @param {String} chatId 
 */
export function messageCacheFetchRequest(chatId) {
	return async dispatch => {
		const query = firebase.firestore().collection(COLLECTION_MESSAGES)
			.where('chatId','==', chatId)
			.orderBy('sendDate')
			.limit(100)
		dispatch(messageCacheFetchWait(chatId))
		try {
			const queyrSnapshot = await  query.get()
			const messages = queyrSnapshot.docs.map(doc => {
				const fetchedMessage = doc.data()
				return {
					...fetchedMessage,
					sendDate: fetchedMessage.sendDate.toDate(),
					updateDate: fetchedMessage.updateDate.toDate(),
					id: doc.id,
					isUpdating: doc.metadata.hasPendingWrites
				}
			})
			dispatch(messageCacheFetch(messages, chatId))
		} catch(fetchError) {
			dispatch(messageCacheFetchError(fetchError, chatId))
			throw fetchError
		}
	}
}
/**
 * Adds message to specified chat.
 * After sending message should be updated via subscription messageCacheSubscribeRequest()
 * @param {String} chatId
 * @param {String} text Message body
 * @param {String} authorId User can add messages as self
 */
export function messageCacheSendMessageRequest(chatId, text, authorId, recipientId) {
	return async dispatch => {
		const messageRef = firebase.firestore().collection(COLLECTION_MESSAGES ).doc()
		const message = {
			chatId,
			text,
			authorId,
			recipientId,
			sendDate: firebase.firestore.FieldValue.serverTimestamp(),
			updateDate: firebase.firestore.FieldValue.serverTimestamp()
		}
		dispatch(messageCacheUpdate(null, {
			id: messageRef.id,
			...message,
			sendDate: new Date(),
			updateDate: new Date(),
			isUpdating: true,
		}))
		try {
			await messageRef.set(message)
			dispatch(messageCacheUpdateConfirm(messageRef.id))
		} catch (sendError) {
			dispatch(messageCacheUpdate(messageRef.id, {
				id: messageRef.id,
				...message,
				sendError
			})) //TODO save to local storage, check date value
			throw sendError
		}
	}
}
/**
 * Sets subscription for specified chat.
 * Updates single message each time it appers updated in database.
 * Dont forget to unsubscribe on chat leave!
 * @param {String} userId 
 */
export function messageCacheSubscribeRequest(userId) {
	return dispatch => {
		const query = firebase.firestore().collection(COLLECTION_MESSAGES)
				.where('recipientId', '==', userId)
				.where('updateDate', '>', new Date())
		const messagesUnsubscribe = query.onSnapshot(
				querySnapshot => {
					querySnapshot.docChanges().forEach(change => {
						const fetchedMessage = change.doc.data()
						dispatch(messageCacheUpdate(
								change.doc.id,
								{
									id: change.doc.id,
									...fetchedMessage,
									sendDate: fetchedMessage.sendDate.toDate(),
									updateDate: fetchedMessage.updateDate.toDate(),
									isUpdating: change.doc.metadata.hasPendingWrites
								}
							)
						)
						dispatch(chatCacheFetchLastMessage(change.doc.data()))
					})
				},
				updateError => {
					throw updateError
				}
			)
		dispatch(messageCacheSubscribe(messagesUnsubscribe))
	}
}