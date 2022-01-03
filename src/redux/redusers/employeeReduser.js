import {
  EMP_LIST,
  EMP_DESIGNATION,
  EMP_ROLE,
  EMP_SAVE,
  EMP_PAYROLL,
  EMP_FILTER,
  EMP_DOCUMENTS,
  EMP_DELETE,
  EMP_ADD_DOCUMENT,
  EMP_JOB_DETAILS,
  EMP_DELETE_DOCUMENTS,
} from "../actions/employeeAction";

const InitialState = {
  isLoggedIn: true,
  userInfo: [],
  designations: [],
  roles: [],
  employeeInfo: {},
  employeePayRoll: {},
  employeeDocuments: [],
  employeeJobDetails: {},
};

const empReduser = (state = InitialState, action) => {
  switch (action.type) {
    case EMP_LIST: {
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    }
    case EMP_FILTER: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case EMP_DESIGNATION: {
      return {
        ...state,
        designations: action.payload,
      };
    }
    case EMP_ROLE: {
      return {
        ...state,
        roles: action.payload,
      };
    }
    case EMP_SAVE: {
      return {
        ...state,
        employeeInfo: action.payload,
      };
    }
    case EMP_PAYROLL: {
      return {
        ...state,
        employeePayRoll: action.payload,
      };
    }
    case EMP_DOCUMENTS: {
      return {
        ...state,
        employeeDocuments: action.payload,
      };
    }
    case EMP_ADD_DOCUMENT: {
      return {
        ...state,
        employeeDocuments: [...state.employeeDocuments, action.payload],
      };
    }
    case EMP_DELETE: {
      let empList = state.userInfo.filter((user) => user.id !== action.payload);
      return {
        ...state,
        userInfo: empList,
      };
    }
    case EMP_JOB_DETAILS: {
      return {
        ...state,
        employeeJobDetails: action.payload,
      };
    }
    case EMP_DELETE_DOCUMENTS: {
      let docList = state.employeeDocuments.filter(
        (doc) => doc.id !== action.payload
      );
      return {
        ...state,
        employeeDocuments: docList,
      };
    }
    default:
      return { ...state };
  }
};

export default empReduser;
