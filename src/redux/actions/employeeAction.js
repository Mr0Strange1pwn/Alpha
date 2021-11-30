import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const EMP_LIST = "EMP_LIST"

export const empLIst = () => {
    return async (dispatch) => {
        await Axios.get("/Employee/save",HeaderToken()).then(
          (res) => {
              console.log("ress", res.data)
            dispatch({ type: EMP_LIST, payload: res.data.response });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}