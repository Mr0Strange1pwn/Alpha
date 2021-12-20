import { PROJECT , ADD_PROJECT, NEW_PROJECT , DELETE_PROJECT , ADD_PROJECT_MILESTONE, 
     DELETE_PROJECT_MILESTONE, EDIT_PROJECT_MILESTONE ,PROJECT_MILESTONE , UPDATE_PROJECT,GET_TASK,ADD_TASK} from '../actions/projectActions'

const InitialState = {
  projects:[],
  project:{},
  milestones:[],
  tasks:[],
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
            milestones: action.payload,
        }
    }
    case DELETE_PROJECT_MILESTONE:{
        let MS = state.milestones.filter(ms=> ms.id !== action.payload)
        return {
            ...state,
            milestones: MS,
        }
    }
    case EDIT_PROJECT_MILESTONE :{
        let index = state.milestones.findIndex(m => m.id === action.payload.id)
        let newmilestones =  state.milestones

        newmilestones.splice(index, 1,  action.payload)
        return {
            ...state,
            milestones: newmilestones,
        }
    }
    case ADD_PROJECT_MILESTONE : {
        return {
            ...state,
            milestones: [...state.milestones, action.payload],
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
            tasks: action.payload
        }
    }
    case ADD_TASK : {
        return {
            ...state,
            tasks: [...state.tasks,action.payload]
        }
    }
    default :return  {
        ...state,
    }
}
}

export default projectReduser