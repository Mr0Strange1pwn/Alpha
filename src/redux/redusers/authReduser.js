import { LOG_IN,  LOG_OUT , FORGOT_PASS, RESET_PASS ,CHANGE_PASS } from "../actions/authAction"

const InitialState = {
    isLoggedIn: false,
    userInfo: {},
    toggle: false,
    linkSend:false
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
        case FORGOT_PASS : {
            return{
                ...state,
                isLoggedIn:false,
                userInfo: action.payload,
                linkSend:true
            }
        }
        case RESET_PASS : {
           return {
            ...state,
            isLoggedIn:false,
            userInfo:action.payload
           }
        }
        case CHANGE_PASS : {
            return {
                ...state,
                isLoggedIn:false,
                userInfo:action.payload
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

