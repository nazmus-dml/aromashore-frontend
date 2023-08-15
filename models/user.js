import Joi from "joi-browser";
const model = {
  customercategoryId: Joi.string().required().label("Customer Type"),
  firstname: Joi.string().required().label("First Name"),
  lastname: Joi.string().required().label("Last Name"),
  contact: Joi.string().required().label("Mobile No"),
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Password"),
  registerPolicyEmail: Joi.boolean().required().label("Register Policy Email"),
  registerPolicySMS: Joi.boolean().required().label("Register Policy SMS"),
  // registerPolicy: Joi.boolean().required().label("Register Policy"),
};
const loginModel = {
  contact: Joi.string().required().label("Mobile No"),
  password: Joi.string().required().label("Password"),
  rememberMe: Joi.boolean().required().label("Register Policy"),
};

const changePasswordModel = {
  previousPassword: Joi.string().required().label("Previous Password"),
  newPassword: Joi.string().required().label("New Password"),
  repeatPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("Retype New Password")
    .options({
      language: {
        any: {
          allowOnly: "must match New Password",
        },
      },
    }),
};

export var validate = (data) => {
  let schema = Joi.object(model);
  let options = {abortEarly: false};
  let result = schema.validate(data, options);
  if (!result.error) return null;
  var errors = {};
  for (let item of result.error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};
export var loginValidate = (data) => {
  let schema = Joi.object(loginModel);
  let options = {abortEarly: false};
  let result = schema.validate(data, options);
  if (!result.error) return null;
  var errors = {};
  for (let item of result.error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};
export function validateProperty({name, value}) {
  const obj = {[name]: value};
  let schema = Joi.object({
    [name]: model[name],
  });
  let result = schema.validate(obj);
  const {error} = result;
  if (!error) return null;
  return error.details[0].message;
}

export const validatePasswordChange = (data) => {
  let schema = Joi.object(changePasswordModel);
  let options = {abortEarly: false};
  let result = schema.validate(data, options);
  if (!result.error) return null;
  var errors = {};
  for (let item of result.error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};
