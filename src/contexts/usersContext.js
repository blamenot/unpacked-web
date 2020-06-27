import {createContext} from 'react'
const initialValue = {
	users: {},
	promiseById: {},
}
export default createContext(initialValue);