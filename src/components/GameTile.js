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
  overflow: hidden;
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
	background-color: black;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  word-break: break-word;
  overflow: hidden;
`
const GameImgContainer = styled.div`
  border-top: 1px solid white;
  padding-bottom: 8px;
`
const GameIcon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 40px;
	transform: translate(-50%, -50%);
`
function GameTile({game, isBig, onClick}) {
	return (
		<Tile isBig={isBig} onClick={onClick}>
			<div>{game.platform}</div>
			{game.pic && <GameImgContainer><GameImg src={game.pic} alt={game.name}/></GameImgContainer> }
			{game.icon && <GameIcon>{game.icon}</GameIcon>}
		</Tile>
	)
}
export default GameTile