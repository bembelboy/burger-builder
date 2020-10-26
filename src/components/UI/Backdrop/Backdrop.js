import React from 'react';

import Backdrop from '../../../styledComponents/styledBackdrop';

const backdrop = (props) => {
    return ( 
        props.show ? <Backdrop onClick={props.clicked} /> : null
     );
}
 
export default backdrop; //imported in Modal.js