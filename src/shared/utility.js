export const updateObject = (oldObject, updatedProperties) => { //creates a not so deep clone of the old state
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidation = (value, rules) => { //checks if the InputFields meet the Requirements
    let isValid = true;
    let valueArray = [...value]

    if (rules.required) { //checks if something is typed in the Fields only triggers if orderform[inputidentifer].validation.required is true
        isValid = value.trim() !== '' && isValid; // trim removes WhiteSpaces
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.validSymbols) { //checks if symbols are valid
        isValid = valueArray.every(c => rules.validSymbols.includes(c)) && isValid;
    }

    if(rules.validEmail) {
       isValid = value.match(rules.validEmail) && isValid;
    }

    return isValid;
}