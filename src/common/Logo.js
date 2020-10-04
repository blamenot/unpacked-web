import React from 'react'

export default function Logo({scale = 1, color= '#fde84c'}) {
	const style = {
		transform: `scale(${scale})`,
		color
	}
	return (
		<svg style={style} xmlns="http://www.w3.org/2000/svg" width="32" height="32">
			<path fill="none" d="M-1-1h50v50H-1z"/>
				<g>
					<circle cy="16" cx="16" stroke-width="10" stroke="currentColor" fill="none" r="10.5"/>
					<circle cy="16" cx="16" stroke-width="4" stroke="currentColor" fill="none" r="3.5" opacity=".4"/>
					<g id="svgGroup" strokeLinecap="round" transform="matrix(1.3,0.00,0.00,0.8,4,9)" stroke="#000" strokeWidth=".5" fill="#000" opacity=".2" >
						<path d="M 0.028 11.83 L 0.028 0 L 4.06 0 L 4.06 12.18 Q 4.06 15.05 5.369 16.387 Q 6.678 17.724 9.394 17.724 Q 12.124 17.724 13.433 16.387 Q 14.742 15.05 14.742 12.18 L 14.742 0 L 18.704 0 L 18.704 11.83 Q 18.704 16.422 16.45 18.704 Q 14.196 20.986 9.394 20.986 Q 4.55 20.986 2.289 18.704 Q 0.028 16.422 0.028 11.83 Z" vector-effect="non-scaling-stroke"/>
					</g>
				</g>
		</svg>
	)
}