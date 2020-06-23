import firebase from 'firebase/app'
import 'firebase/firestore'
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
import {
	COLLECTION_CLAUSES
} from '../constants/collection-names'
import {
	CLAUSE_STATUS_SUGGESTED,
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
//Actions
function clauseCacheAddPush(clauseId, clause) {
	return {
		type: CLAUSE_CACHE_ADD_PUSH,
		payload: {clauseId, clause}
	}
}
function clauseCacheAddWait() {
	return {
		type: CLAUSE_CACHE_ADD_WAIT
	}
}
function clauseCacheAddError(addError) {
	return {
		type: CLAUSE_CACHE_ADD_ERROR,
		payload: {addError}
	}
}
function clauseCacheFetchByChat(chatId, clauses) {
	return {
		type: CLAUSE_CACHE_FETCH_BY_CHAT,
		payload: {chatId, clauses}
	}
}
function clauseCacheWaitByChat(chatId) {
	return {
		type: CLAUSE_CACHE_WAIT_BY_CHAT,
		payload: {chatId}
	}
}
function clauseCacheErrorByChat(chatId, clausesByChatError) {
	return {
		type: CLAUSE_CACHE_ERROR_BY_CHAT,
		payload: {
			chatId,
			clausesByChatError
		}
	}
}
function clauseCacheUpdate(clauseId, clauseUpdate) {
	return {
		type: CLAUSE_CACHE_UPDATE_STATUS,
		payload: {
			clauseId,
			clauseUpdate
		}
	}
}
function clauseCacheUpdateWait() {
	return {type: CLAUSE_CACHE_UPDATE_WAIT}
}
function clauseCacheUpdateError(updateError){
	return {
		type: CLAUSE_CACHE_UPDATE_ERROR,
		payload: updateError
	}
}
//Thunks
/**
 * Creates clause in db with specified chatId
 * @params {String} chatId
 * @params {String} suggesterId basicly the authenticated user
 * @params {String} respondentId Owner of the offer/demand
 * @params {String} gameId
 * @params {Boolean} isDemand specifies if user is submitting a demand or an offer
 * @params {Function} successCallback
 */
export function clauseCacheAddRequest(chatId, ownerId, suggesterId, respondentId,
										gameId, isDemand, successCallback) {
	return async dispatch => {
		const clause = {
			chatId,
			ownerId,
			suggesterId,
			respondentId,
			gameId,
			status: CLAUSE_STATUS_SUGGESTED,
			isDemand,
			sendDate: firebase.firestore.FieldValue.serverTimestamp(),
			updateDate: firebase.firestore.FieldValue.serverTimestamp()

		}
		dispatch(clauseCacheAddWait())
		try {
			const clauseRef = await firebase.firestore()
				.collection(COLLECTION_CLAUSES).add(clause)
			dispatch(clauseCacheAddPush(clauseRef.id, {
				...clause,
				sendDate: new Date(), //because server date is unknown at the moment
				updateDate: new Date() //because server date is unknown at the moment
			}))
			if(typeof(successCallback) === 'function') {
				successCallback(clauseRef.id)
			}
		} catch(addError) {
			dispatch(clauseCacheAddError(addError))
		}
	}
}
/**
 * Fetches active (suggested and accepted) clauses for specified chat
 * @param chatId {String} chat
 */
export function clauseCacheFetchActiveByChatRequest(chatId) {
	return async dispatch => {
		const query = firebase.firestore().collection(COLLECTION_CLAUSES)
			.where('chatId','==', chatId)
			.where('status', 'in', [CLAUSE_STATUS_SUGGESTED, CLAUSE_STATUS_ACCEPTED])
		dispatch(clauseCacheWaitByChat(chatId))
		try {
			const querySnapshot = await query.get()
			const clauses = querySnapshot.docs.reduce((clauses, doc) => {
				const fetchedClause = doc.data()
				clauses[doc.id] = {
					...fetchedClause,
					sendDate: fetchedClause.sendDate.toDate(),
					updateDate: fetchedClause.updateDate.toDate(),
				}
				return clauses
			}, {})
			dispatch(clauseCacheFetchByChat(chatId, clauses))
		} catch (clausesByChatError) {
			dispatch(clauseCacheErrorByChat(chatId, clausesByChatError))
		}
	}
}
/**
 * Changes status for specified clause
 * @param clauseId {String}
 * @param clause {Object} updated clause
 */
export function clauseCacheUpdateStatusRequest(clauseId, targetStatus) {
	return async dispatch => {
		const ref = firebase.firestore().collection(COLLECTION_CLAUSES)
			.doc(clauseId)
		dispatch(clauseCacheUpdateWait())
		try {
			await ref.update({
				status: targetStatus,
				updateDate: firebase.firestore.FieldValue.serverTimestamp()
			})
			dispatch(clauseCacheUpdate(clauseId, {status: targetStatus, updateDate: new Date()}))
		} catch(updateError) {
			dispatch(clauseCacheUpdateError(updateError))
		}
	}
}
/**
 * Bulk status change for clauses.
 * Changes all clauses in chat with specified status.
 * @param clauseIds {array}
 * @param targetStatus {string}
 */
export function clauseCacheBulkStatusUpdateRequest(clauseIds, targetStatus) {
	const statusUpdateThunks = clauseIds.map(clauseId => clauseCacheUpdateStatusRequest(clauseId, targetStatus))
	return  dispatch => {
		const statusUppdates = statusUpdateThunks.map(statusUpdateThunk => statusUpdateThunk(dispatch))
		return Promise.all[statusUppdates]
	}
}