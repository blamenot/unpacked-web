import styled from "styled-components";

const StyledButton = styled.button`
	box-sizing: border-box;
	border: 2px solid #FDE74C;
	color: white;
	${props => props.reject && `
		border-color: #AD2031;
		color: #AD2031;
	`}
	${({disabled}) => disabled && `
		border-color: #5F606C;
		color: #5F606C;
	`}
	font-weight: bold;
	background: none;
	line-height: 46px;
	${props => props.wide && 'width: 100%;'};
	flex-grow: 1;
	padding: 0;
`
export default StyledButton