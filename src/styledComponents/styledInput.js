import styled, { css } from 'styled-components';

const StyledInput = styled.div`
width: 100%;
padding: 2%;
box-sizing: border-box;
`

const StyledLabel = styled.label`
font-weight: bold;
display: block;
margin-bottom: 1.5%;
`

const StyledInputElement = styled.input`
outline: none;
border: 1px solid #ccc;
background-color: white;
padding: 6px 10px;
display: block;
width: 100%;
box-sizing: border-box;

${props => props.invalid && css`
     background: #ffe9e8; 
     border: 2px solid darkred;`
  }

:focus {
    outline: none;
    background-color: #ccc;
}
`

const StyledTextAreaElement = styled.textarea`
outline: none;
border: 1px solid #ccc;
background-color: white;
font: inherit;
padding: 6px 10px;
display: block;
width: 100%;

:focus {
    outline: none;
    background-color: #ccc;
}
`

const StyledSelectELement = styled.select`
outline: none;
border: 1px solid #ccc;
background-color: white;
font: inherit;
padding: 6px 10px;
display: block;
width: 100%;

:focus {
    outline: none;
    background-color: #ccc;
}
`

export {StyledInput, StyledLabel, StyledInputElement, StyledTextAreaElement, StyledSelectELement }