import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePasswordChange } from "../../models/user";
import { changeProfilePassword, updateprofileByCustomer } from "../../services/webCustomerService";


const groupTypeList = [
	{ value: 1, name: "Group 1" },
	{ value: 2, name: "Group 2" },
	{ value: 3, name: "Group 3" }
];

const raceTypeList = [
	{ value: 1, name: "White" },
	{ value: 2, name: "Black or African American" },
	{ value: 3, name: "American Indian or Alaska Native" },
	{ value: 4, name: "Asian" },
	{ value: 5, name: "Native Hawaiian or Other Pacific Islander" }
];

const carrierTypeList = [
	{ value: 1, name: "UPS" },
	{ value: 2, name: "FedEx" },
	{ value: 3, name: "USPS" }
];

const termsTypeList = [
	{ value: 1, name: "COD Cheque" },
	{ value: 2, name: "COD Cash" },
	{ value: 3, name: "CC Charge" },
	{ value: 4, name: "CC Prepaid" },
	{ value: 5, name: "Pre-Paid" },
	{ value: 6, name: "30 Days Net" },
	{ value: 7, name: "On Receipt" }
];

const zoneList = [
	{ value: 1, name: "Zone" },
	{ value: 2, name: "COD Cash" },
	{ value: 3, name: "CC Charge" },
	{ value: 4, name: "CC Prepaid" },
	{ value: 5, name: "Pre-Paid" },
	{ value: 6, name: "30 Days Net" },
	{ value: 7, name: "On Receipt" }
];

const serviceTypeList = [
	{ value: 1, name: "Ground" },
	{ value: 2, name: "2nd Day" },
	{ value: 3, name: "3 Day" },
	{ value: 4, name: "5 Day" },
	{ value: 5, name: "7 Day" }
];

const locationList = [
	{ value: 1, name: "Location" },
	{ value: 2, name: "COD Cash" },
	{ value: 3, name: "CC Charge" },
	{ value: 4, name: "CC Prepaid" },
	{ value: 5, name: "Pre-Paid" },
	{ value: 6, name: "30 Days Net" },
	{ value: 7, name: "On Receipt" }
];

const getNameFromListById = (list, id) => {

	let data = {
		name: ""
	};

	data = list.find((al) => al.value === Number(id));

	return data?.name || "";
};

