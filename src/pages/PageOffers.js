import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {userCacheFetchUserByIdRequest} from '../actions/user-cache' 
import {PATH_PAGE_OFFERS} from '../constants/paths'
import OffersAdd from '../components/OffersAdd'
import UserGameList from '../components/user-game-list'

function PageOffers({history, match, authData, wait, user, onUserCacheFetchUserByIdRequest}) {
	useEffect(() => {
		if(authData && match.params.userId) {
			onUserCacheFetchUserByIdRequest(match.params.userId)
		} else if (authData && !match.params.userId) {
			history.push(PATH_PAGE_OFFERS.replace(':userId', authData.uid))
		}
	}, [authData, onUserCacheFetchUserByIdRequest, match.params.userId, history])
	
	if(wait) {
		return (<div>Wait...</div>)
	} else if (user) {
		const isSelf = match.params.userId === authData?.uid
		return (
			<div>
				{isSelf && <OffersAdd />}
				<UserGameList gameIds={user.offerIds} ownerId={match.params.userId}/>
			</div>
		)
	} else {
		return false
	}
}

const mapStateToProps = ({auth, userCache}, {match}) => ({
	authData: auth.authData,
	wait: userCache.userByIdWait,
	user: userCache.users[match.params.userId]

})
const mapDispatchToProps = dispatch => ({
	onUserCacheFetchUserByIdRequest(userId) {
		return dispatch(userCacheFetchUserByIdRequest(userId))
	} 
})
export default connect(mapStateToProps, mapDispatchToProps)(PageOffers)