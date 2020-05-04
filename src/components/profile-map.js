import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Map from '../common/Map/Map'
const MapContainer = styled.div`
	height: 500px;
	width: 500px;
`
function getLocationAndPlaceLabel(user, updatedUser) {
	if(updatedUser && (typeof(updatedUser.longitude) === 'number') && (typeof(updatedUser.longitude) ===  'number')) {
		return [[updatedUser.latitude, updatedUser.longitude], 'Selected locaction']
	}
	if(user && (typeof(user.longitude) ===  'number') && (typeof(user.longitude) ===  'number')) {
		return [[user.latitude, user.longitude], 'Saved location']
	}
	//TODO Show selected city longitude
	return [[55.7558, 37.6173], 'Unselected, please specify your location']
}
function ProfileMap ({user, updatedUser, isSelf, wait}) {
	//TODO wait for authorized user object. do not show this component when user is abscent.
	const [position, label] = getLocationAndPlaceLabel(user, updatedUser)
	return (
		<MapContainer>
			<Map position={position} points={[{id:0, position, label}]}/>
		</MapContainer>
	)
}
const mapStateToProps = ({userCache, auth, userUpdate}, {userId}) => ({
	user: userCache.users[userId],
	updatedUser: userUpdate.user,
	isSelf: auth.authData.uid === userId,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})

export default connect(mapStateToProps)(ProfileMap)