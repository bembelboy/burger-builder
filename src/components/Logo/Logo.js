import React from 'react';

import burgerLogo from '../../assests/images/burgerLogo.png'; //is necessary so webpack will handle the image properly
import { Logo, LogoImage } from '../../styledComponents/styledLogo';


const logo = (props) => {
    return (
        <Logo style={{height: props.height, marginBottom: props.marginBottom}}>
            <LogoImage src={burgerLogo} alt='Best Burgers' />
        </Logo>
    );
}

export default logo; //exported in Toolbar.js