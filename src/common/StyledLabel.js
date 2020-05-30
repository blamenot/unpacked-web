import styled from 'styled-components'
export default styled.label`
	color: #5F606C;
	${({bright}) => bright && 'color: #fff;'}
	font-size: 12px;
	${({bright}) => bright && 'font-size: 16px;'}
	text-transform: uppercase;
`