import { ADD_ROLE, ROLE_LIST , DELETE_ROLE , ROLE_DETAIL, ROLE_SAVE,FILTER_ROLE } from "../actions/roleAction"

const InitialState = {
    isLoggedIn: true,
    userInfo: {},
    // filterRoleList:{}
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
            let roleList = state.userInfo.filter(role=> role.id !== action.payload)
            return {
                ...state,
                isLoggedIn:true,
                userInfo: roleList
            }
        }
        case ROLE_DETAIL: {
            return {
                ...state,
                isLoggedIn:true,
                userInfo:action.payload
            }
        }
        case ROLE_SAVE: {
            return {
                ...state,
                isLoggedIn:true,
                userInfo:action.payload
            }
        }
        case FILTER_ROLE: {
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

