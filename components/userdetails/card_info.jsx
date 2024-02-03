import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getCountriesList} from "../../services/publicContentsService";
import {updateprofileByCustomer} from "../../services/webCustomerService";

export default function CardInfo({ user, profile = [] }) {
	const carddata = Cookies.get("card_data");

	const {ini_card_name, ini_card_number, ini_card_cvc, ini_card_expiry} 
    = carddata ? JSON.parse(carddata) 
    : {
      ini_card_name:null, 
      ini_card_number:null, 
      ini_card_cvc:null, 
      ini_card_expiry:null
    };

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
		// const arr = [CardName, CardNumber, CardCvc, CardExpiry];
		const arr = {CardName, CardNumber, CardCvc, CardExpiry};
		const data = JSON.stringify(arr);
    console.log('Cookies');
    console.log('data:',data);
    // console.log('profile:',profile);
    // console.log('bean:',bean);
		Cookies.set("card_data", data);
	};

	const handleSubmit = () => {
		Cookies_set();

    return
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

  // =========================================================================

  useEffect(() => {

    console.log('user:',user)
    
    getCountriesList()
			.then((response) => {
				if (response.status === 200 && !response.data["appStatus"]) {
					// setCCProfileCountryList([]);
          console.log('empty country list')
				} 

				// console.log('data:',response.data);

        else {
					const tempCountryList = response.data["appData"];
					// console.log('tempCountryList:',tempCountryList);

          /*
					const customCountryList = [];
					tempCountryList.map((cl) => {
						const country = { value: cl.id, label: `${cl.name} (${cl.code})` };
						customCountryList.push(country);
						return true;
					});
          */

          const customCountryList = tempCountryList.map((cl) => {
            return { 
              value: cl.id, 
              label: `${cl.name}`
            }
          });

					// setCCProfileCountryList(customCountryList);
          // console.log('customCountryList:',customCountryList)
				}
        
			})
			.catch(function (error) {
				console.log(error);
			});
   
    // =============================

    
  
    
  }, [])
  

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
				
        {/* table */}
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
									<td>-empty-</td>
									<td>-empty-</td>
									<td>-empty-</td>
									<td>-empty-</td>
									<td>-empty-</td>
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

                {/* Address */}
								<div className='col-12 col-md-12'>
									<div className='mb-3'>
										<label htmlFor='address' className='form-label'>
											Address
										</label>
										<input className='form-control' id='address' type='text' name='address' value={bean.address ? bean.address : ""} onChange={handleChange} placeholder='Address' />
									</div>
								</div>

                {/* Country */}
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='country' className='form-label'>
											Country
										</label>
										<input type='text' className='form-control' id='country' name='country' value={bean.country ? bean.country : ""} onChange={handleChange} placeholder='Country' />
									</div>
								</div>

                {/* State */}
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='state' className='form-label'>
											State
										</label>
										<input type='text' className='form-control' id='state' name='state' value={bean.state ? bean.state : ""} onChange={handleChange} placeholder='State' />
									</div>
								</div>

                {/* City */}
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='city' className='form-label'>
											City
										</label>
										<input type='text' className='form-control' id='city' name='city' value={bean.city ? bean.city : ""} onChange={handleChange} placeholder='City' />
									</div>
								</div>

                {/* Zip Code */}
								<div className='col-12 col-md-4'>
									<div className='mb-3'>
										<label htmlFor='zipCode' className='form-label'>
											Zip Code
										</label>
										<input type='text' className='form-control' id='zipCode' name='zipCode' value={bean.zipCode ? bean.zipCode : ""} onChange={handleChange} placeholder='Zip Code' />
									</div>
								</div>

                {/* Phone */}
								<div className='col-12 col-md-8'>
									<div className='mb-3'>
										<label htmlFor='phone' className='form-label'>
											Phone No
										</label>
										<input type='text' className='form-control' id='phone' name='phone' value={bean.phone ? bean.phone : ""} onChange={handleChange} placeholder='Phone' />
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
