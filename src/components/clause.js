import React from 'react'
import {connect} from 'react-redux'
import GameLoader from '../containers/GameLoader'
import GameTile from './GameTile'
import {
	CLAUSE_STATUS_REJECTED,
	CLAUSE_STATUS_ACCEPTED
} from '../constants/clause-statuses'
import {clauseCacheUpdateStatusRequest} from '../actions/clause-cache'
function Clause ({clauseId, clause, userId, acceptClause, rejectClause}) {
	return (
		<div>
			<GameLoader gameId={clause.gameId} Component={GameTile}/>
			{
				((clause.respondentId === userId && (clause.status !== CLAUSE_STATUS_ACCEPTED))
					&& <button onClick={acceptClause}>accept</button>)
			}
			<button onClick={rejectClause}>reject</button>
		</div>
	)
}

const mapStateToProps = ({auth}) => ({
	userId: auth.authData && auth.authData.uid
})
const mapDispatchToProps = (dispatch, {clauseId, clause}) => ({
	acceptClause() {
		dispatch(clauseCacheUpdateStatusRequest(clauseId, {
			...clause,
			status: CLAUSE_STATUS_ACCEPTED
		}))
	},
	rejectClause() {
		dispatch(clauseCacheUpdateStatusRequest(clauseId, {
			...clause,
			status: CLAUSE_STATUS_REJECTED
		}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Clause)