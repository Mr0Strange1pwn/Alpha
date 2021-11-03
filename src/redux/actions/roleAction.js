import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";

export const ADD_ROLE = "ADD_ROLE";
export const ROLE_LIST = "ROLE_LIST"

export const AddRolePermission = (data) => {
    return dispatch => {
        return dispatch({
            type: ADD_ROLE,
            payload: data
        })
    }
}
export const roleLIst = (data) => {
    return async (dispatch) => {
        await Axios.get("/fetchgridInfo").then(
          (res) => {
            console.log("resfetchgridInfo", res.data);
            dispatch({ type: ROLE_LIST, payload: res.data });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}


