import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
}

const authStart = (state, action) => {
    return updateObject(state,
        {
            error: null,
            loading: true
        })
}

const authSuccess = (state, action) => {
    return updateObject(state,
        {
            error: null,
            loading: false,
            idToken: action.idToken,
            userId: action.userId
        })
}

const authFailed = (state, action) => {
    return updateObject(state,
        {
            error: action.error,
            loading: false
        })
}

const authLogout = (state, action) => {
    return updateObject(state,
        {
            idToken: null,
            userId: null,
        })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT:
           return authLogout(state, action)
        default:
            return state

    }
};


export default reducer;