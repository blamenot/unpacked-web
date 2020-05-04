import React from 'react';
import {connect} from 'react-redux'

import AuthModal from './auth-modal'
import OffersAddModal from './offers-add-modal'

class Modals extends React.PureComponent {
	render() {
		if (this.props.authModalShown) {
			return <AuthModal />
		} else if (this.props.offersAddModalShown) {
			return <OffersAddModal />
		}
		return null
	}
}

const mapStateToProps = ({auth, offersAdd}) => ({
	authModalShown: auth.authModalShown,
	offersAddModalShown: offersAdd.modalShown
})
export default connect(mapStateToProps)(Modals)