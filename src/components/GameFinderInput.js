import React from 'react'
import {connect} from 'react-redux'
import {
	gameFinderSearchPhrase,
	gameFinderFetchRequest,
	gameFinderFetchCancel
} from '../actions/game-finder'
import StyledInput from '../common/StyledInput'
import IconSearch from '../common/Icons/IconSearch'
function GameFinderInput ({
	searchPhrase,
	searchKey,
	onGameFinderSearchPhrase,
	onGameFinderFetchRequest,
	onGameFinderFetchCancel
}) {
	function onSearchPhraseChange(searchPhrase) {
		const currentSearchKey = searchPhrase.toLowerCase().trim().substring(0,2)

		if((currentSearchKey.length < 2) && searchKey) {
			onGameFinderFetchCancel()
		} else if ((currentSearchKey.length === 2) && (currentSearchKey !== searchKey)) {
			onGameFinderFetchRequest(currentSearchKey)
		}
		onGameFinderSearchPhrase(searchPhrase)
	}
	return (
		<StyledInput	value={searchPhrase}
						placeholder="start typing game name"
						onChange={onSearchPhraseChange}
						icon={<IconSearch />}/>
	)
}


const mapStateToProps = ({gameFinder}) => ({
	searchPhrase: gameFinder.searchPhrase,
	searchKey: gameFinder.searchKey
})
const mapDispatchToProps = (dispatch) => ({
	onGameFinderSearchPhrase(searchPhrase) {
		dispatch(gameFinderSearchPhrase(searchPhrase))
	},
	onGameFinderFetchRequest(searchKey) {
		dispatch(gameFinderFetchRequest(searchKey))
	},
	onGameFinderFetchCancel() {
		dispatch(gameFinderFetchCancel())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(GameFinderInput)