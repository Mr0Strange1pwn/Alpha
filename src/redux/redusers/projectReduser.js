import { PROJECT , ADD_PROJECT} from '../actions/projectActions'

const InitialState = {
  projects:[]
}

const projectReduser =(state = InitialState, action)=>{
switch(action.type){
    case PROJECT:{
        return {
            ...state,
            projects: action.payload
        }
    }
    case ADD_PROJECT :{
        return {
            ...state,
            projects: [...state.projects, action.payload]
        }
    }
    default :return  {
        ...state,
    }
}
}

export default projectReduser