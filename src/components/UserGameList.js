import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom"
import {PATH_PAGE_SEARCH} from '../constants/paths'
import UserGame from './UserGame'
import styled from 'styled-components'

const UserGameListEmpty = styled.p`
	margin 16px 20px;
`

const UserGameListSearchLink = styled(Link)`
	text-transform: none;
	text-decoration: underline;
`

function UserGameList({gameIds, ownerId, isSelf}) {
	if(!gameIds || Object.values(gameIds).length === 0) {
		if(isSelf) {
			return (<UserGameListEmpty>
					Please add games you would like to sell/exchange or <UserGameListSearchLink to={PATH_PAGE_SEARCH}>search other member's games</UserGameListSearchLink>
				</UserGameListEmpty>)
		}
		return <UserGameListEmpty>Game list is empty...</UserGameListEmpty>
	}
	const renderedOffers = []
		for(let gameId of gameIds) {
		renderedOffers.push(<UserGame gameId={gameId} key={gameId} ownerId={ownerId}/>)
	}
	return renderedOffers
}

const mapStateToProps = ({auth}, {ownerId}) => ({
	isSelf: auth.authData && auth.authData.uid === ownerId
})

export default connect(mapStateToProps)(UserGameList)