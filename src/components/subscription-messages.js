import {useEffect} from 'react'
import {connect} from 'react-redux'
import {
	messageCacheSubscribeRequest,
	messageCacheUnsubscribe
} from '../actions/message-cache'

function SubscriptionMessages ({userId, messagesUnsubscribe, onMessagesSubscribe, onMessagesUnsubscribe}) {
	useEffect(() => {
		if(userId && !messagesUnsubscribe) {
			onMessagesSubscribe(userId)
		}
		if(!userId && messagesUnsubscribe) {
			onMessagesUnsubscribe(messagesUnsubscribe)
		}
	})
	return null
}
const mapStateToProps = ({auth, messageCache}) => {
	return {
	userId: auth.authData && auth.authData.uid,
	messagesUnsubscribe: messageCache.messagesUnsubscribe
}}
const mapDispatchToProps = dispatch => ({
	onMessagesSubscribe(userId) { //TODO create global subscribe
		dispatch(messageCacheSubscribeRequest(userId))
	},
	onMessagesUnsubscribe(messagesUnsubscribe) {
		dispatch(messageCacheUnsubscribe(messagesUnsubscribe))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionMessages)