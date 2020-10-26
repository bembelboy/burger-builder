import React from 'react';

import { StyledInput, StyledLabel, StyledInputElement, StyledTextAreaElement, StyledSelectELement } from '../../../styledComponents/styledInput';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) { //the switch statemeent makes the component more versitile because it can handle more than just a normal inputELement
        case ('input'):
            inputElement = <StyledInputElement {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.touched ? props.invalid : !props.invalid} />; //
            break;
        case ('textaerea'):
            inputElement = <StyledTextAreaElement {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.touched ? props.invalid : !props.invalid} />;
            break;
        case ('select'):
            inputElement = <StyledSelectELement {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.touched ? props.invalid : !props.invalid}>
                break;
                                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value} >{option.displayValue}</option>
                })}
            </StyledSelectELement>;
            break;
        default:
            inputElement = <StyledInputElement {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                invalid={props.touched ? props.invalid : !props.invalid} />;
            break;
    }


    return (
        <StyledInput>
            <StyledLabel>{props.label}</StyledLabel>
            {inputElement}
        </StyledInput>
    );
}

export default input;
