import React, {useEffect} from 'react'
import '../styles/modal.css'
function Modal({renderCallback, closeCallback}) {
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
	function modalClick(e) {
		if(closeCallback && e.target === e.currentTarget) {
			closeCallback(e)
		}
	}
	return (
		<div className='modal' onClick={modalClick}>
			<div className='modal__body'>{renderCallback()}</div>
		</div>
	)
}

export default Modal;