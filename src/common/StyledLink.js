import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
const StyledLinkContents= styled.span`
	display: block;
	position: relative;
	margin: 1px 0;
	${({withBackground}) => withBackground 
	&& 'background-color: #191A24;'}
	${({bold}) => bold 
	&& 'font-weight: bold;'}
	padding: 0 20px;
	line-height: 50px;
	${({left}) => left 
	&& `padding-left: 50px;
		&:after {
			content: "";
			position: absolute;
			top: 15px;
			left: 20px;
			width: 14px;
			height: 14px;
			border-left: 2px solid #FDE74C;
			border-bottom: 2px solid #FDE74C;
			transform: rotate(45deg);
		}`}
	${({right}) => right 
	&& `padding-right: 50px;
		&:after {
			content: "";
			position: absolute;
			top: 15px;
			right: 20px;
			width: 14px;
			height: 14px;
			border-top: 2px solid #FDE74C;
			border-right: 2px solid #FDE74C;
			transform: rotate(45deg);
		}`}
	${({down}) => down
	&& `padding-right: 50px;
		&:after {
			content: "";
			position: absolute;
			top: 15px;
			right: 20px;
			width: 12px;
			height: 12px;
			border-bottom: 2px solid #FDE74C;
			border-right: 2px solid #FDE74C;
			transform: rotate(45deg);
		
		}`}
	${({up}) => up
	&& `padding-right: 50px;
		&:after {
			content: "";
			position: absolute;
			top: 15px;
			right: 20px;
			width: 12px;
			height: 12px;
			border-top: 2px solid #FDE74C;
			border-left: 2px solid #FDE74C;
			transform: rotate(45deg);
		
		}`} 
`
export default function({to, children, left, right, down, up, withBackground, bold}) {
	return (
	<Link to={to}>
		<StyledLinkContents	left={left}
							right={right}
							down={down}
							up={up}
							withBackground={withBackground}
							bold={bold}>
			{children}
		</StyledLinkContents>
	</Link>
	)
}