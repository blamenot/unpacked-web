/*
	Reducer used only for self update. 
	Generic user update is not supported.
*/
import {
	USER_UPDATE_UNSAVED,
	USER_UPDATE_SAVED
} from '../constants/action-types'

const initialState = {
	user: null,
	isSaved: true,
}

export default function (state = initialState, action) {
	switch(action.type) {
		case USER_UPDATE_UNSAVED: return {
			...state,
			user: action.payload.user,
			isSaved: false,
		}
		case USER_UPDATE_SAVED: return {
			...state,
			user: action.payload.user,
			isSaved: true,
		}
		default: return state
	}
}