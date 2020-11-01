import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux'
import {userUpdateUnsaved} from '../actions/user-update'
import {PS4} from '../constants/platform-types'
import StyledLabel from '../common/StyledLabel'
import StyledInput from '../common/StyledInput'
import StyledCheckbox from '../common/StyledCheckbox'
import Map from '../common/Map/Map'
import AddressLookup  from './AddressLookup'
const MapContainer = styled.div`
	position: relative;
	height: 250px;
	padding-bottom: 16px;
`
const ProfileFormContainer = styled.div`
	padding: 0 20px;
`
export function getValidationErrors(updatedUser) {
	let errors = [];
	if(!updatedUser.name) {
		errors.push('Empty name supplied, please fill.')
	}
	if(!updatedUser.latitude || !updatedUser.longitude || !updatedUser.place) {
		errors.push('Incorrect address , make sure you put in the address, performed search and picked right suggestion.')
	}
	return errors
}

function checkHasPlatform(updatedUser, platformType) {
	return updatedUser?.platforms?.indexOf(platformType) >= 0
}
function ProfileForm({updatedUser, userUpdateUnsaved, readonly}) {
	if(!updatedUser) {
		return null
	}
	function onNameChange(name) {
		userUpdateUnsaved({
			...updatedUser,
			name,
		})
	}
	function onPlatformSelect(platformType) {
		if(checkHasPlatform(updatedUser, platformType)) {
			userUpdateUnsaved({
				...updatedUser,
				platforms: updatedUser.platforms.filter(userPlatfrom => userPlatfrom!==platformType)
			})
			return
		}
		userUpdateUnsaved({
			...updatedUser,
			platforms: updatedUser?.platforms ? [...updatedUser.platforms, platformType] : [platformType]
		})
	}
	function onLocactionChange(suggestion) {
		userUpdateUnsaved({
			...updatedUser,
			place: suggestion.place_name,
			latitude: +suggestion.center[1],
			longitude: +suggestion.center[0],
		})
	}

	const positionDefined = (typeof(updatedUser.latitude)=== 'number' && typeof(updatedUser.longitude)=== 'number')
	const contents = positionDefined ? updatedUser.name : 'Moscow'
	const position = positionDefined ? [updatedUser.latitude, updatedUser.longitude ] : [55.7558, 37.6173]
	return (
		<ProfileFormContainer>
			<StyledLabel>
				Nickame
				<StyledInput	value={updatedUser.name || ''}
								onChange={onNameChange}
								readonly={readonly}/>
			</StyledLabel>
			<StyledLabel>Address
				{ !readonly && (
					<div>
						<small>Please, let us know where it is convenient for you to exchange games</small>
					</div>
				)}
				<AddressLookup address={updatedUser.place} onLookup={onLocactionChange}/>
			</StyledLabel>
			<MapContainer>
				<Map points={[{id:0, position, contents}]}/>
			</MapContainer>
			<StyledLabel>
				Your platforms
				{ !readonly && (
					<div>
						<small>Currently only PS4 is supported, but you can uncheck it if you want...</small>
					</div>
				)}
			</StyledLabel>
			<div>
				<StyledLabel bright>
					<StyledCheckbox	checked={checkHasPlatform(updatedUser, PS4)}
									onChange={() => onPlatformSelect(PS4)}
									readonly={readonly}/>&nbsp;&nbsp;
					{PS4}
				</StyledLabel>
			</div>
		</ProfileFormContainer>
	)
}
const mapStateToProps = (state) => {
	return {
		updatedUser: state.userUpdate.user
	}
}
const mapDispatchToProps = {
	userUpdateUnsaved	
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)