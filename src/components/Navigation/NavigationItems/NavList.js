import React from 'react';

import NavItem from './NavItem';
import NavList from '../../../styledComponents/styledNavList';

const navList = (props) => {

    return (
        props.open ?
            <NavList></NavList>
            :
            <div style={{ margin: 'auto', }}>
                <NavList>
                    <NavItem link='/' exact >Burger Builder</NavItem>
                    {props.authenticated ? <NavItem link='/orders' exact>Orders</NavItem> : null}
                    {props.authenticated ? <NavItem link='/logout' exact>Logout</NavItem> : <NavItem link='/auth' exact>Sign In</NavItem>}
                </NavList>
            </div>

    );
}

export default navList; //exported in Toolbar.js