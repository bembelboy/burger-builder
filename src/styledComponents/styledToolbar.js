import styled from 'styled-components';


const Toolbar = styled.header`
height: 56px;
width: 100%;
position: fixed;
top:0;
left: 0;
background-color: #703B09;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 20px;
box-sizing: border-box;
z-index: 90;  
`

const Navigation = styled.nav`
height: 100%;
display:none;

@media (min-width: 500px){
display: inherit;
}
`

export {Toolbar, Navigation};