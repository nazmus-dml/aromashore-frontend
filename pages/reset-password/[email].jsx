import React, { useState, useContext } from "react";
import Link from "next/link";
import Layout from "../../layouts/Layout";
import { resetPassword } from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


function ResetPassword() {
	const router = useRouter();
	const query = router.query;
	const [inputs, setInputs] = useState({
		email: query.email,
		token: '',
		password: ''
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		var name = e.currentTarget.name;
		var value = e.currentTarget.value;
		setInputs(values => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (e) => {
		// console.log('handleSubmit', inputs);
		e.preventDefault();
		if (!inputs.token || !inputs.password) return;
		try {
			let response = await resetPassword(inputs);
			toast(response.data.appMessage);
			if (response.data.appStatus == false) return;
			router.push('/');
		} catch (error) { }
	};

	return (
		<>
			<ToastContainer />
			<Layout title='Reset Password'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-12'>
							<div className='sign-in-section'>
								<div className='sign-up__card'>
									<div className='sign-up__card-body'>
										<div className='mt-2'>
											<p className='login-em'>Reset Password</p>
											<p className="alert alert-warning mt-3 mb-2 text-center">
												Password reset token has been sent to your registered email address<br /><i><b>&quot;{query.email}&quot;</b></i><br />Please check email and enter the given token here accordingly.
											</p>
										</div>
										<form className='mt-4' onSubmit={handleSubmit}>
											<div className='myform-group'>
												<div className='col-12'>
													<input className='form-control myform-control' type='text' name='token' value={inputs.token} onChange={handleChange} placeholder='Enter Token' />
												</div>
											</div>
											<div className='myform-group'>
												<div className='col-12 position-relative'>
													<input className='form-control myform-control' style={{ paddingRight: '35px' }} type={showPassword ? 'text' : 'password'} name='password' value={inputs.password} onChange={handleChange} placeholder='Enter Password' />
													{showPassword ? <i className="fa fa-eye" style={{ position: 'absolute', top: '11px', right: '24px' }} onClick={() => setShowPassword(false)}></i> :
														<i className="fa fa-eye-slash" style={{ position: 'absolute', top: '11px', right: '24px' }} onClick={() => setShowPassword(true)}></i>}
												</div>
											</div>
											<div className='myform-group mt-4'>
												<div className='col-12'>
													<button type="submit" className='btn my-btn -red'>Reset Password</button>
												</div>
											</div>
											<div className='row mt-4 text-center'>
												<div className='col-12 mt-2'>
													<Link href='/login' className="text-primary">
														Back to Login
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

export default ResetPassword;
