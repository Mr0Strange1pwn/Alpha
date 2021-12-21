import { JOB_TYPE, DELETE_JOB_TYPE , ADD_JOB_TYPE , UPDATE_JOB_TYPE} from '../actions/jobtypeAction'

const InitialState = { 
    jobTypes: [], 
    jobInfo:[]
}

const jobtypeReduser = (state = InitialState, action) => {
    switch (action.type) {
        case JOB_TYPE: {
            return {
                ...state,
                jobTypes: action.payload
            }
        }
        case ADD_JOB_TYPE : {
            return {
                ...state,
                jobInfo:action.payload
            }
        }
        case UPDATE_JOB_TYPE : {
            return {
                ...state,
                jobInfo:action.payload
            }
        }
        case DELETE_JOB_TYPE : {
            let jotTypeList = state.jobTypes.filter(jobtype => jobtype.id !== action.payload)
            return {
                ...state,
                jobTypes:jotTypeList
            }
        }
        default: return { ...state }
    }

}

export default jobtypeReduser