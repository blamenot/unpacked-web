import React from 'react'
import styled from 'styled-components'

const ListContainer = styled.ul`
	position: absolute;
	background-color: white;
	color: black;
	z-index: 1;
	list-style: none;
	margin: 0;
	padding: 20px;
	top: 48px; 
	left: 0px;
`
const ItemContainer = styled.li`
	cursor: pointer;
	&:hover {
		background-color: grey;
	}
`
function AddressLookupSuggestions({suggestions, onSelect}) {
	const addressLookupSuggestions = suggestions.map( suggestion => (
		<ItemContainer	key={suggestion.place_id} 
						suggestion={suggestion}
						onClick={() => onSelect(suggestion)}
		>{suggestion.display_name}</ItemContainer>
	))
	return (
		<ListContainer>
			{addressLookupSuggestions}
		</ListContainer>
	)
}

export default AddressLookupSuggestions