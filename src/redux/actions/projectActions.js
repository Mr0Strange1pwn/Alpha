import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";

export const PROJECT = "PROJECT"
export const ADD_PROJECT = "ADD_PROJECT"

export const getProducts = () => {
    return async (dispatch) => {
        await Axios.get("/Projects/project",HeaderToken()).then(
          (res) => {
              console.log("ress", res.data)
            dispatch({ type: PROJECT, payload: res.data.response });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}

export const addProject = (data)=>{
    return async (dispatch) => {
        await Axios.post("/Projects/project",data,HeaderToken()).then(
          (res) => {
              console.log("ress /Projects/project", res.data)
            dispatch({ type: ADD_PROJECT , payload: res.data.response });
          }
        )
        .catch((err) => {
             toast.error("Network Error");
          });
      };
}