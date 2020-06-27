import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
	PATH_PAGE_REGISTRATION,
	PATH_PAGE_PROFILE
} from '../constants/paths'
import useUser from '../hooks/useUser'

function HeaderProfileName({authData, unregistered}) {
	const [userFetchnig, user] = useUser(authData.uid)
	const name = (user && user.name) || authData.displayName
	const path = (unregistered 
		? PATH_PAGE_REGISTRATION 
		: PATH_PAGE_PROFILE.replace(':uid', authData.uid))
	return (
		<Link to={path}>{name}</Link>
	)
}

const mapStateToProps = ({auth, userCache}) => {
	const userId = auth.authData && auth.authData.uid
	return {
		authData: auth.authData,
		unregistered: userCache.users[userId] === null,
	}
}

export default connect(mapStateToProps)(HeaderProfileName) 