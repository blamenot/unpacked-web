import React from 'react'
import {connect} from 'react-redux'

function LocationFinderInput () {
	return <input 
			type="text" 
			placeholder="Type in the adderss"/>
}

const mapStateToProps = ({statePart}) => ({
})
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationFinderInput)