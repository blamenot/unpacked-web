import React, {useState} from 'react'
import styled from 'styled-components'
import AddressLookupSuggestions from './AddressLookupSuggestions'
import StyledInput from '../common/StyledInput'
import IconSearch from '../common/Icons/IconSearch'
const AddressLookupContainer = styled.div`
	position: relative;
`
async function getSuggestions(phrase) {
	const query = ('https://nominatim.openstreetmap.org?osm_ids=[N]&format=json&limit=5&q=' 
			+ encodeURI(phrase))
	try {
		const response = await fetch(query)
		const suggestions = await response.json()
		return [suggestions, phrase, null]
	} catch(error) {
		return [[], phrase, error]
	}
}
const actualPhrase = {phrase: ''}; //do I need to use memo?
function AddressLookup({onLookup, address = '', readonly}) {
	const [phrase, setPhrase] = useState(address)
	const [suggestions, setSuggestions] = useState([])
	const [error, setError] = useState(null)
	async function showSuggestions(phrase) {
		setSuggestions(null)
		actualPhrase.phrase = phrase
		const [fetchedSuggestions, fetchedPhrase, error] = await getSuggestions(phrase)
		if(fetchedPhrase === actualPhrase.phrase) {
			setSuggestions(fetchedSuggestions)
			setError(error)
		}
	}
	function onSelect(suggestion) {
		setSuggestions(null)
		if (suggestion) {
			setPhrase(suggestion.display_name)
			onLookup(suggestion)
		}
	}
	const renderedSuggestions = (!!suggestions 
		&& <AddressLookupSuggestions suggestions={suggestions} onSelect={onSelect}/>)
	return (
		<AddressLookupContainer>
			<StyledInput	onSubmit={showSuggestions}
							value={phrase}
							readonly={readonly}
							placeholder='Type in address'
							onChange={setPhrase}
							submitLabel={<IconSearch/>}/>
			{renderedSuggestions}
			{error}
		</AddressLookupContainer>
	)
}

export default AddressLookup