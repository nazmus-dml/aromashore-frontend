import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Link from "next/link";
import { addWebRequest } from "../services/webService";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
	const [bean, setBean] = useState({
		name: "",
		contact: "",
		email: "",
		message: "",
	});
	const handleChange = (e) => {
		bean[e.target.name] = e.target.value;
		setBean({ ...bean });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let current_date = Date.now();
		var date = moment();
		var request_date = date.format("DD-MM-YYYY");
		var request_time = moment(current_date).format("LT");
		let rsrq = {
			...bean,
			request_date,
			request_time
		};
		try {
			let { data } = await addWebRequest(rsrq);
			toast(data.appMessage);
			if (!data.appStatus) return;
			setBean({
				name: "",
				contact: "",
				email: "",
				message: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return <Layout title='Contact Us'>
		<>
			<div className='breadcrumb'>
				<div className='container mt-2'>
					<ul className='p-0 mb-2'>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li className='active'>Contact Us</li>
					</ul>
				</div>
			</div>
			<ToastContainer />
			<div className='cta -style-1'>
				<div className='container'>
					<div className='row'>
						<div className='col-12 col-md-6 mx-auto'>
							<div className='cta__form'>
								<div className='section-title reseller' style={{ marginBottom: "1.875em" }}>
									<h2>Contact Us</h2>
								</div>
								<form onSubmit={handleSubmit} className='cta__form__detail validated-form'>
									<div className="row">
										<div className="col-12 col-md-12">
											<div className='input-validator'>
												<input type='text' placeholder='Full Name' name='name' value={bean.name} onChange={handleChange} required='required' />
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className='input-validator'>
												<input type='text' name='contact' value={bean.contact} onChange={handleChange} placeholder='Contact' required='required' />
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className='input-validator'>
												<input type='text' placeholder='Email' name='email' value={bean.email} onChange={handleChange} required='required' />
											</div>
										</div>
										<div className="col-12 col-md-12">
											<div className='input-validator'>
												<textarea placeholder='Message' name='message' value={bean.message} onChange={handleChange} className='form-control' rows='3' />
											</div>
										</div>
										<div className="col-12 text-end">
											<button className='btn -light-red'>Send</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	</Layout>
}
