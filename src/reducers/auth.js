import {
	AUTH_SHOW_MODAL,
    AUTH_HIDE_MODAL,
	AUTH_SUBSCRIBE,
    AUTH_LOGIN,
    AUTH_LOGOUT,
	AUTH_LOGOUT_WAIT,
	AUTH_LOGOUT_ERROR
} from '../constants/action-types'

const initialState = {
    authModalShown: false,
    subscribed: false, //Firebase has authentification state change subscription
	authData: null, //Authenticated user data owned by firebase
	logoutError: '',
	wait: false //auth state change is not always triggered.
}

export default function (state = initialState, action) {
    switch(action.type) {
		case AUTH_SHOW_MODAL: return {
            ...state,
            authModalShown: true,
        }
        case AUTH_HIDE_MODAL: return {
            ...state,
            authModalShown: false
        }
		case AUTH_SUBSCRIBE: return {
            ...state,
            subscribed: true
        }
        case AUTH_LOGIN: return {
			...state,
			authModalShown: false,
			authData: action.payload.authData
        }
        case AUTH_LOGOUT: return {
			...state,
			authData: null,
			wait: false,
		}
		case AUTH_LOGOUT_WAIT: return {
			...state,
			wait: true,
			logoutError: ''
		}
		case AUTH_LOGOUT_ERROR: return {
			...state,
			logoutError: action.payload.logoutError
		}
        default: return state
	}
}