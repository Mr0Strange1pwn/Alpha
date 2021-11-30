import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const ADD_ROLE = "ADD_ROLE";
export const ROLE_LIST = "ROLE_LIST"

export const AddRoleAPI = (selectedValue) => {
    return async (dispatch) => {
        await Axios.post("/saveRolesAndPermissions",selectedValue).then(
          (res) => {
              console.log("resdsf",res.data)
              if (res.data.result === true) {
                toast.success(res.data.response);
                dispatch({ type: ADD_ROLE, payload: res.data });
              }
           
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}
export const roleLIst = () => {
    return async (dispatch) => {
        await Axios.get("/Account/roles",HeaderToken()).then(
          (res) => {
            console.log("res.data",res.data)
            dispatch({ type: ROLE_LIST, payload: res.data.response });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}


