import * as actionTypes from '../actionTypes';
import axios from 'axios';

const authStart = () => { //needed for loadig state
    return {
        type: actionTypes.AUTH_START
    };
}

const authSuccess = (idToken, localId) => { //needed for loadig state
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: localId
    };
}

const authFail = (error) => { //needed for loadig state
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
}

const checkAuthTimeout = (exprationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, exprationTime * 1000);  //expirationTime is always 3600
    };
}

export const logout = () => {
    localStorage.clear() //clears Saved Data alternative would be localStorage.removeItem
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAci8Zjyxj7TgmebIZG2Sf6lGunfDWyUqc'; //url for Useres that are already SignIN
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAci8Zjyxj7TgmebIZG2Sf6lGunfDWyUqc' // For new Registrations
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn)); //triggers auth Logout after 1 hour
            })
            .catch(error => {
                //console.log(error.response)
                dispatch(authFail(error.response.data.error));
            })
    };
}

//Note that you could write this function without the localStorage if you would use the build in FirebaseObjects
export const authCheckTokenValidation = () => { //checks if the seesion is Still Valid
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {//Logs the user out if the token cant be found
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate')); // has to be wrapped in new Date beacause localStorage always stores data as string
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    };
};

