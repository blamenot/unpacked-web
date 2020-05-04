import React from 'react'
import styled from 'styled-components'

const WaitContainer = styled.span`
	display: inline-flex;
	height: 100%;
	width: 100%;
`
const WaitContents = styled.span`
	margin: auto;
`
function StyledWait() {
	return <WaitContainer><WaitContents>Loading...</WaitContents></WaitContainer>
}
export default StyledWait