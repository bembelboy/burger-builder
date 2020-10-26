import React from 'react';

import { NavItem, NavAnchor,} from '../../../styledComponents/styledNavItem';
import Aux from '../../../hoc/auxiliary';


const navItem = (props) => {
    return (
        <Aux>
            <NavItem>
                    <NavAnchor to={props.link} exact>{props.children}</NavAnchor>
            </NavItem>
        </Aux>
    );
}

export default navItem; //exported in NavList