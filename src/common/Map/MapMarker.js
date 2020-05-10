import React from 'react'
import {Marker, Popup } from 'react-leaflet'

export default function MapMarker({position, contents}) {
	return <Marker position={position}>
		<Popup className="point-popup">{contents}</Popup>
	</Marker>
}