export default function PersonalInfo({ user, profile }) {
	console.log(user, profile)
	let basicInfo = {
		customer_no: profile?.customer_no,
		firstname: profile?.firstname,
		lastname: profile?.lastname,
		company: profile?.company,
		contact: profile?.contact,
		username: profile?.username,
		email: profile?.email,
		created_by: new Date(),
		customercategoryId: profile?.customercategory?.id,
		status: profile?.status
	};
	let subscription;
	let order_info_notification = profile?.customerprofile?.order_info_notification;
	if (profile?.customerprofile?.subscription) {
		subscription = JSON.parse(profile?.customerprofile.subscription);
	}
	if (profile?.customerprofile?.order_info_notification) {
		order_info_notification = JSON.parse(profile?.customerprofile?.order_info_notification);
	}
	let profileInfo = {
		race: profile?.customerprofile?.race,
		group: profile?.customerprofile?.group,
		billing_address: profile?.customerprofile?.billing_address,
		cc_profile: profile?.customerprofile?.cc_profile,
		service: profile?.customerprofile?.service,
		location: profile?.customerprofile?.location,
		zone: profile?.customerprofile?.zone,
		tax_id: profile?.customerprofile?.tax_id,
		limit: profile?.customerprofile?.limit,
		carrier: profile?.customerprofile?.carrier,
		subscription: {
			subscriptionEmail: subscription?.subscriptionEmail,
			subscriptionText: subscription?.subscriptionText
		},
		order_info_notification: {
			orderInfoNotificationEmail: order_info_notification?.orderInfoNotificationEmail,
			orderInfoNotificationText: order_info_notification?.orderInfoNotificationText
		},
		manager_remarks: "",
		employee_remarks: "",
		terms: "2"
	};
	let customercontact = {
		phone_no: profile?.customercontact?.phone_no,
		fax: profile?.customercontact?.fax,
		address_line_one: profile?.customercontact?.address_line_one,
		address_line_two: profile?.customercontact?.address_line_two,
		city: profile?.customercontact?.city,
		state: profile?.customercontact?.state,
		zipcode: profile?.customercontact?.zipcode,
		country: profile?.customercontact?.country,
		shipping_address: profile?.customercontact?.shipping_address
	};
	const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
	const [showContactInfoModal, setShowContactInfoModal] = useState(false);
	const [bean, setBean] = useState({
		...basicInfo,
		...profileInfo,
		...customercontact
	});

	useEffect(() => {
		const personal_data = JSON.stringify(bean);
		Cookies.set("personal-data", personal_data);
	}, [bean]);

	const handleChange = (e) => {
		bean[e.target.name] = e.target.value;
		setBean({ ...bean });
	};

	const handleSubscriptionCheckBox = (e) => {
		const beanCopy = { ...bean };
		beanCopy["subscription"][e.target.name] = e.target.checked;
		setBean(beanCopy);
	};

	const orderInfoNotificationCheckBox = (e) => {
		const beanCopy = { ...bean };
		beanCopy["order_info_notification"][e.target.name] = e.target.checked;
		setBean(beanCopy);
	};

	const handlePersonalProfileSubmit = () => {
		try {
			let result = updateprofileByCustomer({
				...bean,
				subscription: JSON.stringify(bean.subscription),
				order_info_notification: JSON.stringify(bean.order_info_notification),
				...user
			});

			result.then((res) => {
				toast(res.data.appMessage);
				if (res.data.appStatus) {
					setShowPersonalInfoModal(false);
				}
			});
		} catch (error) { }
	};

	const [errors, setErrors] = useState({});

	const [changePasswordInformation, setChangePasswordInformation] = useState({
		previousPassword: "",
		newPassword: "",
		repeat_password: "",
		...user
	});

	const handleChangePasswordChange = (e) => {
		bean[e.target.name] = e.target.value;
		setChangePasswordInformation({ ...bean });
	};

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault();
		const errorsCopy = validatePasswordChange({
			previousPassword: bean.previousPassword,
			newPassword: bean.newPassword,
			repeatPassword: bean.repeat_password,
		});
		setErrors(errorsCopy);
		if (errorsCopy) return;
		try {
			const reqBody = {
				"oldpassword": bean.previousPassword,
				"password": bean.newPassword
			}

			let { data } = await changeProfilePassword(reqBody, user);
			toast(data.appMessage);
		} catch (error) {
			console.log('error:', error)
		}
	};

	return (
		<>
			<ToastContainer />
			<div className='bg-light'>

				{/* Profile Information */}
				<div className='card border-0 bg-transparent'>
					<div className='card-header'>
						<h5 className='mb-0'>Profile Information</h5>
					</div>

					<div className='card-body'>

						{/* parent */}
						<div className='row'>

							{/* child 1 */}
							<div className='col-12 col-md-7'>
								{/* 1.1 - Personal Info */}
								<div className='card'>
									{/* 1.1 - Personal Info Icon */}
									<div className='card-header d-flex align-items-center justify-content-between'>
										Personal Info
										<i
											className='fas fa-edit hand'
											onClick={() => {
												setShowPersonalInfoModal(true);
											}}></i>
									</div>

									{/* 1.1 - Personal Info Table */}
									<div className='card-body'>
										<table className='table'>
											<tbody>
												<tr>
													<th>Username</th>
													<td colSpan={3}>{bean.username}</td>
												</tr>
												{/* fn + ln */}
												<tr>
													<th>First Name</th>
													<td>{bean.firstname}</td>
													<th>Last Name</th>
													<td>{bean.lastname}</td>
												</tr>

												{/* comp name */}
												<tr>
													<th>Company Name</th>
													<td colSpan={3}>{bean.company}</td>
												</tr>

												{/* group + race */}
												<tr>
													<th>Group</th>
													<td>{getNameFromListById(groupTypeList, bean.group)}</td>
													<th>Race</th>
													<td>{getNameFromListById(raceTypeList, bean.race)}</td>
												</tr>

												{/* zone + location */}
												<tr>
													<th>Zone</th>
													<td>{getNameFromListById(zoneList, bean.zone)}</td>
													<th>Location</th>
													<td>{getNameFromListById(locationList, bean.location)}</td>
												</tr>

												{/* service + carrier */}
												<tr>
													<th>Service</th>
													<td>{getNameFromListById(serviceTypeList, bean.service)}</td>
													<th>Carrier</th>
													<td>{getNameFromListById(carrierTypeList, bean.carrier)}</td>
												</tr>

												{/* limit + taxID */}
												<tr>
													<th>Limit</th>
													<td>{bean.limit}</td>
													<th>Tax ID</th>
													<td>{bean.tax_id}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								{/* 1.2 - Contact Info */}
								<div className='card mt-3'>
									<div className='card-header d-flex align-items-center justify-content-between'>
										Contact Info
										<i
											className='fas fa-edit hand'
											onClick={() => {
												setShowContactInfoModal(true);
											}}></i>
									</div>
									<div className='card-body'>
										<table className='table'>
											<tbody>
												<tr>
													<th>Contact</th>
													<td>{bean.contact.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</td>
													<th>Email</th>
													<td>{bean.email}</td>
												</tr>
												<tr>
													<th>Phone No</th>
													<td>{bean.phone_no}</td>
													<th>Fax</th>
													<td>{bean.fax}</td>
												</tr>
												<tr>
													<th>Address Line One</th>
													<td>{bean.address_line_one}</td>
													<th>Address LIne Two</th>
													<td>{bean.address_line_two}</td>
												</tr>
												<tr>
													<th>City</th>
													<td>{bean.city}</td>
													<th>State</th>
													<td>{bean.state}</td>
												</tr>
												<tr>
													<th>Country</th>
													<td>{bean.country}</td>
													<th>Zip Code</th>
													<td>{bean.zipcode}</td>
												</tr>
												{/* <tr>
                          <th>Shipping Address</th>
                          <td>{bean.shipping_address}</td>
                          <th>Billing Address</th>
                          <td>{bean.billing_address}</td>
                        </tr> */}
											</tbody>
										</table>
									</div>
								</div>
							</div>

							{/* child 2 - Change Password + Other Info */}
							<div className='col-12 col-md-5'>
								{/* Change Password */}
								<div className='card'>
									<div className='card-header'>Change Password</div>
									<div className='card-body'>
										<form onSubmit={handleChangePasswordSubmit}>
											<div className='profile-password-field'>
												<div className='row'>
													<div className='col-12 col-md-12'>
														<div className='mb-3'>
															<label htmlFor='previousPassword' className='form-label fw-bold'>
																Previous Password
															</label>
															<input type='password' className='form-control' id='previousPassword' name='previousPassword' value={changePasswordInformation.previousPassword} onChange={handleChangePasswordChange} placeholder='************' />
														</div>
													</div>
													<div className='col-12 col-md-12'>
														<div className='mb-3'>
															<label htmlFor='newPassword' className='form-label fw-bold'>
																New Password
															</label>
															<input type='password' className='form-control' id='newPassword' name='newPassword' value={changePasswordInformation.newPassword} onChange={handleChangePasswordChange} placeholder=' New Password ' />
															{errors && errors.newPassword && <div style={{ color: "red" }}>{errors.newPassword}</div>}
														</div>
													</div>
													<div className='col-12 col-md-12'>
														<div className='mb-3'>
															<label htmlFor='repeat_password' className='form-label fw-bold'>
																Retype New Password
															</label>
															<input type='password' className='form-control' id='repeat_password' name='repeat_password' value={changePasswordInformation.repeat_password} onChange={handleChangePasswordChange} placeholder='Re Type New Password ' />
															{errors && errors.repeat_password && <div style={{ color: "red" }}>{errors.repeat_password}</div>}
														</div>
													</div>
													<div className='col-12 col-md-12'>
														<button type='submit' className='btn btn-secondary mt-2'>
															Change
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>

								{/* Other Info */}
								<div className='card mt-3'>
									<div className='card-header'>Other Info</div>
									<div className='card-body'>
										<div className='row'>
											<div className='col-12 col-sm-6'>
												<label className='fw-bold mb-2'>Subscription</label>
												<div>
													<div className='form-check form-check-inline'>
														<input className='form-check-input' type='checkbox' checked={bean.subscription.subscriptionEmail} readOnly />
														<label className='form-check-label'>Email</label>
													</div>
													<div className='form-check form-check-inline'>
														<input className='form-check-input' type='checkbox' checked={bean.subscription.subscriptionText} readOnly />
														<label className='form-check-label'>Text</label>
													</div>
												</div>
											</div>
											<div className='col-12 col-sm-6'>
												<label className='fw-bold mb-2'>Notification</label>
												<div>
													<div className='form-check form-check-inline'>
														<input className='form-check-input' type='checkbox' checked={bean.order_info_notification.orderInfoNotificationEmail} readOnly />
														<label className='form-check-label'>Email</label>
													</div>
													<div className='form-check form-check-inline'>
														<input className='form-check-input' type='checkbox' checked={bean.order_info_notification.orderInfoNotificationText} readOnly />
														<label className='form-check-label'>Text</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

			<Modal show={showPersonalInfoModal} onHide={() => setShowPersonalInfoModal(false)} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Address</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='row'>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='firstname' className='form-label'>
									<span>*</span>First Name
								</label>
								<input type='text' className='form-control' id='firstname' name='firstname' value={bean.firstname ? bean.firstname : ""} onChange={handleChange} placeholder='First Name' />
							</div>
							<div className='mb-3'>
								<label htmlFor='lastname' className='form-label'>
									Last Name
								</label>
								<input type='text' className='form-control' id='lastname' name='lastname' value={bean.lastname ? bean.lastname : ""} onChange={handleChange} placeholder='Last Name ' />
							</div>
							<div className='mb-3'>
								<label htmlFor='lastName' className='form-label'>
									Company
								</label>
								<input className='form-control' id='company' type='text' name='company' value={bean.company ? bean.company : ""} onChange={handleChange} placeholder='Company ' />
							</div>
							<div className='mb-3'>
								<label htmlFor='lastName' className='form-label'>
									Race
								</label>
								<select className='form-select' name='race' value={bean.race ? bean.race : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{raceTypeList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='mb-3'>
								<label htmlFor='lastName' className='form-label'>
									Group
								</label>
								<select className='form-select' name='group' value={bean.group ? bean.group : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{groupTypeList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='mb-3'>
								<label htmlFor='tax_id' className='form-label'>
									Tax Id
								</label>
								<input type='text' className='form-control' id='tax_id' name='tax_id' value={bean.tax_id ? bean.tax_id : ""} onChange={handleChange} placeholder='Tax Id' />
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='carrier' className='form-label'>
									Carrier
								</label>
								<select className='form-select' name='carrier' value={bean.carrier ? bean.carrier : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{carrierTypeList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='mb-3'>
								<label htmlFor='service' className='form-label'>
									Service
								</label>
								<select className='form-select' id='service' name='service' value={bean.service ? bean.service : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{serviceTypeList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>

							<div className='mb-3'>
								<label htmlFor='location' className='form-label'>
									Payment Terms
								</label>
								<select className='form-select' name='terms' value={bean.terms ? bean.terms : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{termsTypeList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='mb-3'>
								<label htmlFor='location' className='form-label'>
									Location
								</label>
								<select className='form-select' name='location' value={bean.location ? bean.location : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{locationList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
							<div className='mb-3'>
								<label htmlFor='zone' className='form-label'>
									Zone
								</label>
								<select className='form-select' name='zone' value={bean.zone ? bean.zone : ""} onChange={handleChange}>
									<option value=''>select item</option>
									{zoneList.map((item, i) => {
										return (
											<option key={i} value={item.value}>
												{item.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='status' className='form-label'>
									Subscription
								</label>
								<div>
									<div className='form-check form-check-inline'>
										<input className='form-check-input' type='checkbox' id='subscriptionEmail' name='subscriptionEmail' checked={bean.subscription.subscriptionEmail} onChange={handleSubscriptionCheckBox} />
										<label className='form-check-label' htmlFor='subscriptionEmail'>
											Email
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<input className='form-check-input' type='checkbox' id='subscriptionText' name='subscriptionText' checked={bean.subscription.subscriptionText} onChange={handleSubscriptionCheckBox} />
										<label className='form-check-label' htmlFor='subscriptionText'>
											Text
										</label>
									</div>
								</div>
							</div>
							<div className='mb-3'>
								<label htmlFor='status' className='form-label'>
									Order Info Notification
								</label>
								<div>
									<div className='form-check form-check-inline'>
										<input className='form-check-input' type='checkbox' id='orderInfoNotificationEmail' name='orderInfoNotificationEmail' checked={bean.order_info_notification.orderInfoNotificationEmail} onChange={orderInfoNotificationCheckBox} />
										<label className='form-check-label' htmlFor='orderInfoNotificationEmail'>
											Email
										</label>
									</div>
									<div className='form-check form-check-inline'>
										<input className='form-check-input' type='checkbox' id='orderInfoNotificationText' name='orderInfoNotificationText' checked={bean.order_info_notification.orderInfoNotificationText} onChange={orderInfoNotificationCheckBox} />
										<label className='form-check-label' htmlFor='orderInfoNotificationText'>
											Text
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <pre>{JSON.stringify(bean, null, 2)}</pre> */}
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => {
							setShowPersonalInfoModal(false);
						}}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							handlePersonalProfileSubmit();
						}}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showContactInfoModal} onHide={() => setShowContactInfoModal(false)} size='lg' centered='true'>
				<Modal.Header closeButton>
					<Modal.Title>Address</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='contact' className='form-label'>
									Mobile No
								</label>
								<input className='form-control' type='text' id='contact' name='contact' value={bean.contact ? bean.contact : ""} onChange={handleChange} placeholder='Mobile No' />
							</div>
							<div className='mb-3'>
								<label htmlFor='email' className='form-label'>
									Email
								</label>
								<input className='form-control' id='email' type='text' name='email' value={bean.email ? bean.email : ""} onChange={handleChange} placeholder='Email' />
							</div>
							<div className='mb-3'>
								<label htmlFor='phone_no' className='form-label'>
									Phone No
								</label>
								<input type='text' className='form-control' id='phone_no' name='phone_no' value={bean.phone_no ? bean.phone_no : ""} onChange={handleChange} placeholder='Phone No' />
							</div>
							<div className='mb-3'>
								<label htmlFor='fax' className='form-label'>
									Fax
								</label>
								<input type='text' className='form-control' id='fax' name='fax' value={bean.fax ? bean.fax : ""} onChange={handleChange} placeholder='Fax' />
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='address_line_one' className='form-label'>
									Address Line One
								</label>
								<textarea className='form-control' id='address_line_one' name='address_line_one' value={bean.address_line_one ? bean.address_line_one : ""} onChange={handleChange} rows='4' />
							</div>
							<div className='mb-3'>
								<label htmlFor='address_line_two' className='form-label'>
									Address Line Two
								</label>
								<textarea className='form-control' id='address_line_two' name='address_line_two' onChange={handleChange} value={bean.address_line_two ? bean.address_line_two : ""} rows='4' />
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-3'>
								<label htmlFor='lastName' className='form-label'>
									City
								</label>
								<input type='text' className='form-control' id='city' name='city' value={bean.city ? bean.city : ""} onChange={handleChange} placeholder='City' />
							</div>
							<div className='mb-3'>
								<label htmlFor='state' className='form-label'>
									State/Division
								</label>
								<input type='text' className='form-control' id='state' name='state' value={bean.state ? bean.state : ""} onChange={handleChange} placeholder='State' />
							</div>
							<div className='mb-3'>
								<label htmlFor='zipcode' className='form-label'>
									<span>*</span>Zip code
								</label>
								<input type='text' className='form-control' id='zipcode' name='zipcode' value={bean.zipcode ? bean.zipcode : ""} onChange={handleChange} placeholder='Zip code ' />
							</div>
							<div className='mb-3'>
								<label htmlFor='country' className='form-label'>
									Country
								</label>
								<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => {
							setShowContactInfoModal(false);
						}}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							handlePersonalProfileSubmit();
						}}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
