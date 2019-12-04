export const validationCheck = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    //trim to get rid of the white space
    isValid = value.trim() !== "" && isValid; //check the prev state of isValid to make sure that it was true for all the rules
  }
  if (rules.isEmail) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
