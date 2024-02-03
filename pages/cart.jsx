import React, { useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../layouts/Layout";
import InstagramSlider from "../components/common/InstagramSlider";
import Link from "next/link";
// import { LOAD_TO_CART, INCREMENT_TO_CART_ITEM, DECREMENT_TO_CART_ITEM, DELETE_ITEM_FROM_CART } from "../store/Store";
import { AppStore } from "../store/AppStore";
import { calculateCart } from "../services/utilityService";
import Cookies from "js-cookie";
import Image from "next/image";

function Cart() {
	const router = useRouter();
	const { cart, increment_TO_CART_ITEM, decrement_TO_CART_ITEM, delete_ITEM_FROM_CART, clearCart } = useContext(AppStore);
	let { totalAmount } = calculateCart(cart);

	return (
		<Layout title='Cart'>
			<div className='breadcrumb'>
				<div className='container mt-2'>
					<ul className='p-0 mb-2'>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>
							<Link href='/shop'>Shop</Link>
						</li>
						<li className='active'>Cart</li>
					</ul>
				</div>
			</div>
			<div className='shop'>
				<div className='container'>
					<div className='row'>
						<div className={cart.length > 0 ? "col-12 col-md-9" : "col-12 col-md-12"}>
							<div className='card card-body shadow cart__table'>
								<table className='table table-sm mb-0'>
									<thead>
										<tr>
											<th className='text-center' width={100}>
												Image
											</th>
											<th width={300}>Product Name</th>
											<th className='text-center'>Size</th>
											<th width={100} className='text-center'>
												Unit Price
											</th>
											<th className='text-center'>Quantity</th>
											<th className='text-center'>Total</th>
											<th className='text-center' width={30}></th>
										</tr>
									</thead>
									{cart.length > 0 ? (
										cart.map((product, i) => (
											<tbody key={i}>
												<tr>
													<td rowSpan={product.units.length + 1} className='text-center'>
														{product.productimages[0] ? <Image src={product.productimages[0]?.image} alt={product.productimages[0]?.name} height={75} width={75} /> : <Image src='/app/assets/images/200.svg' alt='Placeholder' height={75} width={75} />}
													</td>
													<td rowSpan={product.units.length + 1}>
														<div className='p-2'>
															<Link style={{ textWrap: "wrap" }} href={"/products/" + product.id}>
																{product.name}
															</Link>
														</div>
													</td>
												</tr>

												{product.units.map((unit, i) => (
													<tr key={i}>
														<td className='text-center'>
															{unit.size} {unit.size_unit}
														</td>
														{unit.sale_price > 0 ? <td className='text-center'>$&nbsp;{unit.sale_price}</td> : <td className='text-center'>$&nbsp;{unit.price}</td>}
														<td className='text-center'>
															<div className='quantity-controlle1'>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center",
																		justifyContent: "center",
																		marginBottom: "5px"
																	}}>
																	<div
																		onClick={() => {
																			if (unit.qty > 1) {
																				decrement_TO_CART_ITEM({
																					product,
																					unit: {
																						...unit,
																						qty: unit.qty - 1
																					}
																				});
																			}
																		}}
																		className='btn btn-sm btn-outline-secondary rounded'>
																		<i className='fas fa-minus'></i>
																	</div>
																	<div className='quantity-controller__number'>{unit.qty}</div>
																	<div
																		onClick={() => {
																			increment_TO_CART_ITEM({
																				product,
																				unit: {
																					...unit,
																					qty: unit.qty + 1
																				}
																			});
																		}}
																		className='btn btn-sm btn-outline-secondary rounded'>
																		<i className='fas fa-plus'></i>
																	</div>
																</div>
															</div>
														</td>
														{unit.sale_price > 0 ? <td className='text-center'>$&nbsp;{unit.sale_price * unit.qty}</td> : <td className='text-center'>$&nbsp;{unit.price * unit.qty}</td>}
														<td className='text-center' style={{ marginBottom: "5px" }}>
															<button
																className='btn btn-sm btn-outline-danger rounded-circle'
																onClick={(e) => {
																	e.preventDefault();
																	delete_ITEM_FROM_CART({
																		product,
																		unit
																	});
																}}>
																<i className='fas fa-times'></i>
															</button>
														</td>
													</tr>
												))}
											</tbody>
										))
									) : (
										<tbody>
											<tr>
												<td colSpan={7} className='text-center p-3'>
													<span className='text-warning'>Noting Added Yet!</span>
												</td>
											</tr>
										</tbody>
									)}
								</table>
							</div>
							<div className='card card-body mt-3'>
								<table className='mb-0'>
									<tbody>
										<tr>
											<td>
												<Link href='/shop'>
													<button className='btn btn-light'>
														<i className='fas fa-long-arrow-left me-2'></i>
														Continue Shopping
													</button>
												</Link>
											</td>
											<td className='text-end'>
												<button
													onClick={(e) => {
														e.preventDefault();
														clearCart();
													}}
													className='btn btn-light'>
													{totalAmount !== 0 ? (
														<>
															<i className='fas fa-trash me-2'></i>Clear Shopping Cart
														</>
													) : (
														<></>
													)}
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						{cart.length > 0 ? (
							<div className='col-12 col-md-3'>
								<div className='card card-body shadow'>
									<table className='table'>
										<tbody>
											<tr>
												<th className='pb-4'>Grand Total</th>
												<th className='text-end pb-4'>$&nbsp;{totalAmount}</th>
											</tr>
											<tr>
												<td colSpan={2} className='text-end'>
													<button
														onClick={() => {
															if (Cookies.get("login")) {
																router.push("/checkout");
															} else if (!Cookies.get("login")) {
																console.log("Login ", Cookies.get("login"));
																router.push("/login");
															}
														}}
														className='btn btn-success rounded-0'>
														Proceed to checkout
														<i className='fas fa-arrow-right ms-2'></i>
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
			{/* <RelatedProduct /> */}
			{/* <InstagramSlider /> */}
		</Layout>
	);
}
export default Cart;
