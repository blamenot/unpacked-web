import React from 'react'
import Message from './message'
import Clause from './clause'
export default function MessagesListBody({messages, clauses}) {
	const unsortedCommunications = [...messages, ...objectToArrayWithIds(clauses)]
	console.log('render')
	const communications = unsortedCommunications.sort((a, b) => {
			return a.sendDate - b.sendDate
		})
	return communications.map(communication => {
		if(communication.gameId) {
			return <Clause key={communication.id} clauseId={communication.id} clause={communication}/>
		}
		return <Message key={communication.id} message={communication} />
	})
}
function objectToArrayWithIds(list) { //TODO move to utilities
	let listArray = []
	for(let id in list) {
		listArray.push({
			id,
			...list[id]
		})
	}
	return listArray
}