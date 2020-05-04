import {
	OFFERS_ADD_SHOW_MODAL,
	OFFERS_ADD_HIDE_MODAL
} from '../constants/action-types'
const initialState = {
	user: null,
	modalShown: false,
	wait: false,
	addError: ''
}
export default function (state = initialState, action) {
	switch(action.type) {
		case OFFERS_ADD_SHOW_MODAL: return {
			...state,
			modalShown: true,
			user: action.payload.user
		}
		case OFFERS_ADD_HIDE_MODAL: return {
			...state,
			modalShown: false,
			user: null
		}
		default: return state
	}
}