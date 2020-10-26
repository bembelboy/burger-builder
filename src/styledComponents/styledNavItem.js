import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const NavItem = styled.li`
margin: 10px 0;
box-sizing: border-box;
display: block;
width: 100%;

@media (min-width: 500px ) { /* for the Website default is for Mobile Devices*/
margin: 0;
display: flex;
height: 100%;
width: auto;
align-items: center;
}
`

const NavAnchor = styled(NavLink)`
color: #8F5C2C;
text-decoration: none;
box-sizing: border-box;
display: block;
padding: 5% 10%;
margin: 0;
text-align: center;
min-width: 100px;


&.active{
    background-color: #f0f0f0;
    color: black;
}

@media (min-width: 500px) {
color: white;
height: 100%;
padding: 16px 10px;
border-bottom: 4px solid transparent;
align-items: center;
justify-content: center;
text-align: center;


:hover{
    background-color: #8F5C2C;
    border-bottom: 4px solid #40A4C8;
    color: white;
}
&.active{
    background-color: #8F5C2C;
    border-bottom: 4px solid #40A4C8;
    color: white;
}
}
`

//Styles should apply when ActiveClassName is triggered //OUTDATED
const ActiveNavAnchor = styled(NavAnchor)` 
    background-color: #f0f0f0;
    color: black;

    @media (min-width: 500px) {
     background-color: #8F5C2C;
    border-bottom: 4px solid #40A4C8;
    color: white;
    }
`

const SideDrawerItem = styled.li`
margin: 10px 0;
box-sizing: border-box;
display: block;
width: 100%;
`
const SideDrawerAnchor = styled.a`
color: #8F5C2C;
text-decoration: none;
box-sizing: border-box;
display: block;
padding: 5% 10%;
margin: 0;

:active{
    background-color: #c86440;
}
`


export {NavItem, NavAnchor, ActiveNavAnchor,SideDrawerItem, SideDrawerAnchor};