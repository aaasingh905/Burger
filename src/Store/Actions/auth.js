import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Timeout');
    localStorage.removeItem('UserId');
    return {
        type: actionTypes.AUTH_LOGOUT,
        
    };
    

}
export const checkAuthTimeout = (clearTimeout) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())

        },clearTimeout*1000)

   }
         
    
}

export const checkAuthState = () => {
    return dispatch => {
        const userId = localStorage.getItem('UserId');
          const token = localStorage.getItem('Token');
            if(!token) {
                dispatch(logout());
            }
            else {
                const timeout= new Date (localStorage.getItem('Timeout'));
                if(timeout <= new Date()){
                    dispatch(logout());
                }
                else {
                     dispatch(authSuccess(token, userId));
                     dispatch(checkAuthTimeout((timeout.getTime() - new Date().getTime())/1000));
            }

        }
        }
   }
         
    


export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authValidation = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQuk79jy_qIzfALmQW_A0JkauBk7ypHRc'
        if(!isSignUp)
            {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQuk79jy_qIzfALmQW_A0JkauBk7ypHRc'
            }
        axios.post(url, authData)
             .then(response => {
                  console.log(response);
                  const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                  localStorage.setItem('Token', response.data.idToken);
                  localStorage.setItem('Timeout', expirationDate);
                  localStorage.setItem('UserId', response.data.localId)
                  dispatch(authSuccess(response.data.idToken,response.data.localId));
                  console.log(response.data);
                  dispatch(checkAuthTimeout(response.data.expiresIn));
             })
             .catch(err => {
                 dispatch(authFail(err.response.data.error));
             })
    }
}