import React from 'react'
import {connect} from 'react-redux'
import { Map, TileLayer} from 'react-leaflet'
import LocationFinderMarker from './location-finder-marker'
const style = {
	width: '500px',
	height: '500px'
}

function LocationFinderMap ({user, users}) {
	return (<Map center={[55.7558, 37.6173]} zoom={10} style={style} scrollWheelZoom={false}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{getMarkers(users)}
		</Map>)
}
function getMarkers(users) {
	return Object.values(users).map(user => (
		<LocationFinderMarker key={user.id} name={user.name} position={[user.latitude, user.longitude]}/>
	))
}

const mapStateToProps = ({auth, userCache}, {games}) => {
	const userId = auth.authData && auth.authData.uid
	let users = {}
	for(let gameId in games) {
		for(let userId in userCache.users) {
			let user = userCache.users[userId]
			if(user && user.offerIds && user.offerIds.indexOf(gameId) >= 0) {
				users[userId] = user
				break
			}
		}
	}
	return {
		authData: auth.authData,
		user: userCache.users[userId],
		users: users
	}
}
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationFinderMap)