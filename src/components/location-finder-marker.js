import React from 'react'
import {connect} from 'react-redux'
import { Marker, Popup } from 'react-leaflet'

function LocationFinderMarker ({position, name}) {
	if(!position[0] || !position[1]) {
		return (
			<Marker position={[55.7558, 37.6173]}>
				<Popup>
					{'Unknown position ' + name }
				</Popup>
			</Marker>
		)
	}
	return (
		<Marker position={position}>
			<Popup>
				{name}
			</Popup>
		</Marker>
	)
}

const mapStateToProps = ({statePart}) => ({
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationFinderMarker)