import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {
	PATH_PAGE_SEARCH,
	PATH_PAGE_CHATS
} from '../constants/paths'
const FooterContainer = styled.footer`
	margin: 20px;
	padding: 12px 0;
	border-top: 1px solid #454651;
	font-size: 12px;
	line-height: 24px;
	text-align: center;
	text-transform: uppercase;
	grid-row-start: 3;
  	grid-row-end: 4;
`
const FooterCopyryight = styled.div`
	margin-top: 12px;
	line-height: 12px;
	color:#5F606C;
	text-transform: none;
`
function Footer() {
	return (
		<FooterContainer>
			<div>
				<Link to={PATH_PAGE_SEARCH}>Find games</Link>
			</div>
			<div>
				<Link to={PATH_PAGE_CHATS}>Deals</Link>
			</div>
			<FooterCopyryight>
				Unpacked 2020. All rights reserved.
			</FooterCopyryight>
		</FooterContainer>
	)
}
export default Footer;