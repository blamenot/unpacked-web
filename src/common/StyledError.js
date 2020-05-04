import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.span`
	display: inline-flex;
	height: 100%;
	width: 100%;
`
const ErrorContents = styled.pre`
	padding: 10px;	
`
function StyledError({error}) {
	const errorText = (error && error.toString && error.toString()) || error || 'Error happened'
	return (
		<ErrorContainer>
			<ErrorContents>{errorText}</ErrorContents>
		</ErrorContainer>
	)
}
export default StyledError