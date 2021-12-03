import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const ADD_ROLE = "ADD_ROLE";
export const ROLE_LIST = "ROLE_LIST";
export const DELETE_ROLE = "DELETE_ROLE";

export const AddRoleAPI = (selectedValue, History) => {
  return async (dispatch) => {
    await Axios.post("/Account/addroles", selectedValue, HeaderToken())
      .then((res) => {
        console.log("response", res.data);
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: ADD_ROLE, payload: res.data });
          History.push("/Rolespermission");
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

export const deleteRole = (id) => {
 
  return async (dispatch) => {
    await Axios.delete(`/Account/roles?roleid=${id}`,HeaderToken())
      .then((res) => {
        console.log("ress", res.data);
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: DELETE_ROLE, payload: res.data });
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
export const roleLIst = () => {
  return async (dispatch) => {
    await Axios.get("/Account/roles", HeaderToken())
      .then((res) => {
        console.log("res.data", res.data);
        dispatch({ type: ROLE_LIST, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};
