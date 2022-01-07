import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const EMP_LIST = "EMP_LIST";
export const EMP_DESIGNATION = "EMP_DESIGNATION";
export const EMP_ROLE = "EMP_ROLE";
export const EMP_SAVE = "EMP_SAVE";
export const EMP_EMPLOYES = "EMP_EMPLOYES";
export const EMP_PAYROLL = "EMP_PAYROLL";
export const EMP_DOCUMENTS = "EMP_DOCUMENTS";
export const EMP_ADD_DOCUMENT = "EMP_ADD_DOCUMENT";
export const EMP_DELETE = "EMP_DELETE";
export const EMP_JOB_DETAILS = "EMP_JOB_DETAILS";
export const EMP_DELETE_DOCUMENTS = "EMP_DELETE_DOCUMENTS";
export const EMP_FILTER = "EMP_FILTER";

export const empLIst = () => {
  return async (dispatch) => {
    await Axios.get("/Employee/save", HeaderToken())
      .then((res) => {
        dispatch({ type: EMP_LIST, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const empfilter = (data) => {
  return async (dispatch) => {
    await Axios.post("/Account/filter/", data, HeaderToken())
      .then((res) => {
        console.log("empfilter",res.data.response)
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_FILTER, payload: res.data.response });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getDesignitations = () => {
  return async (dispatch) => {
    await Axios.get("/Account/Designation", HeaderToken())
      .then((res) => {
        dispatch({ type: EMP_DESIGNATION, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    await Axios.get("/Account/roles", HeaderToken())
      .then((res) => {
        dispatch({ type: EMP_ROLE, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const saveEmployee = (data, setCurrentStep, backpackClick,setInProgress) => {
  return async (dispatch) => {
    setInProgress(true)
    await Axios.post("/Employee/save", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
          setInProgress(false)
        } else {
          dispatch({ type: EMP_SAVE, payload: res.data.employee });
          setInProgress(false)
          setCurrentStep(2);
          backpackClick(2);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
        setInProgress(false)
      });
  };
};

export const saveEmployeeUpdate = (data, setCurrentStep, backpackClick,setInProgress) => {
  return async (dispatch) => {
    setInProgress(true)
    await Axios.put("/Employee/save", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          setInProgress(false)
          toast.error(res.data.response);
        } else {
          setInProgress(false)
          dispatch({ type: EMP_SAVE, payload: res.data.employee });
          setCurrentStep(2);
          backpackClick(2);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
        setInProgress(false)
      });
  };
};

export const getEmployes = () => {
  return async (dispatch) => {
    await Axios.get("/Employee/all", HeaderToken())
      .then((res) => {
        dispatch({ type: EMP_EMPLOYES, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getEmployeeAllDetails = (id) => {
  return async (dispatch) => {
    await Axios.get(`/Account/employe_list/${id}`, HeaderToken())
      .then((res) => {
        // let response = res.data.response;
        //  dispatch({ type: EMP_SAVE, payload: response.user_profile });
        //  dispatch({ type: EMP_PAYROLL, payload: response.payroll_details })
        //  dispatch({ type: EMP_DOCUMENTS, payload: response.document_details })
        //  dispatch({ type: EMP_JOB_DETAILS, payload: response.job_details })
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const uploadDocument = (data,setInProgress) => {
  return async (dispatch) => {
    setInProgress(true)
    await Axios.post("/Document/upload", data, HeaderToken())
      .then((res) => {
        if (res.data.document !== undefined) {
          setInProgress(false)
          return dispatch({
            type: EMP_ADD_DOCUMENT,
            payload: res.data.document,
          });
        } else {
          setInProgress(false)
          return toast.error(res.data.response);
        }
      })
      .catch((err) => {
        setInProgress(false)
        toast.error("Network Error");
      });
  };
};

export const getDocuments = () => {
  return async (dispatch) => {
    await Axios.get("/Document/upload", HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_DOCUMENTS, payload: res.data });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getDocumentsById = (id,setInProgress) => {
  return async (dispatch) => {
    setInProgress(true)
    await Axios.get(`/Account/document/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "false") {
          toast.error(res.data.response);
          setInProgress(false)
          dispatch({ type: EMP_DOCUMENTS, payload: [] });
        } else {
          setInProgress(false)
          dispatch({ type: EMP_DOCUMENTS, payload: res.data.response });
        }
      })
      .catch((err) => {
        setInProgress(false)
        toast.error("Network Error");
      });
  };
};

export const deleteDocuments = (id) => {
  return async (dispatch) => {
    await Axios.delete(`/Document/delete/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_DELETE_DOCUMENTS, payload: id });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    await Axios.delete(`/Employee/delete/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          toast.success("deleted");
          dispatch({ type: EMP_DELETE, payload: id });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const uploadPayroll = (data, setCurrentStep, backpackClick) => {
  return async (dispatch) => {
    await Axios.post("/Account/payroll", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_PAYROLL, payload: res.data.payroll });
          setCurrentStep(4);
          backpackClick(4);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const updatePayroll = (data, setCurrentStep, backpackClick) => {
  return async (dispatch) => {
    await Axios.put("/Account/payroll", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_PAYROLL, payload: res.data.data });
          setCurrentStep(4);
          backpackClick(4);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getPayroll = (id) => {
  return async (dispatch) => {
    await Axios.get(`/Account/payroll/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_PAYROLL, payload: res.data.response[0] });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const uploadJobDetails = (
  data,
  history,
  setCurrentStep,
  backpackClick
) => {
  return async (dispatch) => {
    await Axios.post("/Account/job_details", data, HeaderToken())
      .then((res) => {
        console.log("resss",res.data)
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_JOB_DETAILS, payload: res.data.payroll });
          history.push("/Employee");
          setCurrentStep(1);
          backpackClick(1);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getJobDetails = (id) => {
  return async (dispatch) => {
    await Axios.get(`/Account/job_details/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_JOB_DETAILS, payload: res.data.response[0] });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const updateJobDetails = (
  data,
  history,
  setCurrentStep,
  backpackClick
) => {
  return async (dispatch) => {
    await Axios.put("/Account/job_details", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: EMP_JOB_DETAILS, payload: res.data.payroll });
          history.push("/Employee");
          setCurrentStep(1);
          backpackClick(1);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};
