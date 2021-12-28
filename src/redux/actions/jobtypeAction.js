import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const JOB_TYPE = "JOB_TYPE";
export const DELETE_JOB_TYPE = "DELETE_JOB_TYPE";
export const ADD_JOB_TYPE = "ADD_JOB_TYPE";
export const UPDATE_JOB_TYPE = "UPDATE_JOB_TYPE";

export const getJobType = () => {
  return async (dispatch) => {
    await Axios.get("/Account/Job_Type", HeaderToken())
      .then((res) => {
        dispatch({ type: JOB_TYPE, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const deleteJobType = (id) => {
  return async (dispatch) => {
    await Axios.delete(`/Account/deleteJob_Type/${id}`, HeaderToken()).then(
      (res) => {
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: DELETE_JOB_TYPE, payload: id });
        }
        if (res.data.result === "false") {
          toast.error(res.data.response);
        }
      }
    );
  };
};

export const addJobType = (data) => {
  return async (dispatch) => {
    await Axios.post("/Account/Job_Type", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "true") {
          toast.success("Successfuly Added");
          dispatch({
            type: ADD_JOB_TYPE,
            payload: res.data.response,
          });
        }
        if (res.data.result === "false") {
          toast.error(res.data.response);
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const updateJobType = (data) => {
  return async (dispatch) => {
    await Axios.put("/Account/Job_Type", data, HeaderToken())
      .then((res) => {
        if (res.data.result === "true") {
          console.log("update",res.data)
          toast.success("Successfully Updated");
          dispatch({
            type: UPDATE_JOB_TYPE,
            payload: res.data.response,
          });
        }
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};
