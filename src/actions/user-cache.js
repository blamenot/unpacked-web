import firebase from 'firebase/app'
import 'firebase/firestore'
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
import {COLLECTION_USERS} from '../constants/collection-names'
//Actions
function userCacheFetchByOffer(gameId, users) {
	return {
		type: USER_CACHE_FETCH_BY_OFFER,
		payload: {gameId, users}
	}
}
function userCacheWaitByOffer(gameId) {
	return {
		type: USER_CACHE_WAIT_BY_OFFER,
		payload: {gameId}
	}
}
function userCacheErrorByOffer(gameId, usersByOfferError) {
	return {
		type: USER_CACHE_ERROR_BY_OFFER,
		payload: {gameId}
	}
}
function userCacheFetchById(userId, user) {
	return {
		type: USER_CACHE_FETCH_BY_ID,
		payload: {userId, user}
	}
}
function userCacheWaitById() {
	return {type: USER_CACHE_WAIT_BY_ID}
}
function userCacheErrorById(userByIdError) {
	return {
		type: USER_CACHE_ERROR_BY_ID,
		payload: {userByIdError}
	}
}
function userCacheUpdate(userId, user) {
	return {
		type: USER_CACHE_UPDATE,
		payload: {
			userId,
			user
		}
	}
}
function userCacheUpdateWait() {
	return {type: USER_CACHE_UPDATE_WAIT}
}
function userCacheUpdateError(userUpdateError) {
	return {
		type: USER_CACHE_UPDATE_ERROR,
		payload: {userUpdateError}
	}
}
//Thunks
/**
 * Fetches all user for specified gameId as Offer
 * @param {String} gameId
 */
export function userCacheFetchByOfferRequest(gameId) {
	return async dispatch => {
		const query = firebase.firestore() //TODO rename complex names to query
			.collection(COLLECTION_USERS)
			.where('offerIds', 'array-contains', gameId)
		dispatch(userCacheWaitByOffer(gameId))
		try {
			const querySnapshot = await query.get()
			const users = querySnapshot.docs.reduce((users, doc) => {
				users[doc.id] = doc.data()
				return users
			}, {})
			dispatch(userCacheFetchByOffer(gameId, users))
		} catch (usersByOfferError) {
			dispatch(userCacheErrorByOffer(gameId, usersByOfferError))
		}
	}
}
/**
 * Fetches single user
 * @param {String} userId same as authData.uid
 */
export function userCacheFetchUserByIdRequest(userId) {
	return async dispatch => {
		const ref = firebase.firestore()
			.collection(COLLECTION_USERS).doc(userId)
		dispatch(userCacheWaitById())
		try {
			const doc = await ref.get()
			dispatch(userCacheFetchById(userId, doc.data() || null))
		} catch(userByIdError) {
			dispatch(userCacheErrorById (userByIdError))
		}
	}
}
/**
 * Adds Offer or demand to user Object
 * @param {String} userId
 * @param {String} gameId
 * @param {Boolean} isDemand
 */
 export function userCacheAddUserGameRequest(userId, gameId, isDemand) {
	return async dispatch => {
		const ref = firebase.firestore()
			.collection(COLLECTION_USERS).doc(userId)
		dispatch(userCacheUpdateWait())
		try {
			const doc = await ref.get() //TODO Possible unnescessary fetch, create user LAST UPDATE attribute,
										// to preserve data integrity
			let user = doc.data()
			const updateField = isDemand ? 'demandIds' : 'offerIds'
			if (!user[updateField] || user[updateField].indexOf(gameId) < 0) {
				await ref.update({
					[updateField]: firebase.firestore.FieldValue.arrayUnion(gameId)
				})
				user[updateField] = user[updateField] || []
				user[updateField].push(gameId)
			}
			dispatch(userCacheUpdate(userId, user))
		} catch (userUpdateError) {
			dispatch(userCacheUpdateError(userUpdateError))
		}
	}
}
/**
 * Deletes Offer or demand to user Object
 * @param {String} userId
 * @param {String} gameId
 * @param {Boolean} isDemand
 */
 export function userCacheDeleteUserGameRequest(userId, gameId, isDemand) {
	return async dispatch => {
		const ref = firebase.firestore()
			.collection(COLLECTION_USERS).doc(userId)
		dispatch(userCacheUpdateWait())
		try {
			const doc = await ref.get() //TODO Possible unnescessary fetch, create user LAST UPDATE attribute,
										// to preserve data integrity
			let user = doc.data()
			const updateField = isDemand ? 'demandIds' : 'offerIds'
			if (user[updateField] && user[updateField].indexOf(gameId) >= 0) {
				await ref.update({
					[updateField]: firebase.firestore.FieldValue.arrayRemove(gameId)
				})
				user[updateField] = user[updateField].filter(userGameId => userGameId !== gameId)
			}
			dispatch(userCacheUpdate(userId, user))
		} catch (userUpdateError) {
			dispatch(userCacheUpdateError(userUpdateError))
		}
	}
}

/**
 * Updates specified user
 * @param {String} userId
 * @param {Object} userUpdates
 * @param {Function} successCallback
 */
export function userCacheUserUpdate(userId, userUpdates, successCallback) {
	return async dispatch => {
		const ref = firebase.firestore()
			.collection(COLLECTION_USERS).doc(userId)
		dispatch(userCacheUpdateWait())
		try {
			const doc = await ref.get() //TODO Possible unnescessary fetch, create user LAST UPDATE attribute,
										// to preserve data integrity
			const user = {
				...doc.data(),
				...userUpdates
			}
			await ref.update(user)
			dispatch(userCacheUpdate(userId, user))
			successCallback(user)
		} catch (userUpdateError) {
			dispatch(userCacheUpdateError(userUpdateError))
		}
	}
}
/**
 * Creates specified user
 * @param {String} userId
 * @param {Object} user
 * @param {Function} successCallback
 */
export function userCacheUserCreate(userId, user, successCallback) {
	return async dispatch => {
		const ref = firebase.firestore()
 			.collection(COLLECTION_USERS).doc(userId)
 		dispatch(userCacheUpdateWait())
 		try {
 			await ref.set(user)
 			dispatch(userCacheUpdate(userId, user))
 			successCallback(user)
 		} catch (userUpdateError) {
 			dispatch(userCacheUpdateError(userUpdateError))
 		}
	}
}