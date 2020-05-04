import React from 'react'
import UserGame from './user-game'

function UserGameList({gameIds, ownerId}) {
	
	if(gameIds && Object.values(gameIds > 0)) { //List not empty
		const renderedOffers = []
			for(let gameId of gameIds) {
			renderedOffers.push(<UserGame gameId={gameId} key={gameId} ownerId={ownerId}/>)
		}
		return renderedOffers
	}
	return <h3>Game list is empty...</h3>
}

export default UserGameList