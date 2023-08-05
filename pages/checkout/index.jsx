import React, { useContext, useState } from "react";
import Layout from "../../layouts/Layout";
// import InstagramSlider from "../components/productdetails/InstagramSlider";
import { AppStore } from "../../store/AppStore";
import { calculateCart } from "../../services/utilityService";
import { validate, validateProperty } from "../../models/shippingAddress";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import Cookies from "js-cookie";
import Link from "next/link";

function Checkout() {
  Cookies.set("Card_visited", true);
  const { cart } = useContext(AppStore);
  let { totalAmount } = calculateCart(cart);
  const personaldata = Cookies.get("personal-data");
  const personal_data = personaldata
    ? JSON.parse(personaldata)
    : [null, null, null, null];
//   console.log(personal_data.firstName);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: personal_data.firstname,
    lastName: personal_data.lastname,
    country: personal_data.country,
    address: personal_data.billing_address,
    address_line_one: personal_data.address_line_one,
    address_line_two: personal_data.address_line_two,
    town_city: personal_data.city,
    country_state: personal_data.state,
    postcode_zip: personal_data.zipcode,
    order_note: "",
    coupon_code: "",
    isSaveinfo: false,
    paymentMethod: "1",
  });
  const [errors, setErrors] = useState({});

  const state = State?.getStatesOfCountry(shippingAddress.country?.isoCode);
  const city = City.getCitiesOfState(
    shippingAddress.country_state?.countryCode,
    shippingAddress.country_state?.isoCode
  );

  const handleChange = (e) => {
    var errorsCopy = { ...errors };
    const errorMessage = validateProperty(e.currentTarget);
    if (errorMessage) errorsCopy[e.currentTarget.name] = errorMessage;
    else delete errorsCopy[e.currentTarget.name];
    setErrors(errorsCopy);
    let shippingAddressCopy = { ...shippingAddress };
    shippingAddressCopy[e.currentTarget.name] = e.currentTarget.value;
    setShippingAddress(shippingAddressCopy);
  };

  const handleSelect = (item, itemName) => {
    let shippingAddressCopy = { ...shippingAddress };
    shippingAddressCopy[itemName] = item;
    setShippingAddress(shippingAddressCopy);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    var errorsCopy = { ...errors };
    const errorMessage = validateProperty({ name, value });
    if (errorMessage) errorsCopy[name] = errorMessage;
    else delete errorsCopy[name];
    setErrors(errorsCopy);
    let shippingAddressCopy = { ...shippingAddress };
    shippingAddressCopy[name] = value;
    setShippingAddress(shippingAddressCopy);
  };
  const handleSubmit = (e) => {
    console.log("asdf", shippingAddress);
    e.preventDefault();
    const errorsCopy = validate(shippingAddress);
    setErrors(errorsCopy);
    if (errorsCopy) return;
  };
  return (
    <Layout>
      <div className="breadcrumb">
        <div className="container mt-3">
          <h2>Checkout</h2>
		  <ul className="p-0">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li className="active">Checkout</li>
          </ul>
        </div>
      </div>
      <div className="shop">
        <div className="container">
          <div className="checkout">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-7">
                  <form>
                    <div className="checkout__form">
                      <div className="checkout__form__shipping">
                        <div className="card">
                          <div className="card-header">Shipping Address</div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12 col-md-6 mb-2">
                                <div className="form-group">
                                  <label htmlFor="firstName">
                                    {" "}
                                    First Name&nbsp;<span className="text-danger">*</span>
                                  </label>
                                  <input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First name"
                                    value={shippingAddress.firstName}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.firstName && (
                                    <div style={{ color: "red" }}>
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-6 mb-2">
                                <div className="form-group">
                                  <label>
                                    Last Name&nbsp;<span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={shippingAddress.lastName}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.lastName && (
                                    <div style={{ color: "red" }}>
                                      {errors.lastName}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {/* <div className="col-12 col-md-12 mb-2">
                                <div className="form-group">
                                  <label>
                                    Address <span>*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Steet address"
                                    value={shippingAddress.address}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.address && (
                                    <div style={{ color: "red" }}>
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                              </div> */}
                              <div className="col-12 col-md-12 mb-2">
                                <div className="form-group">
                                  <label>
                                    Address Line One&nbsp;<span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Steet address"
                                    value={shippingAddress.address_line_one}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.address && (
                                    <div style={{ color: "red" }}>
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-12 mb-2">
                                <div className="form-group">
                                  <label>
                                    Address Line Two&nbsp;<span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Steet address"
                                    value={shippingAddress.address_line_two}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.address && (
                                    <div style={{ color: "red" }}>
                                      {errors.address}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 col-md-6 mb-2">
                                  <div className="form-group">
                                    <label>
                                      Country&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <Select
                                      options={Country.getAllCountries()}
                                      getOptionLabel={(options) => {
                                        return options["name"];
                                      }}
                                      getOptionValue={(options) => {
                                        return options["name"];
                                      }}
                                      value={shippingAddress.country}
                                      onChange={(item) =>
                                        handleSelect(item, "country")
                                      }
                                    />
                                    {errors && errors.country && (
                                      <div style={{ color: "red" }}>
                                        {errors.country}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* {state && state.length > 0 && ( */}
                                <div className="col-12 col-md-6 mb-2">
                                  <div className="form-group">
                                    <label>
                                      State&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <Select
                                      options={state}
                                      getOptionLabel={(options) => {
                                        return options["name"];
                                      }}
                                      getOptionValue={(options) => {
                                        return options["name"];
                                      }}
                                      value={shippingAddress.country_state}
                                      onChange={(item) =>
                                        handleSelect(item, "country_state")
                                      }
                                    />
                                    {errors && errors.country_state && (
                                      <div style={{ color: "red" }}>
                                        {errors.country_state}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* )}
                              {state && state.length > 0 && ( */}
                                <div className="col-12 col-md-6 mb-2">
                                  <div className="form-group">
                                    <label>
                                      City&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <Select
                                      options={state}
                                      getOptionLabel={(options) => {
                                        return options["name"];
                                      }}
                                      getOptionValue={(options) => {
                                        return options["name"];
                                      }}
                                      value={shippingAddress.town_city}
                                      onChange={(item) =>
                                        handleSelect(item, "town_city")
                                      }
                                    />
                                    {errors && errors.town_city && (
                                      <div style={{ color: "red" }}>
                                        {errors.town_city}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                  <div className="form-group">
                                    <label>
                                      Postcode/ZIP&nbsp;<span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      name="postcode_zip"
                                      placeholder="Postcode/ZIP"
                                      value={shippingAddress.postcode_zip}
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    {errors && errors.postcode_zip && (
                                      <div style={{ color: "red" }}>
                                        {errors.postcode_zip}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* )} */}
                              <div className="col-12 col-md-12 mb-2">
                                <div className="form-group">
                                  <label>Order note</label>
                                  <input
                                    type="text"
                                    name="order_note"
                                    placeholder="Note about your order, e.g, special noe for delivery"
                                    value={shippingAddress.order_note}
                                    onChange={handleChange}
                                    className="form-control"
                                  />
                                  {errors && errors.order_note && (
                                    <div style={{ color: "red" }}>
                                      {errors.order_note}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-12 col-md-12 mb-2">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="isSaveinfo"
                                    type="checkbox"
                                    value=""
                                    id="isSaveinfo"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isSaveinfo"
                                  >
                                    Save this infomation for next time
                                  </label>
                                  {errors && errors.isSaveinfo && (
                                    <div style={{ color: "red" }}>
                                      {errors.isSaveinfo}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-lg-5">
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-12 ml-auto">
                      <div className="checkout__total">
                        <h5 className="checkout-title">Your order</h5>

                        <div className="checkout__total__price">
                          {/* <h5>Product</h5> */}
                          <table>
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th className="text-center">Unit Price</th>
                                <th className="text-center">Total Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cart.map((product, i) => {
                                return product.units.map((unit, j) => {
                                  return (
                                    <tr key={(j + 1) * (j + 1)}>
                                      <td>
                                        <span>{unit.qty} x </span>
                                        {unit.quantity}-{unit.unit_name}{" "}
                                        {product.name}
                                      </td>
                                      <td className="text-center">
                                        {unit.sale_price > 0
                                          ? unit.sale_price
                                          : unit.price}
                                      </td>
                                      <td className="text-center">
                                        {unit.sale_price > 0
                                          ? unit.sale_price * unit.qty
                                          : unit.price * unit.qty}
                                      </td>
                                    </tr>
                                  );
                                });
                              })}
                            </tbody>
                          </table>
                          <div className="checkout__total__price__total-count">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Total</td>
                                  <td className="text-end">
                                    $&nbsp;{totalAmount}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="checkout__total__price__payment">
                            <label className="checkbox-label" htmlFor="payment">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={"1"}
                                onChange={handleChange}
                                checked={shippingAddress.paymentMethod == "1"}
								id="payment"
                              />
                              Cheque payment
                            </label>
                            <label className="checkbox-label" htmlFor="paypal">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={"2"}
                                onChange={handleChange}
								id="paypal"
                                checked={shippingAddress.paymentMethod == "2"}
                              />
                              PayPal
                            </label>
                          </div>
                        </div>

                        <Link
                          href={
                            shippingAddress.paymentMethod === "1"
                              ? "/card"
                              : "/paypal"
                          }
                          onClick={handleSubmit}
                        >
                          <button className="btn -red">Place order</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InstagramSlider /> */}
    </Layout>
  );
}

export default Checkout;

export async function getServerSideProps(context) {
	try {
	  const user = context.req.cookies.user
		? JSON.parse(context.req.cookies.user)
		: null;
  
	  if (!user) {
		return {
		  redirect: {
			destination: "/login",
		  },
		};
	  }
	  return {
		props: {
		  user: user
		},
	  };
	} catch (error) {
	  return {
		props: {
		  user: {},
		},
	  };
	}
  }

// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }

// import React, { useContext, useState } from "react";
// import Layout from "../../layouts/Layout";
// import InstagramSlider from "../../components/productdetails/InstagramSlider";
// import { AppStore } from "../../store/AppStore";
// import { calculateCart } from "../../services/utilityService";
// import { validate, validateProperty } from "../../models/shippingAddress";
// import Link from "next/link";
// function Checkout() {
// 	const { cart } = useContext(AppStore);
// 	let { totalAmount } = calculateCart(cart);
// 	const [shippingAddress, setShippingAddress] = useState({
// 		firstName: "",
// 		lastName: "",
// 		country: "",
// 		address: "",
// 		town_city: "",
// 		country_state: "",
// 		postcode_zip: "",
// 		order_note: "",
// 		coupon_code: "",
// 		isSaveinfo: false,
// 		paymentMethod: "1"
// 	});
// 	const [errors, setErrors] = useState({});

// 	const handleChange = (e) => {
// 		var errorsCopy = { ...errors };
// 		const errorMessage = validateProperty(e.currentTarget);
// 		if (errorMessage) errorsCopy[e.currentTarget.name] = errorMessage;
// 		else delete errorsCopy[e.currentTarget.name];
// 		setErrors(errorsCopy);
// 		let shippingAddressCopy = { ...shippingAddress };
// 		shippingAddressCopy[e.currentTarget.name] = e.currentTarget.value;
// 		setShippingAddress(shippingAddressCopy);
// 	};
// 	const handleInputChange = (event) => {
// 		const target = event.target;
// 		const value = target.type === "checkbox" ? target.checked : target.value;
// 		const name = target.name;
// 		var errorsCopy = { ...errors };
// 		const errorMessage = validateProperty({ name, value });
// 		if (errorMessage) errorsCopy[name] = errorMessage;
// 		else delete errorsCopy[name];
// 		setErrors(errorsCopy);
// 		let shippingAddressCopy = { ...shippingAddress };
// 		shippingAddressCopy[name] = value;
// 		setShippingAddress(shippingAddressCopy);
// 	};
// 	const handleSubmit = async (e) => {
// 		console.log("asdf", shippingAddress);
// 		e.preventDefault();
// 		const errorsCopy = validate(shippingAddress);
// 		setErrors(errorsCopy);
// 		if (errorsCopy) return;
// 	};
// 	const applyCouponCode = (e) => {
// 		e.preventDefault();
// 		console.log("Apply Cuppon Code");
// 	};
// 	return (
// 		<Layout>
// 			<div className='breadcrumb'>
// 				<div className='container'>
// 					<h2>Checkout</h2>
// 					<ul>
// 						<li>Home</li>
// 						<li>Shop</li>
// 						<li className='active'>Checkout</li>
// 					</ul>
// 				</div>
// 			</div>
// 			<div className='shop'>
// 				<div className='container'>
// 					<div className='checkout'>
// 						<div className='container'>
// 							<div className='row'>
// 								<div className='col-12 col-lg-7'>
// 									<form>
// 										<div className='checkout__form'>
// 											<div className='checkout__form__shipping'>
// 												<h5 className='checkout-title'>Shipping address</h5>
// 												<div className='row'>
// 													<div className='col-12 col-md-6 mb-2'>
// 														<div className='form-group'>
// 															<label for='firstName'>
// 																{" "}
// 																First name <span>*</span>
// 															</label>
// 															<input id='firstName' name='firstName' placeholder='First name' value={shippingAddress.firstName} onChange={handleChange} className='form-control' />
// 															{errors && errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-6 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Last name<span>*</span>
// 															</label>
// 															<input type='text' name='lastName' placeholder='Last name' value={shippingAddress.lastName} onChange={handleChange} className='form-control' />
// 															{errors && errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Country<span>*</span>
// 															</label>
// 															<input type='text' name='country' placeholder='Country' value={shippingAddress.country} onChange={handleChange} className='form-control' />
// 															{errors && errors.country && <div style={{ color: "red" }}>{errors.country}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Address <span>*</span>
// 															</label>
// 															<input type='text' name='address' placeholder='Steet address' value={shippingAddress.address} onChange={handleChange} className='form-control' />
// 															{errors && errors.address && <div style={{ color: "red" }}>{errors.address}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Town/City <span>*</span>
// 															</label>
// 															<input type='text' name='town_city' placeholder='Town/City' value={shippingAddress.town_city} onChange={handleChange} className='form-control' />
// 															{errors && errors.town_city && <div style={{ color: "red" }}>{errors.town_city}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Country/State <span>*</span>
// 															</label>
// 															<input type='text' name='country_state' placeholder='Country/State' value={shippingAddress.country_state} onChange={handleChange} className='form-control' />
// 															{errors && errors.country_state && <div style={{ color: "red" }}>{errors.country_state}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>
// 																Postcode/ZIP <span>*</span>
// 															</label>
// 															<input type='text' name='postcode_zip' placeholder='Postcode/ZIP' value={shippingAddress.postcode_zip} onChange={handleChange} className='form-control' />
// 															{errors && errors.postcode_zip && <div style={{ color: "red" }}>{errors.postcode_zip}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-group'>
// 															<label>Order note</label>
// 															<input type='text' name='order_note' placeholder='Note about your order, e.g, special noe for delivery' value={shippingAddress.order_note} onChange={handleChange} className='form-control' />
// 															{errors && errors.order_note && <div style={{ color: "red" }}>{errors.order_note}</div>}
// 														</div>
// 													</div>
// 													<div className='col-12 col-md-12 mb-2'>
// 														<div className='form-check'>
// 															<input className='form-check-input' name='isSaveinfo' type='checkbox' value='' id='isSaveinfo' />
// 															<label className='form-check-label' for='isSaveinfo'>
// 																Save this infomation for next time
// 															</label>
// 															{errors && errors.isSaveinfo && <div style={{ color: "red" }}>{errors.isSaveinfo}</div>}
// 														</div>
// 													</div>
// 												</div>
// 											</div>
// 										</div>
// 									</form>
// 								</div>
// 								<div className='col-12 col-lg-5'>
// 									<div className='row'>
// 										<div className='col-12 col-md-6 col-lg-12 ml-auto'>
// 											<div className='checkout__total'>
// 												<h5 className='checkout-title'>Your order</h5>
// 												<form className='checkout__total__coupon'>
// 													<h5>Coupon code</h5>
// 													<div className='input-validator'>
// 														<input type='text' placeholder='Your code here' name='coupon_code' value={shippingAddress.coupon_code} onChange={handleChange} />
// 														{errors && errors.coupon_code && <div style={{ color: "red" }}>{errors.coupon_code}</div>}
// 													</div>
// 													<a className='btn -dark' onClick={applyCouponCode} href='#'>
// 														apply
// 													</a>
// 												</form>
// 												<div className='checkout__total__price'>
// 													{/* <h5>Product</h5> */}
// 													<table>
// 														<thead>
// 															<tr>
// 																<th style={{ textAlign: "left" }}>Product</th>
// 																<th style={{ textAlign: "left" }}>Unit Price</th>
// 																<th style={{ textAlign: "left" }}>Total Price</th>
// 															</tr>
// 														</thead>
// 														<tbody>
// 															{cart.map((product, i) => {
// 																return product.units.map((unit, j) => {
// 																	return (
// 																		<tr key={(j + 1) * (j + 1)}>
// 																			<td>
// 																				<span>{unit.qty} x </span>
// 																				{unit.quantity}-{unit.unit_name} {product.name}
// 																			</td>
// 																			<td>{unit.sale_price > 0 ? unit.sale_price : unit.price}</td>
// 																			<td>{unit.sale_price > 0 ? unit.sale_price * unit.qty : unit.price * unit.qty}</td>
// 																		</tr>
// 																	);
// 																});
// 															})}
// 														</tbody>
// 													</table>
// 													<div className='checkout__total__price__total-count'>
// 														<table>
// 															<tbody>
// 																<tr>
// 																	<td>Subtotal</td>
// 																	<td>BDT{totalAmount}</td>
// 																</tr>
// 																<tr>
// 																	<td>Total</td>
// 																	<td>BDT{totalAmount}</td>
// 																</tr>
// 															</tbody>
// 														</table>
// 													</div>
// 													<div className='checkout__total__price__payment'>
// 														<label className='checkbox-label' htmlFor='payment'>
// 															<input type='radio' name='paymentMethod' value={"1"} onChange={handleChange} checked={shippingAddress.paymentMethod == "1"} />
// 															Cheque payment
// 														</label>
// 														<label className='checkbox-label' htmlFor='paypal'>
// 															<input type='radio' name='paymentMethod' value={"2"} onChange={handleChange} checked={shippingAddress.paymentMethod == "2"} />
// 															PayPal
// 														</label>
// 													</div>
// 												</div>
// 												<Link onClick={handleSubmit} href={shippingAddress.paymentMethod === "1" ? "/checkout/card" : "/checkout/paypal"}>
// 													<span className='btn -red'>Place order</span>
// 												</Link>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<InstagramSlider />
// 		</Layout>
// 	);
// }

// export default Checkout;
// export async function getServerSideProps(context) {
// 	return {
// 		props: {}
// 	};
// }
