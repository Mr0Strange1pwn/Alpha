import { EMP_LIST } from "../actions/employeeAction" 

const InitialState = {
    isLoggedIn: true,
    userInfo: {},
}

const empReduser = (state = InitialState, action) => {
    switch (action.type) {
        case EMP_LIST: {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload
            }
        }
        default: return { ...state }
    }

}

export default empReduser