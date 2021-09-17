import { LOG_IN, SIGN_UP, LOG_OUT } from "../actions/authAction"

const InitialState = {
    isLoggedIn: false,
    userInfo: {},
    toggle: false,
}

const authReduser = (state = InitialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false
            }
        }
        case "ON" : {
            return {
                ...state, toggle : true
            }
        }
        case "OFF" : {
                return {
                    ...state, toggle : false
                }
        }
        default: return { ...state }
    }

}

export default authReduser

