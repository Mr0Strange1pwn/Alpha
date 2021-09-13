import { LOG_IN, SIGN_UP, LOG_OUT } from "../actions/authAction"

const InitialState = {
    isLoggedIn: false,
    userInfo: {},
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
        default: return { ...state }
    }

}

export default authReduser