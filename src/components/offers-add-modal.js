import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Modal from '../common/Modal'
import {offersAddHideModal} from '../actions/offers-add'
import GameFinderInput from './GameFinderInput'
import GameFinderOffers from './GameFinderOffers'

const OffersAddContents = styled.div`
	box-sizing: border-box;
	width: 280px;
	min-height: 280px;
	border: 2px solid #FDE74C;
	background-color: #13131D;
`

function OffersAddModal({onOffersAddHideModal}) {
	
	return (
		<Modal closeCallback={onOffersAddHideModal}>
			<OffersAddContents>
				<h3>Offer a game</h3>
				<GameFinderInput />
				<div>
					<GameFinderOffers />
				</div>
			</OffersAddContents>
		</Modal>
	)
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	onOffersAddHideModal(){
		dispatch(offersAddHideModal())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(OffersAddModal)