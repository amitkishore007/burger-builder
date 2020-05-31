import * as actions from './actionType';
import axios from 'axios';

export const auth = (userData, authType) => {
    return dispatch => {

        dispatch(authStart());
        const data = {
            ...userData,
            returnSecureToken: true
        }

        const key = "AIzaSyB35G6kJEZ00qMZN0FZOm2481WNATFPyQ8";
        let url = ""+key;

        if(authType === 'signup') {
            url = ""+key;
        }

        axios.post(url, data)
            .then((response)=>{
                console.log(response);
                const authData = {
                    token:response.data.idToken,
                    userId: response.data.localId,
                    expiresIn: response.data.expiresIn 
                }
                storeAuthData(authData);
                setLogout(parseInt(authData.expiresIn));
                dispatch(authSuccess(authData));
            })
            .catch((error) => {
                dispatch(authFailed(error.toString()));
            })
    }
}

export const setLogout = (expiresIn) => {
    return dispatch  => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn)
    }
}

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (authdata) => {
    return {
        type: actions.AUTH_SUCCESSS,
        payload: authdata
    }
}

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        payload: error
    }
}


export const storeAuthData = (authData) => {
    sessionStorage.setItem('token', authData.token);
    sessionStorage.setItem('userId', authData.userId);
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    sessionStorage.setItem('expirationDate', expirationDate);
}

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('expirationDate');
    return {
        type: actions.LOGOUT
    };
}

export const chekAuthState = () => {
    return dispatch => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const expirationDate = sessionStorage.getItem('expirationDate');
        if (!token || !userId || !expirationDate) {
            dispatch(logout());
        } else {
            if(!expirationDate) {
                dispatch(logout());
            } else {
                const currentTime = new Date().getTime();
                const expiryTime = new Date(expirationDate).getTime();
                if(currentTime > expiryTime) {
                    dispatch(logout());
                } else {
                    dispatch(authSuccess({
                        token: token,
                        userId: userId,
                        expiresIn: (expiryTime - currentTime) / 1000
                    }))
                }
            }
        }
    }
}