import React, {useState} from 'react'
import styled from 'styled-components'
import AddressLookupSuggestions from './AddressLookupSuggestions'
import StyledInput from '../common/StyledInput'
import IconSearch from '../common/Icons/IconSearch'
const AddressLookupContainer = styled.div`
	position: relative;
`
async function getSuggestions(phrase) {
	const options = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Token 5a3074f7d8050fbbb2a9aafc3bed7cfc6303852e",
			"X-Secret": '4de2920ca3a6291e9e010da61fe3d32c4c14700e'
		},
		body: JSON.stringify({query: phrase})
	  }

	try {
		const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', options)
		const {suggestions} = await response.json()
		const mappedSuggestions = suggestions
			.filter(suggestion => suggestion.data.geo_lat && suggestion.data.geo_lon)
			.map(suggestion => ({
			id: suggestion.unrestricted_value,
			place_name: suggestion.value,
			center: [suggestion.data.geo_lon, suggestion.data.geo_lat]
		}))
		return [mappedSuggestions, phrase, null]
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
	const [suggestions, setSuggestions] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)
	
	async function showSuggestions(phrase) {
		setSuggestions(null)
		setError(null)
		setIsPending(true)
		actualPhrase.phrase = phrase
		if(phrase) {
			const [fetchedSuggestions, fetchedPhrase, error] = await getSuggestions(phrase)
			setError(error)
			setIsPending(false)
			if(fetchedPhrase === actualPhrase.phrase) {
				setSuggestions(fetchedSuggestions || [])
				error && console.error(error)
			}
		}
	}

	function onSelect(suggestion) {
		setSuggestions(null)
		setError(null)
		if (suggestion) {
			setPhrase(suggestion.place_name)
			onLookup(suggestion)
		}
	}

	return (
		<AddressLookupContainer>
			<StyledInput	onSubmit={showSuggestions}
							value={phrase}
							readonly={readonly}
							placeholder='Type in address'
							onChange={setPhrase}
							submitLabel={<IconSearch/>}
							onFocus={onAddressInputFocus}
							isPending={isPending}
							/>
			{!!suggestions && <AddressLookupSuggestions 
				suggestions={suggestions}
				onSelect={onSelect}
				error={error}/>}
		</AddressLookupContainer>
	)
}

export default AddressLookup