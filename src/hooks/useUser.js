import firebase from 'firebase/app'
import 'firebase/firestore'
import {COLLECTION_USERS} from '../constants/collection-names'
import useFetch from './useFetch'
export default function(userId) {
	return useFetch('users', userId, fetchUserById, [userId])
}
/**
 * Fetches single user
 * @param {String} userId same as authData.uid
 */
async function fetchUserById(userId) {
	const ref = firebase.firestore().collection(COLLECTION_USERS).doc(userId)
	const doc = await ref.get()
	return doc.data()
}
