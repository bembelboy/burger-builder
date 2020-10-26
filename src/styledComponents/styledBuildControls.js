import styled from 'styled-components';

const BuildControls = styled.div`
width: 100%;
background-color: #CF8F2E;
display: flex;
flex-flow: column;
align-items: center;
box-shadow: 0 2px 1px #ccc;
margin: auto;
padding: 0% 0 3%;
`

const Price = styled.p`
color: white;
padding: 15px;
font-weight: 700;
font-size: 1.5rem;
`

const OrderButton = styled.button`
background-color: #EAC993;
outline: none;
cursor: pointer;
border: 1px solid #966909;
color: #000000;
font-weight: bold;
font-family: inherit;
font-size: 1.2 em;
padding: 20px 30px;
margin-top: 15px;
box-shadow: 2px 2px 2px #966909;

:hover{
    background-color: #D39952;
    border: 1px solid #966909;
    color: #ffffff;
}

:active {
    background-color: #8F5E1E;
    border: 1px solid #966909;
    color: #ffffff;
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

@keyframes enable {
    0% {
        transform: scale(1);
    }
    60% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
`








export {BuildControls, Price, OrderButton};