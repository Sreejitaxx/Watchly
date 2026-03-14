export const checkValidData = (email, password) => {
  const errors = {};

  const isEmailValid =
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  if (!isEmailValid) {
    errors.email = "Email is not valid";
  }

  if (!isPasswordValid) {
    errors.password =
      "Password must include uppercase, lowercase, number, special character and be 8+ characters long.";
  }

  if(isEmailValid && isPasswordValid) {
    errors.success = "Validation successful!";
  }

  return errors;
};