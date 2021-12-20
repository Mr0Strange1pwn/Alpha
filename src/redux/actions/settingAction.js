import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const GET_Designation = "GET_Designation";
export const DELETE_DESIGNATION = "DELETE_DESIGNATION";
export const ADD_DESIGNATION = "ADD_DESIGNATION";
export const UPDATE_DESIGNATION = "UPDATE_DESIGNATION"

export const getDesignation = () => {
  return async (dispatch) => {
    await Axios.get("/Account/Designation", HeaderToken())
      .then((res) => {
        console.log("designation res", res.data);
        dispatch({ type: GET_Designation, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const deleteDesignation = (id) => {
  return async (dispatch) => {
    await Axios.delete(`/Account/deleteDesignation/${id}`, HeaderToken())
      .then((res) => {
        console.log("ressdeleteDesignation", res.data);
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: DELETE_DESIGNATION, payload: id });
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

export const addDesignation = (data) => {
  return async (dispatch) => {
    await Axios.post("/Account/Designation", data, HeaderToken())
      .then((res) => {
        console.log("addDesignation", res.data);
        if (res.data.result === "true") {
            toast.success("Successfuly Added");
          dispatch({
            type: ADD_DESIGNATION,
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

export const updateDesignation = (data) => {
    return async (dispatch) => {
        await Axios.put("/Account/Designation",data,HeaderToken())
        .then((res) => {
            console.log("updatedesignation",res.data)
            if (res.data.result === "true") {
            toast.success("Successfully Updated");
            dispatch({
                type: UPDATE_DESIGNATION,
                payload:res.data.response
            })
        }
        })
        .catch((err) => {
            toast.error("Network Error")
        })
    }
}