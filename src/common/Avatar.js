import React from 'react'
import styled from 'styled-components'
const styleAvatarShape = `
	display: inline-block;
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	overflow: hidden;
	border-radius: 50%;
	background-color: #454651;
`
const AvatarImg = styled.img`
	${styleAvatarShape}
`
const AvatarInitials = styled.label`
	${styleAvatarShape}
`
function Avatar({pic, name}) {
	const initials = name
		.split(/\s+/)
		.reduce((initials, namePart) => initials + namePart.charAt(0).toUpperCase(), '')
	if(pic) {
		return <AvatarImg src={pic} title={name} alt={initials}/>
	}
	return <AvatarInitials title={name}>{initials}</AvatarInitials>
}
export default Avatar