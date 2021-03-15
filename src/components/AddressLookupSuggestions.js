import React, {useEffect} from 'react'
import styled from 'styled-components'
const ListContainer = styled.ul`
  box-sizing: border-box;
	position: absolute;
	background-color: #191A24;
	width: 100%;
	color: white;
  opacity: .95;
  min-height: 45px;
	z-index: 1;
	list-style: none;
	margin: 0;
	padding: 0 20px;
	top: 50px; 
  left: 0px;
`
const ItemContainer = styled.li`
	padding: 15px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  cursor: default;
  ${({center}) => center ? 'text-align: center;' : ''}
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
			{!suggestions?.length && !error && <ItemContainer center>Not found</ItemContainer>}
		</ListContainer>
	)
}

export default AddressLookupSuggestions