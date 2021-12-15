import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const JOB_TYPE = "JOB_TYPE"

export const getJobType = () => {
  return async (dispatch) => {
    await Axios.get("/Account/Job_Type", HeaderToken())
      .then((res) => {
        console.log("res.data", res.data);
        dispatch({ type: JOB_TYPE, payload: res.data.response });
      })
      .catch((err) => {
        toast.error("Network Error");
      });
  };
};

