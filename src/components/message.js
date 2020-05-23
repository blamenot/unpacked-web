import React from 'react'
import {connect} from 'react-redux'
import Avatar from '../common/Avatar'
import styled from 'styled-components'

const MessageContainer = styled.div`
	padding: 10px 20px;
	display: flex;
`
const MessageText = styled.p`
	margin-left: 10px;
	margin-top: 7px;
	word-break: break-word;
`
function Message ({message, user}) {
	if(!user) {
		return <MessageContainer>Loading...</MessageContainer> //TODO perform check earlier
	}
	return (
		<MessageContainer>
			<Avatar pic={user.pic} name={user.name}/>
			<MessageText>
				{message.text} {getStatusSign(message)}
			</MessageText>
		</MessageContainer>
	)
}
function getStatusSign(message) {
	if(message.isUpdating) {
		return String.fromCharCode(8987)
	}
	return String.fromCharCode(10003)
}
const mapStateToProps = ({userCache}, {message}) => {
	return {
		user: userCache.users[message.authorId]
	}
}

export default connect(mapStateToProps)(Message)