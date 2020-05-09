import React from 'react'
import styled from 'styled-components'
const StyledInputContainer = styled.form`
	display: flex;
	height: 20px;
	line-height: 20px;
	margin: 16px 0;
	padding: 15px;
	background-color: #191A24;
	position: relative;
`
const StyledInputIconContainer = styled.span`
	width: 30px;
`
const StyledInputElement = styled.input`
	flex-grow: 1;
	background: none;
	border: none;
	outline: none;
	::placeholder {
		color: #454651;;
	}
`
const StyledInputButton = styled.button`
	background: none;
	border: none;
	color: white;
`
function StyledInputIcon({icon}) {
	if(!icon) {
		return null
	}
	return <StyledInputIconContainer>{icon}</StyledInputIconContainer>
}
function StyledInputSubmit({submitLabel}) {
	if(submitLabel) {
		return null
	}
	return(
		<StyledInputButton type='submit'>{submitLabel}</StyledInputButton>
	)
}
function StyledInput({
	value,
	onChange,
	onSubmit = (e) => e.preventDefault,
	submitLabel = null,
	icon = null,
	placeholder = 'type in value',

}) {
	return (
		<StyledInputContainer onSubmit={onSubmit}>
			<StyledInputIcon icon={icon}/>
			<StyledInputElement value={value} onChange={onChange} type="text" placeholder={placeholder}/>
			<StyledInputSubmit submitLabel={submitLabel}/>
		</StyledInputContainer>
	)
}

export default StyledInput