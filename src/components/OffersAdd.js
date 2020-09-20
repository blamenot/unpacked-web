import React from 'react'
import {connect} from 'react-redux'
import GameTile from './GameTile'
import {offersAddShowModal} from '../actions/offers-add'

function OffersAdd({onOffersAddShowModal}) {
	const game = {
		platform: 'PS4',
		name: 'Add game',
		icon: '+',
	}

	return <div className='offer'><GameTile game={game} onClick={onOffersAddShowModal} /></div>
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	onOffersAddShowModal(user) {
		dispatch(offersAddShowModal(user))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersAdd)