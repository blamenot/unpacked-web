import {useEffect} from 'react'

function PageMain() {
	useEffect(()=>{
		window.mainPageEl.removeAttribute('style');
		window.rootEl.setAttribute('style', 'min-height: auto;')
		return () => {
			window.mainPageEl.setAttribute('style', 'display:none;')
			window.rootEl.removeAttribute('style');
		}
	})
	return null;
}

export default PageMain