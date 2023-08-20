import Joi from "joi-browser";

const model = {
  card_type: Joi.string().required().label("Card Type"),
  name_on_card: Joi.string().required().label("Name on Card"),
  card_number: Joi.string().required().label("Card Number"),
  cvv: Joi.string().required().label("CVV"),
  expiration_date: Joi.date().required().label("Expiration Date"),

  address: Joi.string().required().label("Address"),

  country: Joi.number().required().label("Country"),
  country_code: Joi.number().label("Country Code"),
  country_name: Joi.string().label("Country Name"),

  state: Joi.number().required().label("State"),
  state_code: Joi.number().label("State Code"),
  state_name: Joi.string().label("State Name"),

  city: Joi.required().label("City"),
  city_name: Joi.string().label("City Name"),

  zipcode: Joi.string().required().label("Zip Code"),
  phone_number: Joi.string().required().label("Phone Number"),
  status: Joi.number().label("Status"),
};

export var bankingCardValidate = (data) => {
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