import { SET_SCREENSHOTS } from '../actions/screenshortsAction'


const initialState = {
    SS : []
}

const screenshortreduser = ( state = initialState , action ) =>{

    switch(action.type){
        case SET_SCREENSHOTS: {
            return {
                ...state,
                SS: action.payload
            }
        }
        default: return {
...state
        }
    }
}

export default screenshortreduser