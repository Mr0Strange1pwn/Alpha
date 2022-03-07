import { SET_SCREENSHOTS, SET_WORK_TIME } from '../actions/screenshortsAction'


const initialState = {
    SS : [],
    workTime:[]
}

const screenshortreduser = ( state = initialState , action ) =>{

    switch(action.type){
        case SET_SCREENSHOTS: {
            return {
                ...state,
                SS: action.payload
            }
        }
        case SET_WORK_TIME: {
            return {
                ...state,
                workTime: action.payload
            }
        }
        default: return {
...state
        }
    }
}

export default screenshortreduser