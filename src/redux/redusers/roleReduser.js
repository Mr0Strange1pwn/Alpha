import { ADD_ROLE, ROLE_LIST,DELETE_ROLE } from "../actions/roleAction"

const InitialState = {
    isLoggedIn: true,
    userInfo: {},
}

const roleReduser = (state = InitialState, action) => {
    switch (action.type) {
        case ADD_ROLE: {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            }
        }
        case ROLE_LIST: {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            }
        }
        case DELETE_ROLE: {
            return {
                ...state,
                isLoggedIn:true,
                userInfo:action.payload
            }
        }
        default: return { ...state }
    }

}

export default roleReduser

