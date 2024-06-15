import Joi from "joi-browser";

const model = {
  customer_id: Joi.number().required().label("Customer Id"),
  customer_name: Joi.string().required().label("Customer Name"),
  firstname: Joi.string().required().label("First Name"),
  lastname: Joi.string().required().label("Last Name"),
  country_name: Joi.string().required().label("Country"),
  address_line_one: Joi.string().required().label("Address Line One"),
  // address_line_two: Joi.string().required().label("Address Line Two"),
  city_name: Joi.string().required().label("Town/City"),
  state_name: Joi.string().required().label("Country/State"),
  zipcode: Joi.string().required().label("Postcode/ZIP"),
  // remarks: Joi.string().empty("").label("Order Note"),
  // coupon_code: Joi.string().empty("").label("Coupon code"),
  // paymentMethod: Joi.string().empty("").label("Payment Method"),
  // isSaveinfo: Joi.boolean().label("Save info"),
};
export var validate = (data) => {
  console.log(data)
  let schema = Joi.object(model);
  console.log(schema)
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
