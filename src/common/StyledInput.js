import React from 'react'
import styled from 'styled-components'
const StyledInputContainer = styled.form`
	display: flex;
	height: 50px;
	line-height: 50px;
	margin: 16px 0;
	padding-left: 15px;
	background-color: #191A24;
	position: relative;
`
const StyledInputIconContainer = styled.span`
	width: 30px;
	> * {
		vertical-align: middle;
	}
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
	onSubmit = (e) => e.preventDefault(),
	submitLabel = null,
	icon = null,
	placeholder = 'type in value',

}) {
	return (
		<StyledInputContainer onSubmit={e => {
			e.preventDefault()
			onSubmit && onSubmit(value)
		}}>
			<StyledInputIcon icon={icon}/>
			<StyledInputElement	type="text"
								value={value}
								onChange={e => onChange(e.target.value)}
								placeholder={placeholder}/>
			<StyledInputSubmit submitLabel={submitLabel}/>
		</StyledInputContainer>
	)
}

export default StyledInput