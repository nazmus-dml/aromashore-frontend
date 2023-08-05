import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { getprofileByCustomer, updateprofileByCustomer } from "../../services/webCustomerService";

export default function CardInfo({ user, profile = [] }) {
	const carddata = Cookies.get("card_data");

	const [ini_card_name, ini_card_number, ini_card_cvc, ini_card_expiry] = carddata ? JSON.parse(carddata) : [null, null, null, null];

	const [CardName, setCardName] = useState(ini_card_name || null);
	const [CardNumber, setCardNumber] = useState(ini_card_number || null);
	const [CardCvc, setCardCvc] = useState(ini_card_cvc || null);
	const [CardExpiry, setCardExpiry] = useState(ini_card_expiry || null);

	const [show, setShow] = useState(false);
	const [isdcCardshow, setIsdcCardshow] = useState(false);
	const [bean, setBean] = useState({
		...profile
	});
	const handleChange = (e) => {
		bean[e.target.name] = e.target.value;
		setBean({ ...bean });
	};

	const Cookies_set = () => {
		const arr = [CardName, CardNumber, CardCvc, CardExpiry];
		const data = JSON.stringify(arr);
		Cookies.set("card_data", data);
	};

	const handleSubmit = () => {
		Cookies_set();
		try {
			let result = updateprofileByCustomer({
				...bean,
				...user
			});
			result.then((res) => {
				toast(res.data.appMessage);
				if (res.data.appStatus) {
					setShow(false);
					setIsdcCardshow(false);
				}
			});
		} catch (error) {}
	};
	return (
		<>
			<ToastContainer />
			<div className='card border-0 bg-transparent'>
				<div className='card-header'>
					<h5 className='mb-0'>Debit/Credit Card Information</h5>
					<span
						className='position-absolute end-0 top-0 mt-2 me-3'
						onClick={() => {
							setIsdcCardshow(true);
						}}>
						<FontAwesomeIcon icon={faEdit} />
					</span>
				</div>
				<div className='card-body'>
					<table className='table mb-0'>
						<thead>
							<tr>
								<th>Card Type</th>
								<th>Card No</th>
								<th>Validity Month/Year</th>
								<th>Card Status</th>
								<th></th>
							</tr>
						</thead>
						{bean.length > 0 ? (
							<tbody>
								{bean.map((card) => (
									<tr key={card.id}>
										<td>{card}</td>
										<td>--</td>
										<td>--</td>
										<td>--</td>
										<td>--</td>
									</tr>
								))}
							</tbody>
						) : (
							<tbody>
								<tr>
									<td>--</td>
									<td>--</td>
									<td>--</td>
									<td>--</td>
									<td>--</td>
								</tr>
							</tbody>
						)}
					</table>
					<Modal show={isdcCardshow} onHide={() => setIsdcCardshow(false)} dialogClassName='modal-w-cdcard base-modal modal-dialog modal-dialog-centered'>
						<Modal.Header closeButton>
							<Modal.Title>Debit/Credit Card Profile</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className='row'>
								<div className='col-12 col-md-6'>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Name on Card
										</label>
										<input className='form-control' id='email' type='text' name='email' value={CardName} onChange={(e) => setCardName(e.target.value)} placeholder='Name on Card' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Card No
										</label>
										<input className='form-control' id='email' type='text' name='email' value={CardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder='Name on Card' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Card CVC
										</label>
										<input className='form-control' id='email' type='text' name='email' value={CardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder='Name on Card' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Expiration Date
										</label>
										<input className='form-control' id='email' type='date' name='email' value={CardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
									</div>
								</div>
							</div>
							<h6>Billing Address</h6>
							<div className='row'>
								<div className='col-12 col-md-12'>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Address
										</label>
										<input className='form-control' id='email' type='text' name='email' value={bean.email ? bean.email : ""} onChange={handleChange} placeholder='Address' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											Country
										</label>
										<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											State
										</label>
										<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											City
										</label>
										<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
									</div>
								</div>
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											Zip Code
										</label>
										<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
									</div>
								</div>
								<div className='col-12 col-md-8'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											Phone No
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
									setIsdcCardshow(false);
								}}>
								Close
							</Button>
							<Button variant='primary' onClick={handleSubmit}>
								Update
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</>
	);
}
