import React from 'react'
import styled from "styled-components";
const StyledButtonContainer = styled.span`
	display: ${props => props.wide ? 'block' : 'inline-block'};
	margin: 10px;
`
const StyledButtonContents = styled.button`
	box-sizing: border-box;
	border: 2px solid #FDE74C;
	background: none;
	height: 48px;
	text-transform: uppercase;
	font-family: 'Montserrat', sans-serif;
	font-size: 12px;
	line-height: 18px;
	padding: 14px;
	color: white;
	width: 100%;
`
export default function ({wide = false, children}) {
	return (
		<StyledButtonContainer wide={wide}>
			<StyledButtonContents >{children}</StyledButtonContents>
		</StyledButtonContainer>
	)
}