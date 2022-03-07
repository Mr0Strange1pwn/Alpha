import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const SET_SCREENSHOTS = "SET_SCREENSHOTS"
export const SET_WORK_TIME  = "SET_WORK_TIME "


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

export const getworkTime = (date)=>{
  let userData = JSON.parse(localStorage.getItem("userData"))
  let ID=userData.id
      return async (dispatch) => {
        await Axios.get(`/Employee/getTasksby_employeeid/${ID}?todaysDate=${date}`, HeaderToken())
          .then((res) => {
              console.log("work time res ",res.data)
            dispatch({ type: SET_WORK_TIME , payload: res.data.response });
          })
          .catch((err) => {
            toast.error("Network Error");
          });
      };
}