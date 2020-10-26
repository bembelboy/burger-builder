import React from 'react';

import {BuildControl,  Label, Less, More} from '../../../../styledComponents/styledBuildControl';




const buildControl = (props) => {
    return ( 
        <BuildControl>
            <Label>{props.label}</Label>
            <More onClick={props.added}>More</More> {/*the onClick is for the BuildControls.js*/}
            <Less onClick={props.removed} disabled={props.disabled} >Less</Less> {/*the onClick and disabled is for the BuildControls.js*/}
        </BuildControl>
     );
};
 
export default buildControl;