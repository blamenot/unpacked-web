import React, {useEffect} from 'react'
import styled from 'styled-components'
const ListContainer = styled.ul`
	position: absolute;
	background-color: #13131D;
	width: 100%;
	color: white;
	opacity: .9;
	z-index: 1;
	list-style: none;
	margin: 0;
	padding: 0 20px;
	top: 50px; 
	left: -20px;
`
const ItemContainer = styled.li`
	cursor: pointer;
	line-height: 50px;
	padding: 0 15px;
	white-space: nowrap;
	overflow: hidden;
    text-overflow: ellipsis;
	&:hover {
		background-color: grey;
	}
`
function AddressLookupSuggestions({suggestions, onSelect}) {
	useEffect(() => {
		function closeSuggestions() {
			onSelect(null)
		}
		window.addEventListener('click', closeSuggestions)
		return () => window.removeEventListener('click', closeSuggestions)
	},[onSelect])
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