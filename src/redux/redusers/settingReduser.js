import { GET_Designation, DELETE_DESIGNATION, ADD_DESIGNATION, UPDATE_DESIGNATION } from "../actions/settingAction";

const initialState = {
  designation: [],
  designationInfo:[],
};

const designationReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_Designation: {
      return {
        ...state,
        designation: action.payload,
      };
      
    }
    case ADD_DESIGNATION: {
        return{
            ...state,
            designationInfo:action.payload
        }
    }

    case UPDATE_DESIGNATION : {
        return {
            ...state,
            designationInfo:action.payload
        }
    }
    case DELETE_DESIGNATION: {
        let designationList = state.designation.filter(designation=> designation.id !== action.payload)
        return {
            ...state,
            designation: designationList
        }
    
    }
    default:
      return {
        ...state,
      };
  }
};

export default designationReduser;
