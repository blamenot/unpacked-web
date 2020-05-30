import React from 'react'
import styled from 'styled-components'
const StyledInputContainer = styled.form`
	display: flex;
	height: 50px;
	line-height: 50px;
	margin: 16px 0;
	padding-left: 15px;
	background-color: #191A24;
	${({readonly}) => readonly && `
		padding-left: 0;
		background: none;
	`}
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
	min-width: 50px;
	background: none;
	color: black;
	background-color: #FDE74C;
	border: none;
`
function StyledInputIcon({icon}) {
	if(!icon) {
		return null
	}
	return <StyledInputIconContainer>{icon}</StyledInputIconContainer>
}
function StyledInputSubmit({submitLabel, readonly}) {
	if(!submitLabel || readonly) {
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
	readonly
}) {
	return (
		<StyledInputContainer	onSubmit={e => {
			e.preventDefault()
			onSubmit && !readonly && onSubmit(value)
		}}
								readonly={readonly}>
			<StyledInputIcon icon={icon}/>
			<StyledInputElement	type="text"
								value={value}
								onChange={e => onChange(e.target.value)}
								placeholder={placeholder}
								readonly={readonly}/>
			<StyledInputSubmit submitLabel={submitLabel} readonly={readonly}/>
		</StyledInputContainer>
	)
}

export default StyledInput