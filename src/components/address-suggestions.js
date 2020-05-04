import React from 'react'
import {connect} from 'react-redux'
import AddressSuggestion from './address-suggestion'

function AddressSuggestions ({wait, suggestions}) {
	if(wait) {
		return <div>Loading...</div>
	}
	return <ul>{renderSuggestions(suggestions)}</ul>

	function renderSuggestions(suggestions) {
		return suggestions.map(suggestion => (
			<AddressSuggestion key={suggestion.place_id} suggestion={suggestion} />
			))
	}
}

const mapStateToProps = ({addressLookupCache}) => ({
	wait: addressLookupCache.wait,
	suggestions: addressLookupCache.suggestions
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressSuggestions)