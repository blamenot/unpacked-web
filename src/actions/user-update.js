import {
	USER_UPDATE_UNSAVED,
	USER_UPDATE_SAVED
} from '../constants/action-types'

import {
	userCacheUserUpdate,
	userCacheUserCreate
} from './user-cache'
//Actions
export function userUpdateUnsaved(user) {
	return {
		type: USER_UPDATE_UNSAVED,
		payload: {user}
	}
}
export function userUpdateSaved(user) {
	return {
		type: USER_UPDATE_SAVED,
		payload: {user}
	}
}
//Thunks
/**
 * Saves user to database
 * @param {String} userId
 * @param {Object} updatedUser
 */
export function userUpdateSaveRequest(userId, updatedUser) {
	return dispatch => {
		const successCallback = updatedUser => dispatch(userUpdateSaved(updatedUser))
		dispatch(userCacheUserUpdate(userId, updatedUser, successCallback))
	}
}
/**
 * Creates user to database
 * @param {String} userId
 * @param {Object} user
 * @param {Function} callback
 */
export function userUpdateCreateRequest(userId, user, callback) {
	return dispatch => {
		const successCallback = user => {
			dispatch(userUpdateSaved(user))
			callback && callback()
		}
		dispatch(userCacheUserCreate(userId, user, successCallback))
	}
}