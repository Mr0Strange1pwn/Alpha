import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const SET_SCREENSHOTS = "SET_SCREENSHOTS"



export const getSS = () => {
    let userData = JSON.parse(localStorage.getItem("userData"))
let ID=userData.id
    return async (dispatch) => {
      await Axios.get(`/Screenshot/ScreenshortCapture?user_id=${ID}`, HeaderToken())
        .then((res) => {
            console.log("ss res ",res)
          dispatch({ type: SET_SCREENSHOTS, payload: res.data });
        })
        .catch((err) => {
          toast.error("Network Error");
        });
    };
  };