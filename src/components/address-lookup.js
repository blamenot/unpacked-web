import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {
	addressLookupCacheFetchRequest
} from '../actions/address-lookup-cache'

function AddressLookup ({user, updatedUser, isSelf, wait, onAddressLookup}) {
	const [lookupPhrase, setLookupPhrase] = useState('')
	useEffect(() => {
		if(typeof(updatedUser && updatedUser.place) === 'string') {
			setLookupPhrase(updatedUser.place)
		} else if(user && user.place) {
			setLookupPhrase(user.place)
		}
	},[updatedUser, user])

	function onLookupPhraseChange(e) {
		setLookupPhrase(e.target.value)
	}
	async function onSearch() {
		onAddressLookup(lookupPhrase)
	}
	return (
		<div>
			<input type="text" value={lookupPhrase} onChange={onLookupPhraseChange}/>
			<button type="button" onClick={onSearch}>Search</button>
		</div>
	)
}

const mapStateToProps = ({userCache, auth, userUpdate}, {userId}) => ({
	user: userCache.users[userId],
	updatedUser: userUpdate.user,
	isSelf: auth.authData.uid === userId,
	wait: userCache.userByIdWait || userCache.userUpdateWait
})
const mapDispatchToProps = dispatch => ({
	onAddressLookup(lookupPhrase) {
		dispatch(addressLookupCacheFetchRequest(lookupPhrase))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressLookup)