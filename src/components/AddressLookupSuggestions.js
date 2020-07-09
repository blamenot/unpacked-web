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
	cursor: pointer;
	padding: 15px;
	white-space: nowrap;
	overflow: hidden;
    text-overflow: ellipsis;
	&:hover {
		background-color: grey;
	}
`
const ItemSubText = styled.div`
	text-transform: none;
	font-size: 12px;
	color: #5F606C;
	overflow: hidden;
    text-overflow: ellipsis;
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
		<ItemContainer	key={suggestion.id} 
						suggestion={suggestion}
						onClick={() => onSelect(suggestion)}
		>
			{suggestion.text}
			<ItemSubText>{suggestion.place_name}</ItemSubText>
		</ItemContainer>
	))
	return (
		<ListContainer>
			{addressLookupSuggestions}
		</ListContainer>
	)
}

export default AddressLookupSuggestions