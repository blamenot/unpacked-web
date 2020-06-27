import {useContext, useEffect, useState} from 'react'
import stateContext, {
	getStateValue,
	setStateValue,
	getStatePromise,
	setStatePromise,
	deleteStatePromise
} from '../contexts/stateContext'
export default function(type, key, fetcher, fetcherArgs = {}, callback) {
	const state = useContext(stateContext)
	const stateValue = getStateValue(state, type, key)
	const statePromise = getStatePromise(state, type, key)
	const [statusAndValue, setStatusAndValue] = useState([!stateValue, stateValue])
	useEffect(() => {
		if(!stateValue && statePromise) {
			statePromise.then(value => {
				setStatusAndValue([false, value])
			})
		}
		if(!stateValue && !statePromise) {
			const promise = fetcher(...fetcherArgs)
				.then(value => {
					deleteStatePromise(state, type, key)
					setStateValue(state, type, key, value)
					setStatusAndValue([false, value])
					callback && callback(state, type, key, value, fetcherArgs)
				})
				.catch(error => {
					deleteStatePromise(state, type, key)
					setStatusAndValue([false, null])
					console.error(error)
				})
			
			setStatePromise(state, type, key, promise)
		}
	})
	return statusAndValue
}