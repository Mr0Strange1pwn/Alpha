export const HeaderToken = () => {
let userData = JSON.parse(localStorage.getItem("userData"))
let token=userData.token
  let config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  return config;

};
