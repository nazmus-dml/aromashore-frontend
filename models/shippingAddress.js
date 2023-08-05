import Joi from "joi-browser";
const model = {
  userId: Joi.string().required().label("User"),
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  country: Joi.string().required().label("Country"),
  address: Joi.string().required().label("Address"),
  town_city: Joi.string().required().label("Town/City"),
  country_state: Joi.string().required().label("Country/State"),
  postcode_zip: Joi.string().required().label("Postcode/ZIP"),
  order_note: Joi.string().empty("").label("Order note"),
  coupon_code: Joi.string().empty("").label("Coupon code"),
  paymentMethod: Joi.string().empty("").label("Payment Method"),
  isSaveinfo: Joi.boolean().label("Save info"),
};
export var validate = (data) => {
  let schema = Joi.object(model);
  let options = { abortEarly: false };
  let result = schema.validate(data, options);
  if (!result.error) return null;
  var errors = {};
  for (let item of result.error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};
export function validateProperty({ name, value }) {
  const obj = { [name]: value };
  let schema = Joi.object({
    [name]: model[name],
  });
  let result = schema.validate(obj);
  const { error } = result;
  if (!error) return null;
  return error.details[0].message;
}
