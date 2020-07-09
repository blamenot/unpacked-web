import React, {useState} from 'react'
import styled from 'styled-components'
import AddressLookupSuggestions from './AddressLookupSuggestions'
import StyledInput from '../common/StyledInput'
import IconSearch from '../common/Icons/IconSearch'
const AddressLookupContainer = styled.div`
	position: relative;
`
async function getSuggestions(phrase) {
	const query = `https://api.maptiler.com/geocoding/${encodeURI(phrase)}.json?key=CJgU0YXneoFmW9PKNHt5&proximity=37.6255034,55.7243808`
	try {
		const response = await fetch(query)
		const {features} = await response.json()
		return [features, phrase, null]
	} catch(error) {
		return [[], phrase, error]
	}
}
const actualPhrase = {phrase: ''}; //do I need to use memo?
function onAddressInputFocus(e) {
	e.target.select()
} 
function AddressLookup({onLookup, address = '', readonly}) {
	const [phrase, setPhrase] = useState(address)
	const [suggestions, setSuggestions] = useState([])
	async function showSuggestions(phrase) {
		setSuggestions(null)
		actualPhrase.phrase = phrase
		const [fetchedSuggestions, fetchedPhrase, error] = await getSuggestions(phrase)
		if(fetchedPhrase === actualPhrase.phrase) {
			setSuggestions(fetchedSuggestions)
			error && console.error(error)
		}
	}
	function onSelect(suggestion) {
		setSuggestions(null)
		if (suggestion) {
			setPhrase(suggestion.place_name)
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
							submitLabel={<IconSearch/>}
							onFocus={onAddressInputFocus}
							/>
			{renderedSuggestions}
		</AddressLookupContainer>
	)
}

export default AddressLookup