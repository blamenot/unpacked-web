import {useRouteMatch} from "react-router-dom";
import {
	PATH_PAGE_PROFILE,
	PATH_PAGE_SEARCH,
	PATH_PAGE_OFFERS,
	PATH_PAGE_REGISTRATION,
	PATH_PAGE_GAME,
	PATH_PAGE_CHATS,
	PATH_PAGE_CHAT,
} from '../constants/paths'

function HeaderPage() {
	let pageName = '';
	if(useRouteMatch(PATH_PAGE_PROFILE)) {
		pageName = 'Profile'
	}
	if(useRouteMatch(PATH_PAGE_SEARCH)) {
		pageName = 'Find games'
	}
	if(useRouteMatch(PATH_PAGE_OFFERS)) {
		pageName = 'My games'
	}
	if(useRouteMatch(PATH_PAGE_REGISTRATION)) {
		pageName = 'Registration'
	}
	if(useRouteMatch(PATH_PAGE_GAME)) {
		pageName = 'Find games'
	}
	if(useRouteMatch(PATH_PAGE_CHATS)) {
		pageName = 'Deals'
	}
	if(useRouteMatch(PATH_PAGE_CHAT)) {
		pageName = 'Deals'
	}
	return pageName
}
export default HeaderPage