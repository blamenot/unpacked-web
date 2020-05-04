import React from 'react'
import {connect} from 'react-redux'
import GameTile from './GameTile'
import {offersAddShowModal} from '../actions/offers-add'

function OffersAdd({onOffersAddShowModal}) {
	const game = {
		platform: 'platform',
		name: 'Add game',
		icon: '+',
	}

	return <GameTile game={game} onClick={onOffersAddShowModal} />
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	onOffersAddShowModal(user) {
		dispatch(offersAddShowModal(user))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(OffersAdd)