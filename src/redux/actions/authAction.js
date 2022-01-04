import { Axios } from "../../Utils/axios";
import { toast } from "react-toastify";
import { HeaderToken } from "../../Utils/headerToken";
export const LOG_IN = "LOG_IN";
export const SIGN_UP = "SIGN_UP";
export const LOG_OUT = "LOG_OUT";
export const FORGOT_PASS = "FORGOT_PASS";
export const RESET_PASS = "RESET_PASS";
export const CHANGE_PASS = "CHANGE_PASS";

export const change = (changeData, logintoken, History) => {
  Axios.defaults.headers.common = {
    Authorization: `Token ${logintoken}`,
  };

  return async (dispatch) => {
    await Axios.post("/Account/changepassword", changeData)
      .then((res) => {
        if (res.data.result === "false") {
          toast.error(res.data.response);
        }
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: CHANGE_PASS, payload: res.data });
          History.push("/");
        }
      })
      .catch((err) => {
        toast.error("The password and confirmation password do not match.");
      });
  };
};

export const reset = (resData, token, routeChange) => {
  return async (dispatch) => {
    await Axios.post("/Account/resetpassword", resData, HeaderToken()).then(
      (res) => {
        if (res.data.result === "true") {
          toast.success(res.data.response);
          dispatch({ type: RESET_PASS, payload: res.data });
          routeChange();
        }
        if (res.data.result === "false") {
          toast.warn(res.data.response);
        }
      }
    );
  };
};

export const forgot = (useremail) => {
  let forgetData = {
    email: useremail,
    redirecturl: "http://localhost:3000/resetPassword/",
  };

  return async (dispatch) => {
    await Axios.post("/Account/forgotPassword", forgetData).then((res) => {
      if (res.data.result === "false") {
        toast.warn("Email not exist");
      }
      if (res.data.result === "true") {
        toast.success(
          "Reset password link sent to your email please check your mail"
        );
        dispatch({ type: FORGOT_PASS, payload: res.data });
      }
    });
  };
};

export const logIn = (userInfo) => {
  return async (dispatch) => {
    await Axios.post("/Account/login", userInfo)
      .then((res) => {
        if (res.data === "Email not exist") {
          toast.warn("Email not exist");
        }
        if (res.data === "password not matched") {
          toast.warn("password not matched");
        }
        if (res.data.status === "Fail") {
          dispatch({
            type: "SET_ERROR_MSG",
            payload:
              "Invalid login attempt or email not validated! Please try again.",
          });
        }
        if (res.data.status === "Success") {
          toast.success("Login Success");
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          if (userInfo.rememberMe === true) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          } else {
            localStorage.removeItem("userInfo");
          }

          dispatch({ type: LOG_IN, payload: res.data });
        }
      })
      .catch((err) => {
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
    localStorage.removeItem("userData");
    return dispatch({
      type: LOG_OUT,
    });
  };
};
