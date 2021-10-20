export const LOG_IN = "LOG_IN"
export const SIGN_UP = "SIGN_UP"
export const LOG_OUT = "LOG_OUT"


export const logIn = (data) => {
    return dispatch => {
        return dispatch({
            type: LOG_IN,
            payload: data
        })
    }
}


export const signUp = (data) => {
    return dispatch => {
        return dispatch({
            type: SIGN_UP,
            payload: data
        })
    }
}

export const logOut = () => {
    return dispatch => {
        return dispatch({
            type: LOG_OUT,
        })
    }
}