import React from 'react'

function GameDummy ({wait, error = 'Game is not in wait or error state'}) {
	if(wait) {
		return (
		<div className="game">
			<div>Wait...</div>
			<div>Loading</div>
		</div>
		)
	} else {
		return (
			<div className="game">
				<div>Error</div>
				<div>{error}</div>
			</div>
		)
	}
}
export default GameDummy