import React, {useState, useEffect, useCallback, useRef} from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MapMarker from './MapMarker'
import styled from 'styled-components'

const MapContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	opacity: 0.99;
`

function Map({points = []}) {
	const [style, setStyle] = useState(null)
	const containerRef = useRef(null)
	const updateStyles = useCallback(containerEl => {
		if(containerEl) {
			setStyle({
				width: containerEl.offsetWidth,
				height: containerEl.offsetHeight,
				position: 'absolute',
			})
		}
	}, [])
	const getContainerRef = useCallback(containerEl => {
		updateStyles(containerEl);
		containerRef.current = containerEl
	}, [updateStyles])
	useEffect(() => {
		const onResizeUpdate = () => {
			updateStyles(containerRef.current)
		}
		window.addEventListener('resize', onResizeUpdate)
		
		return () => window.removeEventListener('resize', onResizeUpdate)
	}, [containerRef, updateStyles])
	return (
		<MapContainer ref={getContainerRef}>
			<MapPane style={style} points={points} />
		</MapContainer>
	)
}
function MapPane({points, style}) {
	if(!points.length || !style) {
		return null
	}
	const center = points[0].position
	const bounds = points.length > 1 ? getBounds(points) : null
	return (
		<LeafletMap	style={style}
			center={center}
			zoom={14}
			scrollWheelZoom={false}
			bounds={bounds}
			boundsOptions={{padding: [10, 10]}}
		>
			<TileLayer
			attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MapMarkers points={points} />
		</LeafletMap>
	)
} 
function MapMarkers({points}) {
	return points.map(point => <MapMarker key={point.id} {...point} />)
}
function getBounds(points) {
	const markers = points.map(point => L.marker(point.position))
	const markersGroup = new L.featureGroup(markers);
	return markersGroup.getBounds()
}
export default Map

