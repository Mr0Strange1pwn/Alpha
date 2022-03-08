import { SET_SCREENSHOTS, SET_WORK_TIME, SET_EMP_SCREENSHOTS } from '../actions/screenshortsAction'


const initialState = {
    SS : [],
    workTime:[],
    empSS:[]
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
        case SET_EMP_SCREENSHOTS:{
            return {
                ...state,
                empSS: action.payload
            }
        }
        default: return {
...state
        }
    }
}

export default screenshortreduser