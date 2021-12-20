import { PROJECT , ADD_PROJECT, NEW_PROJECT , DELETE_PROJECT , PROJECT_MILESTONE , UPDATE_PROJECT,GET_TASK,ADD_TASK} from '../actions/projectActions'

const InitialState = {
  projects:[],
  project:{},
  milestone:{},
  task:[],
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
            projects: [...state.projects, action.payload],
            project: action.payload,
        }
    }
    case NEW_PROJECT: return { ...state , project: action.payload ?action.payload:{}}
    case DELETE_PROJECT: {
        let projects = state.projects.filter(pro=> pro.id !== action.payload)
        return {
            ...state,
            projects: projects,
        }
    }
    case PROJECT_MILESTONE : {
        return {
            ...state,
            milestone: action.payload,
        }
    }
    case UPDATE_PROJECT :{
        let index = state.projects.findIndex(p => p.id === action.payload.id)
        let newprojects =  state.projects

        newprojects.splice(index, 1,  action.payload)
        return {
            ...state,
            projects: newprojects,
            project: action.payload,
        }
    }

    case GET_TASK : {
        return {
            ...state,
            task: action.payload
        }
    }
    default :return  {
        ...state,
    }
}
}

export default projectReduser