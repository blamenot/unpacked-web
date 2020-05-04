import firebase from 'firebase/app'
import 'firebase/auth'
import {
	AUTH_SHOW_MODAL,
    AUTH_HIDE_MODAL,
	AUTH_SUBSCRIBE,
    AUTH_LOGIN,
    AUTH_LOGOUT,
	AUTH_LOGOUT_WAIT,
	AUTH_LOGOUT_ERROR
} from '../constants/action-types'
import {
	userCacheFetchUserByIdRequest
} from './user-cache'

//Actions
export function authShowModal() {
    return {
        type: AUTH_SHOW_MODAL
    }
}
export function authHideModal() {
    return {
        type: AUTH_HIDE_MODAL
    }
}
function authSubscribe() {
    return {
        type: AUTH_SUBSCRIBE
    }
}
function authLogin(authData) {
    return {
        type: AUTH_LOGIN,
        payload: {authData}
    }
}
function authLogout() {
    return {
        type: AUTH_LOGOUT
    }
}
function authLogoutWait() {
	return {
		type: AUTH_LOGOUT_WAIT
	}
}
function authLogoutError(logoutError){
	return {
		type: AUTH_LOGOUT_ERROR,
		payload: {
			logoutError: logoutError,
		}
	}
}

//Thunks
/**
 * Logouts user.
 */
export function authRequestLogout() {
    return async dispatch => {
		dispatch(authLogoutWait())
		try {
			await firebase.auth().signOut()
        	dispatch(authLogout())    
		} catch (logoutError) {
			dispatch(authLogoutError(logoutError))
		}
    }
}
/**
 * Adds authentication state observer
 */
export function authRequestSubscribe() {
    return dispatch => {
        //Subscribe to auth state change
        firebase.auth().onAuthStateChanged(function(authData) {
            if(authData) {
                dispatch(authLogin(authData))
				dispatch(userCacheFetchUserByIdRequest(authData.uid))
            } else {
                dispatch(authLogout())
            }
        })
        //self dispatch
        dispatch(authSubscribe())
    }
}
