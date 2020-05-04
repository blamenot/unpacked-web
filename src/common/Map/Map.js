import React, {useState, useEffect} from 'react'
import {Map as LeafletMap, TileLayer} from 'react-leaflet'
import {useDebounce} from 'use-debounce'
import L from 'leaflet'
import MapMarker from './MapMarker'
import styled from 'styled-components'

const MapContainer = styled.div`
	position: relative;
	width: 100%;
	opacity: 0.99;
`

function Map({points = []}) {
	const [style, setStyle] = useState(null)
	const [debouncedStyle] = useDebounce(style, 2000);
	const refContainer = React.createRef({})
	useEffect(() => {
		const containerEl = refContainer.current
		function updateStyle() {
			const width = containerEl.offsetWidth
			const height = window.innerHeight - 70
			if(style && style.width === width && style.height === height) {
				return
			}
			setStyle({
				position: 'fixed',
				width,
				height,
			})
		}
		if(containerEl && !style) {
			updateStyle()
			window.onresize = updateStyle //AddEventListener not used to prevent massive memofy leak
		}
	}, [refContainer, style, debouncedStyle])
	return (
		<MapContainer ref={refContainer}>
			<MapPane style={debouncedStyle} points={points} />
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

