import React, { memo } from 'react';

import Modal from '../../../styledComponents/styledModal';
import Aux from '../../../hoc/auxiliary';
import Backdrop from '../Backdrop/Backdrop';

//Function helps to update the Modal only when its shown;

const memoDependencyFunction = (prevProps, nextProps) => {
    if (nextProps.show === prevProps.show || nextProps.children !== prevProps.children ) {
        return false;
    }
};
const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <Modal show={props.show}>
                {props.children}
            </Modal>
        </Aux>
    );
}

export default memo(modal, memoDependencyFunction,); //imported in BurgerBuilder.js