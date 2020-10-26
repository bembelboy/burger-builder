import React from 'react';

import {Toolbar, Navigation} from '../../../styledComponents/styledToolbar';
import Logo from '../../Logo/Logo';
import NavList from '../../Navigation/NavigationItems/NavList';
import {MenuButton} from '../../../styledComponents/styledButton';


const toolbar = (props) => {
    return ( 
        <Toolbar>
            <MenuButton onClick={props.clicked}> ...</MenuButton>
            <Logo height='80%' />
            <Navigation>
                <NavList open={props.open} authenticated={props.authenticated}></NavList>
            </Navigation>
        </Toolbar>
     );
}
 
export default toolbar; //exported in Layout