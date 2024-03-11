import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { bankingCardValidate } from "../../models/bankingCardProfile";
import { getCitiesByStateId, getCountriesList, getStatesByCountryId, updateCcProfile } from "../../services/publicContentsService";
import MuixDatePicker from "../common/DatePicker";


export default function CustomerCCProfile({ customerId, creditCard = [] }) {
	const [ccProfileModalState, setccProfileModalState] = useState(false);
	const [ccProfileList, setccProfileList] = useState([]);

	const [ccProfileCountryList, setCCProfileCountryList] = useState([]);
	const [selectedCCProfileCountry, setSelectedCCProfileCountry] = useState({
		value: 0,
		label: ""
	});

	const [ccProfileStateList, setCCProfileStateList] = useState([]);
	const [selectedCCProfileState, setSelectedCCProfileState] = useState({
		value: 0,
		label: ""
	});
	const [ccProfileCityList, setCCProfileCityList] = useState([]);
	const [selectedCCProfileCity, setSelectedCCProfileCity] = useState({
		value: 0,
		label: ""
	});


	const [ccProfile, setccProfile] = useState({
		card_type: "",
		name_on_card: "",
		card_number: "",
		cvv: "",
		expiration_date: null,
		address: "",
		country: 187,
		country_code: "",
		country_name: "",
		state: "",
		state_code: "",
		state_name: "",
		city: "",
		city_name: "",
		zipcode: "",
		phone_number: "",
		status: 0
	});

	const cardMaxDate = moment().add(9, "years");
	const CVV_REGEX = new RegExp(/^[1-9]{1}[0-9]{3}$/gim);
	const CARD_NO_REGEX = new RegExp(/^[1-9]{1}[0-9]{15}$/gim);
	const PHONE_REGEX = new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gim);
	const ZIPCODE_REGEX = new RegExp(/^\+?[0-9]+$/gim);

	const [validation, setValidation] = useState({
		firstname: false,
		lastname: false,
		contact: false,
		phone_no: false,
		zipcode: false,
		card_number: false,
		cvv: false,
		phone_number: false
	});

	useEffect(() => {
		setccProfileList(creditCard);
	}, []);

	useEffect(() => {
		getCountriesList()
			.then(function (response) {
				// console.log(response);
				if (response.status === 200 && !response.data["appStatus"]) {
					setCCProfileCountryList([]);
				} else {
					const tempCountryList = response.data["appData"];
					// console.log(tempCountryList);

					const customCountryList = [];
					tempCountryList.map((cl) => {
						const country = { value: cl.id, label: `${cl.name}` };
						customCountryList.push(country);
						return true;
					});

					setCCProfileCountryList(customCountryList);
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		handleCCProfileCountryInputChange({ value: 187, label: "United State of America (US)" });
	}, []);

	const handleCCProfileChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === "card_number") {
			if (value !== "") {
				if (CARD_NO_REGEX.test(value)) {
					setValidation((ov) => {
						return {
							...ov,
							card_number: false
						};
					});
				} else {
					setValidation((ov) => {
						return {
							...ov,
							card_number: true
						};
					});
				}
			} else {
				setValidation((ov) => {
					return {
						...ov,
						card_number: false
					};
				});
			}
		}
		if (name === "cvv") {
			if (value !== "") {
				if (CVV_REGEX.test(value)) {
					setValidation((ov) => {
						return {
							...ov,
							cvv: false
						};
					});
				} else {
					setValidation((ov) => {
						return {
							...ov,
							cvv: true
						};
					});
				}
			} else {
				setValidation((ov) => {
					return {
						...ov,
						cvv: false
					};
				});
			}
		}
		if (name === "zipcode" && value !== "") {
			if (value !== "") {
				if (ZIPCODE_REGEX.test(value)) {
					setValidation((ov) => {
						return {
							...ov,
							zipcode: false
						};
					});
				} else {
					setValidation((ov) => {
						return {
							...ov,
							zipcode: true
						};
					});
				}
			} else {
				setValidation((ov) => {
					return {
						...ov,
						zipcode: false
					};
				});
			}
		}
		if (name === "phone_number") {
			if (value !== "") {
				if (PHONE_REGEX.test(value)) {
					setValidation((ov) => {
						return {
							...ov,
							phone_number: false
						};
					});
				} else {
					setValidation((ov) => {
						return {
							...ov,
							phone_number: true
						};
					});
				}
			} else {
				setValidation((ov) => {
					return {
						...ov,
						phone_number: false
					};
				});
			}
		}
		setccProfile((values) => ({ ...values, [name]: value }));
	};

	const handleCCProfileCountryInputChange = (event) => {
		const value = event.value;
		const nameNCode = event.label.split("(");
		const label = nameNCode[0];
		// const code = nameNCode[1].toString().slice(0, -1); saif
		const code = value;
		if (value) {
			getStatesByCountryId(value)
				.then(function (response) {
					// console.log(response);
					if (response.status === 200 && !response.data["appStatus"]) {
						setCCProfileStateList([]);
					} else {
						const tempStateList = response.data["appData"];
						const customStateList = [];
						tempStateList.map((cl) => {
							const state = { value: cl.id, label: `${cl.name}` };
							customStateList.push(state);
							return true;
						});
						setCCProfileStateList(customStateList);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			setCCProfileStateList([]);
		}
		setccProfile((values) => ({ ...values, country: value, country_name: label, country_code: code }));
		setccProfile((values) => ({ ...values, state: "", state_name: "", state_code: "", city: "", city_name: "" }));
		setSelectedCCProfileCountry({ value: value, label: `${label} (${code})` });
		setSelectedCCProfileState({ value: 0, label: "" });
		setSelectedCCProfileCity({ value: 0, label: "" });
	};

	const handleCCProfileStateInputChange = (event) => {
		const value = event.value;
		const nameNCode = event.label.split("(");
		const label = nameNCode[0];
		// const code = nameNCode[1].toString().slice(0, -1);
		const code = value;
		if (value) {
			getCitiesByStateId(value)
				.then(function (response) {
					// console.log(response);
					if (response.status === 200 && !response.data["appStatus"]) {
						setCCProfileCityList([]);
					} else {
						const tempCityList = response.data["appData"];
						const customCityList = [];
						tempCityList.map((cl) => {
							const state = { value: cl.id, label: cl.name };
							customCityList.push(state);
							return true;
						});
						setCCProfileCityList(customCityList);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} else {
			setCCProfileCityList([]);
		}
		setccProfile((values) => ({ ...values, state: value, state_name: label, state_code: code }));
		setccProfile((values) => ({ ...values, city: "", city_name: "" }));
		setSelectedCCProfileState({ value: value, label: `${label} (${code})` });
		setSelectedCCProfileCity({ value: 0, label: "" });
	};

	const handleCCProfileCityInputChange = (event) => {
		const value = event.value;
		const label = event.label;
		let selectedCityDetail = { value: 0, label: "" };
		selectedCityDetail = ccProfileCityList.find((cl) => cl.value === value);
		// console.log(selectedCityDetail);
		setccProfile((values) => ({ ...values, city: value, city_name: label }));
		setSelectedCCProfileCity({ value: value, label: label });
	};

	const addUpdateCCProfile = () => {

		const errorsCopy = bankingCardValidate(ccProfile);

		if (errorsCopy) {
			console.log('errorsCopy:', errorsCopy)
			toast.error('Please fill-up all the fields accordingly', {
				position: "top-right",
				autoClose: 5000
			});

			return;
		};

		const previousccList = [...ccProfileList, ccProfile];
		const payload = { cc_profile: JSON.stringify(previousccList) };

		updateCcProfile(customerId, payload)
			.then(function (response) {
				// console.log(response);
				if (response.status === 200 && response.data["appStatus"]) {
					toast.success(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000,
						onClose: () => {
							setccProfileList(previousccList);
							resetCCForm();
							setccProfileModalState(false);
						}
					});
					// window.location.reload();
				} else {
					toast.error(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const deleteCardInfo = (cardIndex) => {
		const updatedCardList = ccProfileList?.filter((elm, indx) => {
			return indx !== cardIndex;
		});
		const payload = { cc_profile: JSON.stringify(updatedCardList) };

		updateCcProfile(customerId, payload)
			.then(function (response) {
				// console.log(response);
				if (response.status === 200 && response.data["appStatus"]) {
					toast.success(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000,
						onClose: () => {
							setccProfileList(updatedCardList);
							resetCCForm();
							setccProfileModalState(false);
						}
					});
					// window.location.reload();
				} else {
					toast.error(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const markAsActive = (cardIndex) => {
		const updatedCardList = ccProfileList;
		updatedCardList.map((elm, indx) => {
			// console.log(elm);
			if (indx === cardIndex) {
				elm.status = 1;
			} else {
				elm.status = 0;
			}
			return true;
		});
		const payload = { cc_profile: JSON.stringify(updatedCardList) };

		updateCcProfile(customerId, payload)
			.then(function (response) {
				// console.log(response);
				if (response.status === 200 && response.data["appStatus"]) {
					toast.success(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000,
						onClose: () => {
							setccProfileList(updatedCardList);
							resetCCForm();
							setccProfileModalState(false);
						}
					});
					// window.location.reload();
				} else {
					toast.error(response.data["appMessage"], {
						position: "top-right",
						autoClose: 1000
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const resetCCForm = () => {
		setccProfile({
			card_type: "",
			name_on_card: "",
			card_number: "",
			cvv: "",
			expiration_date: null,
			address: "",
			country: "",
			country_code: "",
			country_name: "",
			state: "",
			state_code: "",
			state_name: "",
			city: "",
			city_name: "",
			zipcode: "",
			phone_number: "",
			status: 0
		});
	};

	return (
		<>
			<div className='row'>
				<div className='col-12 text-end mb-2'>
					<button className='btn btn-outline-success btn-sm' onClick={() => setccProfileModalState(true)}>
						<i className='bi bi-plus-lg me-2'></i>Add New Card
					</button>
				</div>
				<div className='col-12'>
					<>
						<table className='table table-striped table-bordered table-sm mb-0'>
							<thead>
								<tr>
									<th>Card Type</th>
									<th>Name On Card</th>
									<th>Card Number</th>
									<th>Status</th>
									<th width={120}></th>
								</tr>
							</thead>
							{ccProfileList?.length > 0 ? (
								<tbody>
									{ccProfileList?.map((ccProfile, indx) => {
										const { card_type, name_on_card, card_number, status } = ccProfile;
										return (
											<tr key={indx}>
												<td className='text-uppercase'>{card_type}</td>
												<td>{name_on_card}</td>
												<td>{card_number}</td>
												<td>
													{Number(status) === 1 ? (
														<>
															<i className='bi bi-check2-circle text-success me-1'></i>
															<b className='text-success'>Active</b>
														</>
													) : (
														"Inactive"
													)}
												</td>
												<td className='text-center'>
													{Number(status) === 1 ? (
														<></>
													) : (
														<span className='hand' onClick={() => markAsActive(indx)}>
															<i className='bi bi-check2'></i>&nbsp;Make Active
														</span>
													)}
													<i onClick={() => deleteCardInfo(indx)} className='ms-2 bi bi-trash text-danger'></i>
												</td>
											</tr>
										);
									})}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td colSpan={5} className='text-danger'>
											Nothing Found
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</>
				</div>
			</div>

			{/* CC Profile Modal */}
			<Modal show={ccProfileModalState} onHide={() => setccProfileModalState(false)} backdrop='static' keyboard={false} centered size='lg'>
				<Modal.Header>
					<Modal.Title>Debit/Credit Card Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='row'>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<label className='d-block'>Card Type</label>
								<select className='form-select' id='card_type' name='card_type' value={ccProfile.card_type} onChange={handleCCProfileChange}>
									<option value={0}>Select Card Type</option>
									<option value={"visa"}>Visa</option>
									<option value={"mastercard"}>Mastercard</option>
								</select>
							</div>
						</div>
						<div className='col-12 col-md-8'>
							<div className='mb-2'>
								<label className='d-block'>Name on Card</label>
								<input className='form-control' id='name_on_card' name='name_on_card' value={ccProfile.name_on_card} onChange={handleCCProfileChange} />
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='mb-2'>
								<label className='d-block'>Card Number</label>
								<input className='form-control' id='card_number' name='card_number' value={ccProfile.card_number} onChange={handleCCProfileChange} />
								{validation.card_number ? (
									<small title='Example: 1234567891234567'>
										<code>Must be 16 Digit</code>
									</small>
								) : (
									""
								)}
							</div>
						</div>
						<div className='col-12 col-md-2'>
							<div className='mb-2'>
								<label className='d-block'>Card CVV</label>
								<input className='form-control' id='cvv' name='cvv' value={ccProfile.cvv} onChange={handleCCProfileChange} />
								{validation.cvv ? (
									<small title='Example: 1234'>
										<code>Must be 4 Digit</code>
									</small>
								) : (
									""
								)}
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<MuixDatePicker
									label='Expiration Date (month/year)*'
									inputFormat='MM/yyyy'
									manualEntry={true}
									maxDate={new Date(cardMaxDate)}
									minDate={new Date()}
									value={ccProfile.expiration_date}
									setValue={(value) => handleCCProfileChange({ target: { name: "expiration_date", value: value } })}
								/>
								<p>Insert Date Picker</p>
							</div>
						</div>
						{/* <div className='col-12 col-md-4'>
        <div className="mb-2">
            <label className='d-block'>Status</label>
            <select className='form-select' id='status' name='status' value={ccProfile.status} onChange={handleCCProfileChange}>
                <option value={0}>Select Status</option>
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
            </select>
        </div>
    </div> */}
					</div>
					<div className='row'>
						<div className='col-12 col-md-12'>
							<hr />
							<label className='d-block fw-bold'>Billing Information</label>
						</div>
						<div className='col-12 col-md-12'>
							<div className='mb-2'>
								<label className='d-block'>Address</label>
								<input className='form-control' id='address' name='address' value={ccProfile.address} onChange={handleCCProfileChange} />
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<label className='d-block'>Country</label>
								<Select options={ccProfileCountryList} value={selectedCCProfileCountry} onChange={(event) => handleCCProfileCountryInputChange(event)} required />
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<label className='d-block'>State/Division</label>
								{ccProfile.country !== "" && ccProfileStateList.length > 0 ? (
									<Select options={ccProfileStateList} value={selectedCCProfileState} onChange={(event) => handleCCProfileStateInputChange(event)} required />
								) : (
									<input className='form-control' type='text' name='state_name' value={ccProfile.state_name} onChange={handleCCProfileChange} />
								)}
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<label className='d-block'>City</label>
								{ccProfile.state !== "" && ccProfileCityList.length > 0 ? (
									<Select options={ccProfileCityList} value={selectedCCProfileCity} onChange={(event) => handleCCProfileCityInputChange(event)} required />
								) : (
									<input className='form-control' type='text' name='city_name' value={ccProfile.city_name} onChange={handleCCProfileChange} />
								)}
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='mb-2'>
								<label className='d-block'>Zip Code</label>
								<input className='form-control' id='zipcode' name='zipcode' value={ccProfile.zipcode} onChange={handleCCProfileChange} />
								{validation.zipcode ? (
									<small title='Example: 12345, +12345'>
										<code>Please enter a Zip Code</code>
									</small>
								) : (
									""
								)}
							</div>
						</div>
						<div className='col-12 col-md-8'>
							<div className='mb-2'>
								<label className='d-block'>Phone No</label>
								<input className='form-control' id='phone_number' name='phone_number' value={ccProfile.phone_number} onChange={handleCCProfileChange} />
								{validation.phone_number ? (
									<small title='Example: +919367788755, 8989829304, +16308520397, 786-307-3615, (786) 307-3615'>
										<code>Please enter a valid Contact/Cell Number</code>
									</small>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button type='button' className='btn btn-danger' onClick={() => setccProfileModalState(false)}>
						<i className='bi bi-x-circle me-2'></i>Close
					</button>
					<button type='button' className='btn btn-success' onClick={addUpdateCCProfile}>
						<i className='bi bi-save me-2'></i>Save
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
