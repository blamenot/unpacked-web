import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import rootReducer from './rootReducer'

//initial components
import Header from './components/Header'
import Modals from './containers/Modals'
import SubscriptionMessages from './components/subscription-messages'

//pages components
import PageMain from './pages/PageMain'
import PageSearch from './pages/PageSearch'
import PageOffers from './pages/PageOffers'
import PageProfile from './pages/PageProfile'
import PageRegistration from './pages/PageRegistration'
import PageGame from './pages/PageGame'
import PageChats from './pages/PageChats'
import PageChat from './pages/PageChat'
import PageNotFound from './pages/PageNotFound'

import {
	PATH_TAB_LIST,
	PATH_TAB_LOCATION,
	PATH_PAGE_SEARCH,
	PATH_PAGE_PROFILE,
	PATH_PAGE_OFFERS,
	PATH_PAGE_REGISTRATION,
	PATH_PAGE_GAME,
	PATH_PAGE_CHATS,
	PATH_PAGE_CHAT,
} from './constants/paths'


const store = createStore(
	rootReducer,
    undefined,
    applyMiddleware(thunk)
);
export default function() {
	return (
    <Provider store={store}>
      <BrowserRouter>
        <Route component={Header} />
          <Switch>
            <Route exact path="/" component={PageMain} />
            <Route exact path={PATH_PAGE_SEARCH} component={PageSearch} />
            <Route exact path={PATH_PAGE_OFFERS} component={PageOffers} />
            <Route exact path={PATH_PAGE_PROFILE} component={PageProfile} />
            <Route exact path={PATH_PAGE_REGISTRATION} component={PageRegistration} />

            <Route exact path={PATH_PAGE_GAME} component={PageGame} />
            <Route	exact
                path={PATH_PAGE_GAME + '/' + PATH_TAB_LIST} 
                render={routeProps => <PageGame {...routeProps} activeTab={PATH_TAB_LIST}/>} />
            <Route	exact
                path={PATH_PAGE_GAME + '/' + PATH_TAB_LOCATION} 
                render={routeProps => <PageGame {...routeProps} activeTab={PATH_TAB_LOCATION}/>} />

            <Route exact path={PATH_PAGE_CHATS} component={PageChats} />
            <Route exact path={PATH_PAGE_CHAT} component={PageChat} />
            <Route component={PageNotFound} />
          </Switch>
        <Modals/>
      </BrowserRouter>
      <SubscriptionMessages />
    </Provider>
	)
}