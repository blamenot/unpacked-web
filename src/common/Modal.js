import React, {useEffect} from 'react'
import styled from 'styled-components'

const ModalMask = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.8);
	text-align: center;
`
const ModalBody = styled.div`
	display: inline-block;
	box-sizing: border-box;
	padding: 2rem;
	max-width: 100%;
	overflow: auto;
`

function Modal({closeCallback, children}) {
	//Fix body to prevent background scrolling;
	useEffect(() => {
		if(window.scrollY) {
			document.body.style.top = `-${window.scrollY}px`
		}
		document.body.style.width = '100%'
		document.body.style.position = 'fixed'
		
		return function() {
			const top = document.body.style.top
			if(top) {
				window.scrollTo(0, parseFloat(top.replace('-', '').replace('px', '')));
				document.body.style.top = ''
			}
			document.body.style.width = ''
			document.body.style.position = ''
		}
	})
	//Subscribe ESC close 
	useEffect(() => {
		function closeByEsc(e) {
			(e.key === "Escape") && closeCallback && closeCallback(e)
		}
		document.addEventListener('keyup', closeByEsc)

		return function() {
			document.removeEventListener('keyup', closeByEsc)
		}
	})

	/**
	 * Handles click event:
	 *  if clicked on modal mask tries to close the modal
	 * @param {Event} e click event
	 */
	function maskClick(e) {
		if(closeCallback && e.target === e.currentTarget) {
			closeCallback(e)
		}
	}
	return (
		<ModalMask onClick={maskClick}>
			<ModalBody>{children}</ModalBody>
		</ModalMask>
	)
}

export default Modal;