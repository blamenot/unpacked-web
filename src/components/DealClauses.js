import React from 'react'
import {connect} from 'react-redux'
import Clause from './clause'

function DealClauses ({chatClauses}) {
	let renderedClauses = []
	for (let clauseId in chatClauses) {
		const renderedClause = <Clause	key={clauseId} 
										clauseId={clauseId}
										clause={chatClauses[clauseId]}/> 
		renderedClauses.push(renderedClause)
	}
	return renderedClauses
}
const mapStateToProps = ({clauseCache}, {chatId}) => {
	let chatClauses = {}
	for(let clauseId in clauseCache.clauses) {
		if(chatId && clauseCache.clauses[clauseId] 
			&& clauseCache.clauses[clauseId].chatId === chatId) {
			chatClauses[clauseId] = clauseCache.clauses[clauseId]
		}
	}
	return {
		chatClauses
	}
}

export default connect(mapStateToProps)(DealClauses)