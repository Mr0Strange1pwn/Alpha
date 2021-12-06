import { EMP_LIST, EMP_DESIGNATION, EMP_ROLE, EMP_EMPLOYES , EMP_SAVE, EMP_PAYROLL} from "../actions/employeeAction" 

const InitialState = {
    isLoggedIn: true,
    userInfo: {},
    designations:[],
    roles:[],
    employeeInfo:{},
    employeePayRoll:{},
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
        case EMP_DESIGNATION:{
            return {
                ...state,
                designations: action.payload
            }
        }
        case EMP_ROLE:{
            return {
                ...state,
                roles: action.payload
            }
        }
        case EMP_SAVE:{
            return {
                ...state,
                employeeInfo: action.payload
            }
        }
        case EMP_PAYROLL:{
            return {
                ...state,
                employeePayRol: action.payload
            }
        }
        default: return { ...state }
    }

}

export default empReduser