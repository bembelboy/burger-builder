import React from 'react';

import Logo from '../../Logo/Logo';
import NavList from '../../Navigation/NavigationItems/NavList';
import SideDrawer from '../../../styledComponents/styledSideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxiliary';


const sideDrawer = (props) => {
    let sideDrawer = (
        <Aux>
        <Backdrop
            clicked={props.closed} //closes Sidedrawer when clicked State is in Layout.js
            show={props.open}
        />
        <SideDrawer show={props.open} onClick={props.closed}>
            <Logo height='11%' marginBottom='5%' />
            <NavList show={props.open} authenticated={props.authenticated}/>
        </SideDrawer>
    </Aux>
    )

    if (!props.open) {
        sideDrawer = null
    }
    return (
        sideDrawer
    );
}

export default sideDrawer; //exported to Layout.js