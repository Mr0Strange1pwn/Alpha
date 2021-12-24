import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const ADD_ROLE = "ADD_ROLE";
export const ROLE_LIST = "ROLE_LIST";
export const DELETE_ROLE = "DELETE_ROLE";
export const ROLE_DETAIL = "ROLE_DETAIL";
export const ROLE_SAVE = "ROLE_SAVE";
export const FILTER_ROLE = "FILTER_ROLE";

export const AddRoleAPI = (selectedValue, History) => {
  return async (dispatch) => {
    await Axios.post("/Account/addroles", selectedValue, HeaderToken())
      .then((res) => {
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
    await Axios.delete(`/Account/deleterole/${id}`, HeaderToken())
      .then((res) => {
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: DELETE_ROLE, payload: id });
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
        dispatch({ type: ROLE_LIST, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const getRoleById = (id) => {
  return async (dispatch) => {
    await Axios.get(`/Account/getrole/${id}`, HeaderToken())
      .then((res) => {
        dispatch({ type: ROLE_DETAIL, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const saveRoleUpdate = (updatedData, History) => {
  return async (dispatch) => {
    await Axios.put("/Account/roles", updatedData, HeaderToken())
      .then((res) => {
        if (res.data.result == "False") {
          toast.error(res.data.response);
        } else {
          dispatch({ type: ROLE_SAVE, payload: res.data });
          History.push("/Rolespermission");
        }
        // dispatch({ type: EMP_SAVE, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

export const filterRole = (data) => {
  return async (dispatch) => {
    await Axios.post("/Account/filterrole/",data, HeaderToken())
     .then((res) => {
      if(res.data.result == "False") {
        toast.error(res.data.response);
      }else {
        dispatch({type:FILTER_ROLE, payload:res.data.response})
      }
     })

  }
}