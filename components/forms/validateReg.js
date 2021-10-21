export default function validateReg(values) {
  let errors = {};

  !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values?.email) &&
    (errors.email = "Invalid email");

  !values?.password && (errors.password = "Password is required");

  values?.confirmedPassword !== values?.password &&
    (errors.confirmedPassword = "Both password fields must be the same");

  !values?.name && (errors.name = "Name is required");

  !values?.role && (errors.role = "Role is required");

  return errors;
}
