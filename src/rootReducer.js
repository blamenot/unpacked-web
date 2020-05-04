import {combineReducers} from 'redux'

import offersAdd from './reducers/offers-add'
import auth from './reducers/auth'
import gameFinder from './reducers/game-finder'
import gameCache from './reducers/game-cache'
import offerFinder from './reducers/offer-finder'
import userCache from './reducers/user-cache'
import chatCache from './reducers/chat-cache'
import clauseCache from './reducers/clause-cache'
import addressLookupCache from './reducers/address-lookup-cache'
import userUpdate from './reducers/user-update'
import messageCache from './reducers/message-cache'

export default combineReducers({
    offersAdd,
    auth,
    gameFinder,
    gameCache,
    offerFinder,
    userCache,
    chatCache,
    clauseCache,
    addressLookupCache,
    userUpdate,
    messageCache
})