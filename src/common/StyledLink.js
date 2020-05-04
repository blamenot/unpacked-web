import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
const StyledLinkContents= styled.span`
	display: block;
	position: relative;
	height: 18px;
	margin: 1px 0;
	${({withBackground}) => withBackground 
	&& 'background-color: #191A24;'}
	${({bold}) => bold 
	&& 'font-weight: bold;'}
	padding: 20px;
	line-height: 18px;
	${({left}) => left 
	&& `padding-left: 50px;
		&:after {
			content: "";
			position: absolute;
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
			right: 20px;
			width: 14px;
			height: 14px;
			border-top: 2px solid #FDE74C;
			border-right: 2px solid #FDE74C;
			transform: rotate(45deg);
		}`}
`
export default function({to, children, left, right, withBackground, bold}) {
	return (
	<Link to={to}>
		<StyledLinkContents	left={left}
							right={right}
							withBackground={withBackground}
							bold={bold}>
			{children}
		</StyledLinkContents>
	</Link>
	)
}