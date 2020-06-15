import React from 'react'
import Message from './Message'
import Clause from './clause'
export default function MessagesListBody({messages, clauses, chatId}) {
	const unsortedCommunications = [...messages, ...objectToArrayWithIds(clauses)]
	const communications = unsortedCommunications.sort((a, b) => {
			return a.sendDate - b.sendDate
		})
	return communications.map(communication => {
		if(communication.chatId !== chatId) {
			return null
		}
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