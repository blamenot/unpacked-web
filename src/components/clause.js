import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Avatar from '../common/Avatar'
import StyledButton from '../common/StyledButton'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'
import {
	CLAUSE_STATUS_SUGGESTED,
	CLAUSE_STATUS_REJECTED,
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
import {clauseCacheUpdateStatusRequest} from '../actions/clause-cache'
const ClauseContainer = styled.div`
	padding: 10px 20px;
`
const ClauseControlsContainer = styled.div`
	display: flex;
	margin: 0 -10px
`
const ClauseMessage = styled.p`
	margin: 0;
	line-height: 32px;
	word-break: break-word;
`
const ClauseBody = styled.div`
	display: flex;
`
const ClauseDescription = styled.div`
	margin-left: 10px;
`
const ClauseGameContainer = styled.div`
	display: flex;
`
const ClauseGameInfo = styled.div`
	padding-left: 10px;
	line-height: 41px;
`
const ClauseGameName = styled.h4`
	margin: 0;
	padding; 0;
`
const ClauseGamePlatform = styled.p`
	margin:0;
	padding: 0;
`
function ClauseControls({userId, clause, acceptClause, rejectClause}) {
	if(clause.respondentId === userId && clause.status === CLAUSE_STATUS_SUGGESTED) {
		return (
			<ClauseControlsContainer>
				<StyledButton onClick={acceptClause}>Accept</StyledButton>
				<StyledButton onClick={rejectClause} reject>Reject</StyledButton>
			</ClauseControlsContainer>
		)
	}
	if(clause.status === CLAUSE_STATUS_ACCEPTED || clause.status === CLAUSE_STATUS_SUGGESTED) {
		return (
			<ClauseControlsContainer>
				<StyledButton onClick={rejectClause} reject>Reject</StyledButton>
			</ClauseControlsContainer>
		)
	}
	return null
}
function ClauseGame({gameId, game}) {
	return (
		<ClauseGameContainer>
			<GameTile gameId={gameId} game={game}/>
			<ClauseGameInfo>
				<ClauseGameName>{game.name}</ClauseGameName>
				<ClauseGamePlatform>{game.platform}</ClauseGamePlatform>
			</ClauseGameInfo>
		</ClauseGameContainer>
	)
}
function ClausePrompt({clause, userId}) {
	if(clause.ownerId === userId) {
		return <ClauseMessage>Asks for</ClauseMessage>
	}
	return <ClauseMessage>Offers</ClauseMessage>
}
function Clause ({clause, userId, user, acceptClause, rejectClause}) {
	if(!user) {
		return <ClauseContainer>Loading... {JSON.stringify(clause)}</ClauseContainer>
	}
	return (
			<ClauseContainer>
				<ClauseBody>
					<Avatar pic={user.pic} name={user.name}/>
					<ClauseDescription>
						<ClausePrompt clause={clause} userId={userId}/>
						<GameLoader gameId={clause.gameId} Component={ClauseGame}/>
					</ClauseDescription>
				</ClauseBody>
				<ClauseControls	userId={userId}
								clause={clause}
								acceptClause={acceptClause}
								rejectClause={rejectClause}/>
			</ClauseContainer>
	)
}

const mapStateToProps = ({auth, userCache}, {clause}) => ({
	user: userCache.users[clause.suggesterId],
	userId: auth.authData && auth.authData.uid
})
const mapDispatchToProps = (dispatch, {clauseId}) => ({
	acceptClause() {
		dispatch(clauseCacheUpdateStatusRequest(clauseId, CLAUSE_STATUS_ACCEPTED))
	},
	rejectClause() {
		dispatch(clauseCacheUpdateStatusRequest(clauseId, CLAUSE_STATUS_REJECTED))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Clause)