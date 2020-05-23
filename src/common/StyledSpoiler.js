import React from 'react'
import styled from 'styled-components'
const StyledSpoilerContainer = styled.div`
	position: relative;
	background-color: #191A24;
`
const StyledSpoilerButton = styled.button`
	border: none;
	color: #FDE74C;
	padding-left: 20px;
	padding-right: 50px;
	text-align: left;
	background: none;
	width: 100%;
	line-height: 40px;
	cursor: pointer;
	&:after {
		content: "";
		position: absolute;
		top: 10px;
		right: 20px;
		width: 12px;
		height: 12px;
		border-bottom: 2px solid #FDE74C;
		border-right: 2px solid #FDE74C;
		transform: rotate(45deg);
	}
	${({toggled}) => toggled
	&& `&:after {
			transform: rotate(225deg);
		}
	`}
`
const StyledSpoilerContents = styled.div`
	display: none;
	position: absolute;
	background-color: inherit;
	width: 100%;
	top: 40px;
	left: 0;
	${({toggled}) => toggled && 'display: block'}
`
export default function({title, toggled, onClick, children}) {
	return (
		<StyledSpoilerContainer>
			<StyledSpoilerButton toggled={toggled} onClick={onClick}>
				{title}
			</StyledSpoilerButton>
			<StyledSpoilerContents toggled={toggled}>
				{children}
			</StyledSpoilerContents>
		</StyledSpoilerContainer>
	)
}