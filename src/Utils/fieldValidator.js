export const emailValidator = (val) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isV = re.test(val);
  return isV;
};

export const passwordValidator = (val) => {
  let Errors = [];
  var lowerCaseLetters = /[a-z]/g;
  if (!val.match(lowerCaseLetters)) {
    Errors.push("Pawweord must contain a lower case");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (!val.match(upperCaseLetters)) {
    Errors.push("Pawweord must contain a capital letter");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (!val.match(numbers)) {
    Errors.push("Pawweord must contain a number");
  }

  // Validate length
  if (val.length < 8) {
    Errors.push("Pawweord must contain 8 or more cheracters");
  }

  var SC = /[!@#$%^&*]/g;
  if (!val.match(SC)) {
    Errors.push("Pawweord must contain a spacial character !@#$%^&* ");
  }

  if (Errors.length > 0) {
    return false;
  } else {
    return true;
  }
};
