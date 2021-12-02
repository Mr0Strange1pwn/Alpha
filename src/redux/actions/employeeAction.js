import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const EMP_LIST = "EMP_LIST"
export const EMP_DESIGNATION = "EMP_DESIGNATION"
export const EMP_ROLE="EMP_ROLE"
export const EMP_SAVE="EMP_SAVE"
export const EMP_EMPLOYES = "EMP_EMPLOYES"

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

export const getDesignitations =()=>{
  return async (dispatch) => {
    await Axios.get("/Account/Designation",HeaderToken()).then(
      (res) => {
          // console.log("ress", res.data)
        dispatch({ type: EMP_DESIGNATION, payload: res.data });
      }
    )
    .catch((err) => {
         toast.error("Network Error");
      });
  };
}

export const getRoles =()=>{
  return async (dispatch) => {
    await Axios.get("/Account/roles",HeaderToken()).then(
      (res) => {
          // console.log("ress roles", res.data.response)
        dispatch({ type: EMP_ROLE, payload: res.data.response });
      }
    )
    .catch((err) => {
         toast.error("Network Error");
      });
  };
}


export const saveEmployee = (data) => {
  return async (dispatch) => {
      await Axios.post("/Employee/save",data,HeaderToken()).then(
        (res) => {
            console.log("ress", res)
            if(res.data.result=="False"){
              toast.error(res.data.response);
            }else{
              dispatch({ type: EMP_SAVE, payload: res.data.employee })
            }
         // dispatch({ type: EMP_SAVE, payload: res.data.response });
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const getEmployes =()=>{
  return async (dispatch) => {
    await Axios.get("/Employee/all",HeaderToken()).then(
      (res) => {
          // console.log("ress roles", res.data.response)
        dispatch({ type: EMP_EMPLOYES, payload: res.data.response });
      }
    )
    .catch((err) => {
         toast.error("Network Error");
      });
  };
}

export const uploadDocument = (data) => {
  return async (dispatch) => {
      await Axios.post("/Document/upload",data,HeaderToken()).then(
        (res) => {
            console.log("ress", res)
            if(res.data.result=="False"){
              toast.error(res.data.response);
            }else{
            //  dispatch({ type: EMP_SAVE, payload: res.data.employee })
            }
         // dispatch({ type: EMP_SAVE, payload: res.data.response });
        }
      )
      .catch((err) => {
           toast.error("Network Error");
        });
    };
}

export const deleteEmployee =(id)=>{
  return async (dispatch) => {
    let formData = new FormData
    formData.id = id
    await Axios.delete("/Employee/save",HeaderToken(),formData).then(
      (res) => {
          console.log("ress", res)
          if(res.data.result=="False"){
            toast.error(res.data.response);
          }else{
            toast.success("deleted");
          //  dispatch({ type: EMP_SAVE, payload: res.data.employee })
          }
       // dispatch({ type: EMP_SAVE, payload: res.data.response });
      }
    )
    .catch((err) => {
         toast.error("Network Error");
      });
  };
}