import React, {useEffect} from 'react'
import styled from 'styled-components'
const ListContainer = styled.ul`
	position: absolute;
	background-color: #13131D;
	width: 100%;
	color: white;
	opacity: .95;
	z-index: 1;
	list-style: none;
	margin: 0;
	padding: 0 20px;
	top: 50px; 
	left: -20px;
`
const ItemContainer = styled.li`
	padding: 15px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: default;
`
const SelectableItemContainer = styled(ItemContainer)`
	cursor: pointer;
	&:hover {
		background-color: grey;
	}
`

function AddressLookupSuggestions({suggestions, onSelect, error}) {
	useEffect(() => {
		function closeSuggestions() {
			onSelect(null)
		}
		window.addEventListener('click', closeSuggestions)
		return () => window.removeEventListener('click', closeSuggestions)
	},[onSelect])
	const addressLookupSuggestions = suggestions && suggestions.map( suggestion => (
		<SelectableItemContainer	key={suggestion.id} 
						suggestion={suggestion}
						onClick={() => onSelect(suggestion)}
		>
			{suggestion.place_name}
		</SelectableItemContainer>
	))

	return (
		<ListContainer>
			{!!error && <ItemContainer>{'Search failed: ' + error}</ItemContainer>}
			{addressLookupSuggestions}
			{!suggestions?.length && !error && <ItemContainer>Not found</ItemContainer>}
		</ListContainer>
	)
}

export default AddressLookupSuggestions