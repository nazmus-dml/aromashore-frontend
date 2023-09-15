import React, { useContext } from "react";
import Link from "next/link";
// import { AppContext } from "../store/Store";
import { AppStore } from "../../store/AppStore";
import { calculateCart } from "../../services/utilityService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";

const ShoppingCart = ({ isCartOpen }) => {
	const { cart, delete_ITEM_FROM_CART } = useContext(AppStore);
	const router = useRouter();
	const drawerStyle = () => {
		if (isCartOpen) {
			return {
				right: "0px"
			};
		}
	};
	let { totalAmount } = calculateCart(cart);
	return (
		<div
			style={{
				display: "block",
				right: "-450px",
				...drawerStyle()
			}}
			className='drawer drawer-right slide'
			id='cart-drawer'
			tabIndex='-1'
			role='dialog'
			aria-labelledby='drawer-demo-title'
			aria-hidden='true'>
			<div className='drawer-content drawer-content-scrollable' role='document'>
				<div className='drawer-body'>
					<div className='cart-sidebar'>
						<div className='cart-items__wrapper'>
							<h2>Shopping Cart</h2>
							<div>
								{cart.length > 0 &&
									cart.map((product, i) => (
										<div key={i} className='cus_cart-item'>
											<div className='cus_cart-item__image'>
												{product.productimages[0] ? <Image src={product.productimages[0]?.image} alt={product.productimages[0]?.name} height={50} width={50} /> : <Image src='/app/assets/images/placeholder-image.png' alt='Placeholder' height={50} width={50} />}
											</div>
											<div className='cus_cart-item__info'>
												{product.units.map((unit, i) => {
													return (
														<div key={i}>
															<ul>
																<li>
																	Size&nbsp;
																	<p>
																		{unit.size}&nbsp;{unit.size_unit}
																	</p>
																</li>
																<li>
																	Price&nbsp;
																	<p>{unit.sale_price > 0 ? unit.sale_price : unit.price}</p>
																</li>
																<li>
																	Qty.&nbsp;
																	<p>{unit.qty}</p>
																</li>
																<li>
																	<a
																		onClick={(e) => {
																			delete_ITEM_FROM_CART({
																				product,
																				unit
																			});
																			e.preventDefault();
																		}}
																		className='cart-item__remove'
																		href='#'>
																		<i className='far fa-times-circle'></i>
																	</a>
																</li>
															</ul>
														</div>
													);
												})}
											</div>
										</div>
									))}
							</div>

							<div className='cart-items__total'>
								<div className='cart-items__total__price'>
									<h5>Total</h5>
									<span>$&nbsp;{totalAmount}</span>
								</div>
								<div className='cart-items__total__buttons'>
									<Link href='/cart'>
										<button className='btn btn-dark'>View Cart</button>
									</Link>
									<button
										onClick={() => {
											if (Cookies.get("login")) {
												router.push("/checkout");
											} else if (!Cookies.get("login")) {
												console.log("Login ", Cookies.get("login"));
												router.push("/login");
											}
										}}
										className='btn -red'>
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
