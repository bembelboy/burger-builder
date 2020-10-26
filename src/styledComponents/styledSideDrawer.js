import styled, {css} from 'styled-components';

const SideDrawer = styled.div`

position: fixed;
width: 280px;
height: 100%;
left: 0;
top: 0;
z-index: 200;
background-color: white;
padding: 32px 16px;
transition: transform 0.3s ease-out;
${props => props.show ? css`transform: translateX(0)` : css`transform: translateX(-100%)`};


@media (min-width: 500px) {
position: fixed;
width: 280px;
height: 100%;
left: 0;
top: 0;
z-index: 200;
background-color: white;
padding: 32px 16px;
transition: transform 0.3s ease-out;
${props => props.show ? css`transform: translateX(0)` : css`transform: translateX(-100%)`};
}
`


export default SideDrawer;