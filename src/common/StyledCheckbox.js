import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: 15px 0;
`

const Icon = styled.svg`
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckboxDisplayer = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: ${props => (props.checked ? '#FDE74C' : ' #21222B')};
  ${({readonly, checked}) => readonly && checked && `background: none;`}
  color: ${({readonly}) => readonly ? '#FDE74C' : '#000' };
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #292B36;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const StyledCheckbox = ({ className, checked, readonly, ...props }) => (
  <CheckboxContainer className={className}>
	<HiddenCheckbox	type="checkbox"
					checked={checked}  
					disabled={readonly}
					{...props} />
    <StyledCheckboxDisplayer checked={checked} readonly={readonly}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckboxDisplayer>
  </CheckboxContainer>
)

export default StyledCheckbox