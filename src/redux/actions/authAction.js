import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";

export const LOG_IN = "LOG_IN";
export const SIGN_UP = "SIGN_UP";
export const LOG_OUT = "LOG_OUT";
export const FORGOT_PASS = "FORGOT_PASS";
export const RESET_PASS = "RESET_PASS";
export const CHANGE_PASS = "CHANGE_PASS";
// export const logIn = (data) => {
//     return dispatch => {
//         return dispatch({
//             type: LOG_IN,
//             payload: data
//         })
//     }
// }

export const change = (changeData) => {
  return async (dispatch) => {
    await Axios.post('/changepassword', changeData)
      .then((res) => {
        console.log("changeres", res)
        if (res.data.result === false) {
          toast.error(res.data.response);
          dispatch({ type: CHANGE_PASS, payload: res.data });
        }
        if (res.data.result === true) {
          toast.success(res.data.response);
          dispatch({ type: CHANGE_PASS, payload: res.data });
        }
        if (res.status === 400) {
          toast.success("The password and confirmation password do not match.");
          dispatch({ type: CHANGE_PASS, payload: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("The password and confirmation password do not match.");
      });
  };
};
export const reset = (resData) => {
  console.log("datassss", resData);
  return async (dispatch) => {
    await Axios.post("/resetpassword", resData).then((res) => {
      console.log("resetres", res.data);
      if (res.data.result === true) {
        toast.success(res.data.response);
        dispatch({ type: RESET_PASS, payload: res.data });
      }
    });
  };
};

export const forgot = (useremail) => {
  return async (dispatch) => {
    await Axios.post(`forgotPassword?email=${useremail}`).then(
      (res) => {
        console.log("res", res);
        if (res.data.result === false) {
          toast.warn("Email not exist");
        }
        if (res.data.result === true) {
          toast.success("Reset password link sent to your email");
          dispatch({ type: FORGOT_PASS, payload: res.data });
        }
      }
    );
  };
};

export const logIn = (userInfo) => {

  return async (dispatch) => {
    await Axios.post("/login", userInfo)
      .then((res) => {
        console.log("resssss sss", res.data.message);
        if (res.data === "Email not exist") {
          toast.warn("Email not exist");
        }
        if (res.data === "password not matched") {
          toast.warn("password not matched");
        }
        if (res.data.message === "Invalid login attempt or email not validated! Please try again.") {
          // alert("asf")
          // toast.error("Invalid login attempt or email not validated! Please try again.");
          dispatch({ type: "SET_ERROR_MSG", payload: "Invalid login attempt or email not validated! Please try again." });

        }
        if (res.data.message === "User logged in successfully!") {
          toast.success("Login Success");
          localStorage.setItem("userData", JSON.stringify(res.data));
          if (userInfo.rememberMe === true) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          } else {
            localStorage.removeItem("userInfo");
          }

          dispatch({ type: LOG_IN, payload: res.data });
        }
      })
      .catch((err) => {
        // toast.error("Login failed");
        dispatch({ type: "SET_ERROR_MSG", payload: "Login Failed" });
      });
  };
};

export const signUp = (data) => {
  return (dispatch) => {
    return dispatch({
      type: SIGN_UP,
      payload: data,
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    return dispatch({
      type: LOG_OUT,
    });
  };
};
