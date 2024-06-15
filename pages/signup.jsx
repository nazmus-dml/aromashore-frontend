import React, { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import Link from "next/link";
import { validate, validateProperty } from "../models/user";
import { register, validateUsername } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {apiUrl} from "../config";
import axios from "axios";

function Signup() {
	const router = useRouter();
	const [user, setUser] = useState({
		customercategoryId: "1",
		firstname: "",
		lastname: "",
		dial_code: "+1",
		contact: "",
		username: "",
		email: "",
		password: "",
		registerPolicyEmail: true,
		registerPolicySMS: true
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [allCountryList, setAllCountryList] = useState([{ dial_code: '+1', name: 'USA' }, { dial_code: '+880', name: 'BD' }]);

	// useEffect(() => {
	// 	axios.get(apiUrl + "/public/country").then(function (response) {
	// 		console.log(response);
	// 		if (response.status === 200 && !response.data["appStatus"]) {
	// 			setAllCountryList([]);
	// 		} else {
	// 			setAllCountryList(response.data["appData"]);
	// 		}
	// 	}).catch(function (error) {
	// 		console.log(error);
	// 	});
	// }, []);

	const handleChange = (e) => {
		var errorsCopy = { ...errors };
		const errorMessage = validateProperty(e.currentTarget);
		if (errorMessage) errorsCopy[e.currentTarget.name] = errorMessage;
		else delete errorsCopy[e.currentTarget.name];
		setErrors(errorsCopy);
		let userCopy = { ...user };
		userCopy[e.currentTarget.name] = e.currentTarget.value;
		setUser(userCopy);
	};

	const handleInputCheck = (e) => {
		let userCopy = { ...user };
		userCopy[e.currentTarget.name] = e.target.checked;
		setUser(userCopy);
	};

	const validateUser = async () => {
		if (user.username) {
			try {
				const { data } = await validateUsername(user.username);
				// console.log(data.appMessage);
				const errorsTemp = { ...errors };
				errorsTemp.username = data.appMessage;
				setErrors(errorsTemp);
			} catch (ex) {
				if (ex.response && ex.response.status === 400) {
					// console.log(errorsTemp);
					const errorsTemp = { ...errors };
					errorsTemp.username = ex.response.data;
					setErrors(errorsTemp);
				}
			}
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errorsCopy = validate(user);
		setErrors(errorsCopy);
		// console.log(errorsCopy);
		// console.log(user);
		if (errorsCopy) return;
		try {
			const { data } = await register(user);
			toast(data.appMessage);
			router.push('/');
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errorsTemp = { ...errors };
				errorsTemp.email = ex.response.data;
				setErrors(errorsTemp);
			}
		}
	};
	return (
		<>
			<ToastContainer />
			<Layout title='Register'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-12'>
							<div className='sign-up-section'>
								<div className='sign-up__card'>
									<div className='sign-up__card-body'>
										<div className='mt-2'>
											<p className='login-em'>Create Account</p>
										</div>
										<form className='mt-4' onSubmit={handleSubmit}>
											{/* <div className='row'>
												<div className='col-12'>
													<select name='customercategoryId' className='form-control myform-control mb-2' onChange={handleChange} value={user.customercategoryId}>
														<option value=''>----Sign Up as A---</option>
														{customerTypes.map((item, i) => {
															return (
																<option key={i} value={item.id}>
																	{item.title}
																</option>
															);
														})}
													</select>
													{errors && errors.customercategoryId && <div style={{ color: "red" }}>{errors.customercategoryId}</div>}
												</div>
											</div> */}
											<div className='row'>
												<div className='col-12 col-md-6'>
													<input className='form-control myform-control mb-2' type='text' name='firstname' value={user.firstname} onChange={handleChange} placeholder='First Name' />
													{errors && errors.firstname && <div style={{ color: "red" }}>{errors.firstname}</div>}
												</div>
												<div className='col-12 col-md-6'>
													<input className='form-control myform-control mb-2' type='text' name='lastname' value={user.lastname} onChange={handleChange} placeholder='Last Name' />
													{errors && errors.lastname && <div style={{ color: "red" }}>{errors.lastname}</div>}
												</div>
											</div>
											<div className='row'>
												<div className='col-12 col-md-6'>
													<input className='form-control myform-control mb-2' type='text' name='username' value={user.username} onBlur={validateUser} onChange={handleChange} placeholder='Username' />
													{errors && errors.username && <div style={{ color: "red" }}>{errors.username}</div>}
												</div>
												<div className='col-12 col-md-6'>
													<input className='form-control myform-control mb-2' style={{ paddingRight: '35px' }} type={showPassword ? 'text' : 'password'} name='password' value={user.password} onChange={handleChange} placeholder='Password' />
													{showPassword ? <i className="fa fa-eye" style={{ position: 'absolute', top: '11px', right: '24px' }} onClick={() => setShowPassword(false)}></i> :
														<i className="fa fa-eye-slash" style={{ position: 'absolute', top: '11px', right: '24px' }} onClick={() => setShowPassword(true)}></i>}
													{errors && errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
												</div>
											</div>
											<div className='row'>
												<div className='col-12 col-md-6'>
													<input className='form-control myform-control mb-2' type='text' name='email' value={user.email} onChange={handleChange} placeholder='Email' />
													{errors && errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
												</div>
												<div className='col-12 col-md-6'>
													<div className="d-flex justify-content-between">
														<select name="dial_code" id="dial_code" className="form-control myform-control mb-2" value={user.dial_code} onChange={handleChange} style={{ maxWidth: '95px' }}>
															{allCountryList.map(acl => <option key={acl.dial_code} value={acl.dial_code}>{acl.name} ({acl.dial_code})</option>)}
														</select>
														<div>
															<input className='form-control myform-control mb-2' type='text' name='contact' value={user.contact} onChange={handleChange} placeholder='Mobile Number' />
															{errors && errors.contact && <div style={{ color: "red" }}>{errors.contact}</div>}
														</div>
													</div>
												</div>
											</div>
											<div className='row myform-check'>
												<div className='col-12'>
													<label className='myform-check-label'>
														<input name='registerPolicyEmail' className='myform-check-input' checked={user.registerPolicyEmail} type='checkbox' onChange={handleInputCheck} />
														<span>Yes! Sign me up to receive email from Aroma Shore with the latest deals, sales &amp; updates.</span>
													</label>
												</div>
												<div className='col-12'>
													<label className='myform-check-label'>
														<input name='registerPolicySMS' className='myform-check-input' checked={user.registerPolicySMS} type='checkbox' onChange={handleInputCheck} />
														<span>Yes! Sign me up to receive SMS messages from Aroma Shore with the latest deals, sales &amp; updates.</span>
													</label>
												</div>
												<div className='col-12'>
													<br />
													<label>
														<p style={{ fontSize: '10px', lineHeight: '12px', color: '#999', margin: 0, fontStyle: 'italic' }}>
															By submitting this form, you agree to receive recurring automated promotional and personalized marketing text messages (e.g. new releases, order updates) from Aromashore at the cell number used when signing up. Consent is not a
															condition of any purchase. Reply HELP for help and STOP to cancel. Message frequency varies. Message &amp; Data Rates may apply.<br />View <a href=''>Terms &amp; Condition</a>
														</p>
													</label>
												</div>
											</div>
											<div className='row mt-4'>
												<div className='col-12'>
													<button className='btn my-btn btn-primary'>Sign Up</button>
												</div>
											</div>
											<div className='row mt-4'>
												<div className='col-12 text-center'>
													<Link href='/login' className="text-primary">
														Already have Account?
													</Link>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Signup;
// export async function getServerSideProps(context) {
// 	try {
// 		const { data } = await fetchCustomerTypes();
// 		return {
// 			props: {
// 				customerTypes: data.appData
// 			}
// 		};
// 	} catch (error) {
// 		return {
// 			props: {
// 				customerTypes: []
// 			}
// 		};
// 	}
// }
