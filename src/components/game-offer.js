import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import SubmitToOffer from './submit-to-offer'

const GameOfferContainer = styled.div`
	border: 1px solid #5F606C;
	margin: 10px;
`
const GameOfferUser = styled.div`
	background-color: #21222B;
	padding: 20px;
	box-sizing: border-box;
`
function GameOffer ({gameId, userId, ownerId, user}) {
	if(userId === ownerId){
		return <div>User: {user.name} <small>my offer</small></div>
	}
	return (
		<GameOfferContainer>
			<GameOfferUser>
				{user.name}
			</GameOfferUser>
			<SubmitToOffer ownerId={ownerId} gameId={gameId}/>
		</GameOfferContainer>
	) 
}

const mapStateToProps = ({auth}) => ({
	userId: auth.authData && auth.authData.uid
})
export default connect(mapStateToProps)(GameOffer)