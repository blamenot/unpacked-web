import React, {useState} from 'react'
import styled from 'styled-components'
import AddressLookupSuggestions from './AddressLookupSuggestions'
const AddressLookupContainer = styled.form`
	display: flex;
	height: 48px;
	margin: 16px 0;
	padding-left: 43px;
	background-color: #191A24;
	position: relative;
`
const AddressLookupInput = styled.input`
	flex-grow: 1;
	background: none;
	border: none;
	outline: none;
	color: white;
	::placeholder {
		color: #454651;;
	}
`
const AddressLookupSubmit = styled.input`
	background: none;
	border: none;
	color: white;
`

function AddressLookup({onLookup}) {
	const [phrase, setPhrase] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [error, setError] = useState(null)
	async function showSuggestions(e) {
		e.preventDefault()
		setSuggestions([])
		actualPhrase.phrase = phrase
		const [fetchedSuggestions, fetchedPhrase, error] = await getSuggestions(phrase)
		if(fetchedPhrase === actualPhrase.phrase) {
			setSuggestions(fetchedSuggestions)
			setError(error)
		}
	}
	function onSelect(suggestion) {
		setPhrase(suggestion.display_name)
		setSuggestions([])
		onLookup && onLookup(suggestion)
	}
	const renderedSuggestions = (!!suggestions.length 
		&& <AddressLookupSuggestions suggestions={suggestions} onSelect={onSelect}/>)
	return (
		<AddressLookupContainer onSubmit={showSuggestions}>
			<AddressLookupInput type="text"
								placeholder="type in the address"
								onChange={e => setPhrase(e.target.value)}
								value={phrase}/>
			<AddressLookupSubmit type="submit" value="search" />
			{renderedSuggestions}
			{error}
		</AddressLookupContainer>
	)
}

const actualPhrase = {phrase: ''}; //do I need to use memo?
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

export default AddressLookup