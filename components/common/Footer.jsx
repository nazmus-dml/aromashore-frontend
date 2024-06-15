import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { addNewsLetter } from "../../services/webService";
import { AppStore } from "../../store/AppStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import {apiUrl} from "../../config";

export default function Footer() {
	const { user } = useContext(AppStore);
	const [bean, setBean] = useState({
		email: ""
	});
	const [companyInfo, setCompanyInfo] = useState(null);

	const handleChange = (e) => {
		bean[e.target.name] = e.target.value;
		setBean({ ...bean });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let { data } = await addNewsLetter({ email: bean.email }, user);
			toast(data.appMessage);
		} catch (error) { }
	};

	useEffect(() => {
		axios.get(apiUrl + "/public/get/company-info").then((response) => {
			console.log(response.data)
			if (response.data.appStatus) {
				setCompanyInfo(response.data.appData);
			} else {
				setCompanyInfo(null);
			}
		});
	}, []);

	return (
		<>
			<ToastContainer />
			<div className='footer-one'>
				{/* <div className='footer-one__header subscribe'>
					<div className='footer-one__header__logo'>
						<Image src='/app/assets/images/logo-white.png' alt='Logo' width={70} height={61} />
					</div>
					<div className='footer-one__header__newsletter'>
						<span>Subscribe Newsletter:</span>
						<div className='footer-one-newsletter'>
							<form onSubmit={handleSubmit}>
								<div className='subscribe-form'>
									<div className='mc-form'>
										<input type='text' name='email' value={bean.email} onChange={handleChange} placeholder='Enter your email' required='required' />
										<button className='btn'>
											<i className='fas fa-paper-plane'></i>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='footer-one__header__social'>
						<div className='social-icons -border'>
							<ul>
								<li>
									<a href='https://www.facebook.com/' style={{ color: "undefined" }}>
										<i className='fab fa-facebook-f'></i>
									</a>
								</li>
								<li>
									<a href='https://twitter.com' style={{ color: "undefined" }}>
										<i className='fab fa-twitter'></i>
									</a>
								</li>
								<li>
									<a href='https://instagram.com/' style={{ color: "undefined" }}>
										<i className='fab fa-instagram'> </i>
									</a>
								</li>
								<li>
									<a href='https://www.youtube.com/' style={{ color: "undefined" }}>
										<i className='fab fa-youtube'></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div> */}
				<div className='footer-bg'>
					<div className='container'>
						<div className='footer-one__body'>
							<div className='row'>
								<div className='col-12 col-md-6 col-lg-3'>
									<div className='footer__section -info'>
										<h5 className='footer-title footer-contact'>Contact Info</h5>
										{companyInfo !== null ? (
											<ul className='company-info'>
												<li>
													<i className='fas fa-store'></i>
													<span>{companyInfo.name ? companyInfo.name : 'Aromashore'}</span>
												</li>
												<li>
													<i className='fas fa-mobile fa-lg'></i>
													<span>{companyInfo.contact}</span>
												</li>
												<li>
													<i className='fas fa-envelope'></i>
													<span>{companyInfo.email}</span>
												</li>
												<li>
													<i className='fas fa-map-marker fa-lg'></i>
													<span>{companyInfo.address}</span>
												</li>
											</ul>
										) : (
											<ul className='company-info'>
												<li>
													<i className='fas fa-store'></i>
													<span>Aromashore</span>
												</li>
												<li>
													<i className='fas fa-mobile fa-lg'></i>
													<span>--</span>
												</li>
												<li>
													<i className='fas fa-envelope'></i>
													<span>--</span>
												</li>
												<li>
													<i className='fas fa-map-marker fa-lg'></i>
													<span>--</span>
												</li>
											</ul>
										)}
									</div>
								</div>
								<div className='col-12 col-md-6 col-lg-5'>
									<div className='footer__section -links'>
										<div className='row'>
											<div className='col-12 col-sm-6'>
												<h5 className='footer-title footer-account'>Account</h5>
												<ul className='ps-0'>
													<li>
														<Link href='/shop'>Shop</Link>
													</li>
													<li>
														<Link href='/cart'>Cart</Link>
													</li>
													<li>
														<Link href='/checkout'>Checkout</Link>
													</li>
													<li>
														<Link href='/faq'>Faq</Link>
													</li>
													<li>
														<Link href='/reseller-request'>Reseller Request</Link>
													</li>
												</ul>
											</div>
											<div className='col-12 col-sm-6'>
												<h5 className='footer-title footer-information'>Infomation</h5>
												<ul className='ps-0'>
													<li>
														<Link href='/about'>About Us</Link>
													</li>
													<li>
														<Link href='/privacy'>Privacy Policy</Link>
													</li>
													<li>
														<Link href='/terms'>Terms &amp; Condition</Link>
													</li>
													<li>
														<Link href='/return-policy'>Return Policy</Link>
													</li>
													<li>
														<Link href='/contact-us'>Contact Us</Link>
													</li>
												</ul>

											</div>
										</div>
									</div>
								</div>
								<div className='col-12 col-lg-4'>
									<div className='footer__section -payment'>
										<h5 className='footer-title footer-payment'>Payment Methods</h5>
										<p>
											<span className='badge bg-dark p-2'>VISA</span>
											&nbsp;&nbsp;
											<span className='badge bg-dark p-2'>MASTERCARD</span>
											&nbsp;&nbsp;
											<span className='badge bg-dark p-2'>CREDIT CARD</span>
											&nbsp;&nbsp;
											<span className='badge bg-dark p-2'>DEBIT CARD</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<hr />
						<div className="d-flex justify-content-between align-items-center w-100">
							<p className='text-center text-muted mb-0'>
								<small>All Right Reserved &copy; {new Date().getFullYear().toString()}</small>
							</p>
							<div className='footer-one__header__social'>
								<div className='social-icons -border'>
									<ul className="p-0 m-0">
										<li>
											<a href='https://www.facebook.com/' style={{ color: "undefined" }}>
												<i className='fab fa-facebook-f'></i>
											</a>
										</li>
										<li>
											<a href='https://twitter.com' style={{ color: "undefined" }}>
												<i className='fab fa-twitter'></i>
											</a>
										</li>
										<li>
											<a href='https://instagram.com/' style={{ color: "undefined" }}>
												<i className='fab fa-instagram'> </i>
											</a>
										</li>
										<li>
											<a href='https://www.youtube.com/' style={{ color: "undefined" }}>
												<i className='fab fa-youtube'></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
