import {
  PROJECT,
  ADD_PROJECT,
  NEW_PROJECT,
  DELETE_PROJECT,
  ADD_PROJECT_MILESTONE,
  DELETE_PROJECT_MILESTONE,
  EDIT_PROJECT_MILESTONE,
  PROJECT_MILESTONE,
  UPDATE_PROJECT,
  GET_TASK,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TASK_FILTER_VIEW ,
  SET_MILESTONE_ID,
  ASSIGN_TASK,
} from "../actions/projectActions";

const InitialState = {
  projects: [],
  project: {},
  milestones: [],
  tasks: [],
  taskFilter:[],
  milestoneId:null
};

const projectReduser = (state = InitialState, action) => {
  switch (action.type) {
    case PROJECT: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case ADD_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.payload],
        project: action.payload,
      };
    }
    case NEW_PROJECT:
      return { ...state, project: action.payload ? action.payload : {} };
    case DELETE_PROJECT: {
      let projects = state.projects.filter((pro) => pro.id !== action.payload);
      return {
        ...state,
        projects: projects,
      };
    }
    case PROJECT_MILESTONE: {
      return {
        ...state,
        milestones: action.payload,
      };
    }
    case DELETE_PROJECT_MILESTONE: {
      let MS = state.milestones.filter((ms) => ms.id !== action.payload);
      return {
        ...state,
        milestones: MS,
      };
    }
    case EDIT_PROJECT_MILESTONE: {
      let index = state.milestones.findIndex((m) => m.id === action.payload.id);
     
      if (index !== -1) {
         state.milestones[index] = action.payload;
      }
//       let newmilestones = state.milestones;
// console.log({index,payload:action.payload})
//       newmilestones.splice(index, 1, action.payload);
//       let arr = newmilestones
      console.log({index,payload:action.payload, newmilestones:state.milestones})
      return {
        ...state,
        milestones: state.milestones,
      };
    }
    case SET_MILESTONE_ID:{
      return {
        ...state,
        milestoneId: action.payload
      }
    }
    case ADD_PROJECT_MILESTONE: {
      return {
        ...state,
        milestones: [...state.milestones, action.payload],
      };
    }
    case UPDATE_PROJECT: {
      let index = state.projects.findIndex((p) => p.id === action.payload.id);
      let newprojects = state.projects;

      newprojects.splice(index, 1, action.payload);
      return {
        ...state,
        projects: newprojects,
        project: action.payload,
      };
    }
    case GET_TASK: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }
    // case ASSIGN_TASK:{
    //   let index = state.tasks.findIndex((m) => m.id === action.payload.id);
     
    //   if (index !== -1) {
    //      state.tasks[index] = action.payload;
    //   }
    //   return {
    //     ...state,
    //     tasks:  state.tasks ,
    //   };
    // }
    case DELETE_TASK: {
        let taskList = state.tasks.filter(tasks=> tasks.id !== action.payload)
        return {
            ...state,
            tasks: taskList
        }
    }
    // case UPDATE_TASK : {
    //     return {
    //         ...state,
    //         tasks:action.payload
    //     }
    // }
    case TASK_FILTER_VIEW :{
      return {
        ...state,
        taskFilter:action.payload
    }
    }
    default:
      return {
        ...state,
      };
  }
};

export default projectReduser;
