import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { fetchCustomerTypes, getprofileByCustomer, updateprofileByCustomer } from "../../services/webCustomerService";

export default function OrderInfo({ user, profile = [] }) {
	const [orderList, setOrderList] = useState(profile);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			<ToastContainer />
			{isLoading ? (
				"Loading..."
			) : (
				<div className='bg-light'>
					<div className='card border-0 bg-transparent'>
						<div className='card-header'>
							<h5 className='mb-0'>Order Information</h5>
						</div>
						<div className='card-body'>
							<table className='table mb-0'>
								<thead>
									<tr>
										<th>Order No</th>
										<th>Order Date</th>
										<th>Order Amount</th>
										<th>Order Status</th>
										<th></th>
									</tr>
								</thead>
								{orderList.length >= 0 ? (
									<tbody>
										{orderList.map((order) => (
											<tr key={order.id}>
												<td>{order.order_no}</td>
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
						</div>
					</div>
				</div>
			)}
		</>
	);
}
