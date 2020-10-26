import styled from 'styled-components';

const Button = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    /* :first-of-type { // is not usable with style addjustments in DangerButton
    margin-left: 0;
    padding-left: 0;
} */
`
const SuccessButton = styled(Button)`
color: #5C9210;
:hover {
    color: white;
    background-color: #5C9210;
}

:disabled {
    background-color: #C7C6C6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888;
}

:not(:disabled) {
    animation: enable 0.3s linear;
}

`

const DangerButton = styled(Button)`
color: #944317;

:hover {
    color: white;
    background-color: #944317;
}

:disabled {
    background-color: #C7C6C6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888;
}

:not(:disabled) {
    animation: enable 0.3s linear;
}

`

const MenuButton = styled(Button)`
background-color: inherit;
color: white;
font-weight: bold;
letter-spacing: 10px;
text-align: center;
display:flex;
justify-content: center;
align-items: center;
box-sizing: border-box;
height:100%;
margin: 0;
padding-left: 3%;

:hover{
    background-color: black;
    opacity: 0.5
}
:active{
    opacity: 0.8;
}

@media (min-width: 500px) {
    display: none;
}
`

export {SuccessButton, DangerButton, MenuButton};