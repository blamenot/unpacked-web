import React from 'react'
import styled from "styled-components";

const StyledButton = styled.button`
	box-sizing: border-box;
	border: 2px solid #FDE74C;
	color: white;
	${props => props.reject && `
		border-color: #AD2031;
		color: #AD2031;
	`}
	font-weight: bold;
	background: none;
	line-height: 46px;
	${props => props.wide && 'width: 100%;'};
	flex-grow: 1;
	cursor: pointer;
	padding: 0;
`
export default function ({ children, ...props}) {
	return <StyledButton{...props}>{children}</StyledButton>
}