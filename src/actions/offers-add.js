import {
    OFFERS_ADD_SHOW_MODAL,
    OFFERS_ADD_HIDE_MODAL
} from '../constants/action-types'

//Actions
export function offersAddShowModal(user) {
	return {
		type: OFFERS_ADD_SHOW_MODAL,
		payload: {user}
	}
}
export function offersAddHideModal() {
	return {
		type: OFFERS_ADD_HIDE_MODAL
	}
}