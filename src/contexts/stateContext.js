import {createContext} from 'react'
export function getStateValue(state, type, key) {
	state.data[type] = state.data[type] || {}
	return state.data[type][key]
}
export function setStateValue(state, type, key, value) {
	state.data[type] = state.data[type] || {}
	state.data[type][key] = value
}
export function getStatePromise(state, type, key) {
	state.promise[type] = state.promise[type] || {}
	return state.promise[type][key]
}
export function setStatePromise(state, type, key, promise) {
	state.promise[type] = state.promise[type] || {}
	state.promise[type][key] = promise
}
export function deleteStatePromise(state, type, key) {
	state.promise[type] = state.promise[type] || {}
	delete state.promise[type][key]
}
export default createContext();