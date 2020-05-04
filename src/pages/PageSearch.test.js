import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import configureStore from 'redux-mock-store'
import PageSearch from './PageSearch'

const mockStore = configureStore([thunk])
const storeDummy= {
	gameCache: {
		games: {
			'test_id': {
				name: 'test_name',
				tags: ['test']
			}
		}
	},
	gameFinder: {
		searchPhrase: 'test'
	}
}
jest.mock('../components/game-finder-results', () => () => <mock-game-finder-results />)
jest.mock('../components/game-finder-input', () => () => <mock-game-finder-input />)
jest.mock('../components/location-finder-input', () => () => <location-finder-input />)
jest.mock('../components/location-finder-map', () => () => <mock-location-finder-map />)

describe('Page search component', () => {
	it('should render without error', () => {
		const div = document.createElement('div')
		ReactDOM.render(
			<Provider store={mockStore(storeDummy)}>
        		<PageSearch />
			</Provider>, div)
	})
})