import React, { useState, useContext } from "react";
import Link from "next/link";
import Layout from "../layouts/Layout";
import { loginValidate, validateProperty } from "../models/user";
import { login } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppStore } from "../store/AppStore";
import Router from "next/router";

function Login({ previousUrl }) {
	const { setUSER, user: loadUser } = useContext(AppStore);
	const [user, setUser] = useState({
		contact: "",
		password: "",
		rememberMe: false
	});
	const [errors, setErrors] = useState({});

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errorsCopy = loginValidate(user);
		setErrors(errorsCopy);
		if (errorsCopy) return;
		try {
			let data = await login(user);
			toast(data.appMessage);
			if (data.appStatus == false) return;
			setUSER(data.appData);
			Router.push(previousUrl);
		} catch (error) {}
	};

	return (
		<>
			<ToastContainer />
			<Layout title='Login'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-12'>
							<div className='sign-in-section'>
								<div className='sign-up__card'>
									<div className='sign-up__card-body'>
										<div className='mt-4'>
											<p className='login-em'>Login Form</p>
										</div>
										<form className='mt-4' onSubmit={handleSubmit}>
											<div className='myform-group'>
												<div className='col-12'>
													<input className='form-control myform-control' type='text' name='contact' value={user.contact} onChange={handleChange} placeholder='Enter Mobile Number' />
													{errors && errors.contact && <div style={{ color: "red" }}>{errors.contact}</div>}
												</div>
											</div>
											<div className='myform-group'>
												<div className='col-12'>
													<input className='form-control myform-control' type='password' name='password' value={user.password} onChange={handleChange} placeholder='Enter Password' />
													{errors && errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
												</div>
											</div>
											{/* <div className='myform-group myform-check'>
												<div className='col-12'>
													<label className='myform-check-label'>
														<input className='myform-check-input' name='rememberMe' checked={user.registerPolicy} type='checkbox' onChange={handleInputCheck} />
														<span>Remember me</span>
													</label>
												</div>
											</div> */}
											<div className='myform-group mt-4'>
												<div className='col-12'>
													<button className='btn my-btn -red'>Login</button>
												</div>
											</div>
											<div className='myform-group row mt-4'>
												<div className='col-7'>
													<a className='my-link' href=''>
														Forgot your password?
													</a>
												</div>
												<div className='col-5 text-right'>
													<Link href='/signup'>
														<span className='my-link'>Create an account</span>
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

export default Login;

export async function getServerSideProps(context) {
	console.log("LOGIN -- getServerSideProps", context.req.headers.referer);
	const previousUrl = context.req.headers.referer ? context.req.headers.referer : "/";
	try {
		const user = context.req.cookies.user ? JSON.parse(context.req.cookies.user) : null;
		if (user) {
			return {
				redirect: {
					destination: "/"
				}
			};
		}
		return {
			props: {
				user: null,
				previousUrl: previousUrl
			}
		};
	} catch (error) {
		return {
			props: {
				user: null,
				previousUrl: previousUrl
			}
		};
	}
}
