import React from 'react'
import {connect} from 'react-redux'
import Modal from '../common/Modal'
import {offersAddHideModal} from '../actions/offers-add'
import GameFinderInput from './GameFinderInput'
import GameFinderOffers from './GameFinderOffers'

const style = {
	'backgroundColor': 'white',
	'minHeight': '400px',
	'width': '700px',
	'padding': '12px',
	'textAlign': 'initial'
}

function OffersAddModal({onOffersAddHideModal}) {
	const renderCallback = () => (
		<div style={style}>
			<h3>Offer a game</h3>
			<select>
				<option>PS4</option>
				<option>XBOX</option>
			</select>
			<GameFinderInput />
			<div>
				<GameFinderOffers />
			</div>
		</div>
	)
	
	return (
		<Modal renderCallback={renderCallback} closeCallback={onOffersAddHideModal}/>
	)
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	onOffersAddHideModal(){
		dispatch(offersAddHideModal())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(OffersAddModal)