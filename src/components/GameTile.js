import React from 'react'
import styled from 'styled-components'
const Tile = styled.div`
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	flex-shrink: 0;
	background-color: #154ea3;
	border #3b64b1 solid 2px;
	border-radius: 3px;
	color: white;
	text-align: left;
	font-size: 12px;
	height: 88px;
	width: 66px;
	${({isBig}) => isBig && `
		height: 264px;
		width: 198px;
		border-width: 4px;
		border-radius: 6px;
		font-size: 16px;
	`}
`
const GameImg = styled.img`
	display: block;
	border-top: 1px solid white;
	background-color: black;
	padding-bottom: 10%;
	width: 100%;
	text-align: center;
`
const GameIcon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`
function GameTile({game, isBig, onClick}) {
	return (
		<Tile isBig={isBig} onClick={onClick}>
			<div>{game.platform}</div>
			{game.pic && <GameImg src={game.pic} alt={game.name}/>}
			{game.icon && <GameIcon>{game.icon}</GameIcon>}
		</Tile>
	)
}
export default GameTile