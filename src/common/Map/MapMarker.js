import React from 'react'
import {Marker, Popup } from 'react-leaflet'

export default function MapMarker({position}) {
	return <Marker position={position}>
		<MapPlacePopup/>
	</Marker>
}

function MapPlacePopup() {
	return <Popup>
		Label here!
	</Popup>
}