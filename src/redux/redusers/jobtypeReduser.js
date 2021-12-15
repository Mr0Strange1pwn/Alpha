import { JOB_TYPE} from '../actions/jobtypeAction'

const InitialState = { 
    jobTypes: [], 
}

const jobtypeReduser = (state = InitialState, action) => {
    switch (action.type) {
        case JOB_TYPE: {
            return {
                ...state,
                jobTypes: action.payload
            }
        }
        default: return { ...state }
    }

}

export default jobtypeReduser