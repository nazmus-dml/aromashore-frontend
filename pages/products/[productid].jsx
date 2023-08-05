import React, { useState, useEffect, useContext, useRef } from "react";
import Layout from "../../layouts/Layout";
import RelatedProduct from "../../components/common/RelatedProduct";
import InstagramSlider from "../../components/common/InstagramSlider";
import apiUrl from "../../config";
import { AppStore } from "../../store/AppStore";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Cart from "./Icons";
import parse from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/router";

function AddToCart({ addToCart, removeFromCart, ...props }) {
	const [status, setStatus] = React.useState("removed");

	useEffect(() => {
		if (status === "adding") {
			const id = setTimeout(() => {
				setStatus("removed");
			}, 2000);

			return () => {
				clearTimeout(id);
			};
		}
	}, [status]);

	function handleClick() {
		if (status === "removed") {
			setStatus("adding");

			if (typeof addToCart === "function") {
				addToCart();
			}
		} else if (status === "added") {
			setStatus("removed");

			if (typeof removeFromCart === "function") {
				removeFromCart();
			}
		}
	}

	return (
		<button className={`add-to-cart_ ${status}`} type='button' style={{ border: "1px solid #8abc41" }} aria-live='polite' {...props} onClick={handleClick}>
			<span className='removed text' aria-hidden={status !== "removed" ? "true" : "false"}>
				{status === "removed" ? "Add to Cart" : "Adding..."}
			</span>
			{status === "adding" && (
				<span aria-hidden='true' className='dotdotdot'>
					<span className='dot one' />
					<span className='dot two' />
					<span className='dot three' />
				</span>
			)}
			<Cart aria-hidden='true' className='cart-icon' />
		</button>
	);
}

function ProductDetail() {
	const { add_TO_CART } = useContext(AppStore);
	const [tabType, setTabType] = useState(1);
	const [isModalOpen, setModalOpen] = useState(false);
	const [qty, setQty] = useState(1);
	const [productpro, setProductpro] = useState(null);
	const ref = useRef(null);
	const [isLoading, setIsLoading] = useState(true);
	const [cartStatus, setCartStatus] = useState(false);
	const router = useRouter();
	const query = router.query;
	const [productDetails, setProductDetails] = useState(null);

	let totalReviewers = 0;
	let totalRating = 0;
	let avgRatingRange = [];
	let avgNonRatingRange = [];

	useEffect(() => {
		axios.get(apiUrl + "/web/get/product/" + Number(query.productid)).then((response) => {
			if (response.data.appStatus) {
				const prodDetails = response.data.appData;
				setProductDetails(prodDetails);
				if (prodDetails.productproperties && prodDetails.productproperties.length > 0) {
					setProductpro(prodDetails.productproperties[0]);
				}

				if (prodDetails.productreviews && prodDetails.productreviews.length > 0) {
					prodDetails.productreviews.forEach(function (item) {
						totalReviewers++;
						totalRating = totalRating + item.ratings;
					});
				}
				let avgRating = 0;
				let totalRatingFrac = 0;
				if (totalReviewers) {
					let frac = totalRating % totalReviewers;
					avgRating = (totalRating - frac) / totalReviewers;
					totalRatingFrac = frac / 10;
				}
				avgRatingRange = Array.from({ length: avgRating }, (_, index) => {
					return index + 1;
				});
				avgNonRatingRange = Array.from({ length: 5 - avgRating }, (_, index) => {
					return index + 1;
				});
				setIsLoading(false);
			} else {
				setProductDetails(null);
			}
		});
	}, []);

	const handleChangeProperty = (e) => {
		let findproductpro = productDetails.productproperties.find((item) => item.id == e.target.value);
		setProductpro(findproductpro);
	};

	const handleClick = () => {
		setTabType(3);
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};

	// const addToCartHandler = (obj) => {
	// 	setCartStatus(true);
	// 	const id = setTimeout(() => {
	// 		add_TO_CART(obj);
	// 		setCartStatus(false);
	// 	}, 1000);
	// 	return () => {
	// 		clearTimeout(id);
	// 	};
	// };

	return (
		<>
			<Layout>
				<div className='breadcrumb'>
					<div className='container mt-3'>
						<h2>Shop</h2>
						<ul className='p-0'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li>
								<Link href='/shop'>Shop</Link>
							</li>
							<li className='active'>Product Detail</li>
						</ul>
					</div>
				</div>
				{isLoading ? (
					<div className='p-5 m-5 text-center'>
						<i className='fa fa-spinner fa-spin fa-lg me-3'></i>Loading Product Details...
					</div>
				) : (
					<>
						<div className='shop'>
							<div className='container mt-5'>
								<div className='row'>
									<div className='col-12 col-sm-5'>
										<div className='product-detail__slide-two'>
											<div className='product-detail__slide-two__big'>
												{productDetails.productimages && productDetails.productimages.length > 0 ? (
													<Swiper slidesPerView={1}>
														{productDetails.productimages.map((item, index) => {
															return (
																<SwiperSlide key={index}>
																	<div key={item.id} className='slider__item'>
																		<Image src={item.image} alt={item.name} width={500} height={500} />
																	</div>
																</SwiperSlide>
															);
														})}
													</Swiper>
												) : (
													<Swiper slidesPerView={1}>
														<SwiperSlide>
															<div className='slider__item'>
																<Image src='/app/assets/images/200.svg' alt='Placeholder' width={500} height={500} />
															</div>
														</SwiperSlide>
													</Swiper>
												)}
											</div>
											<div className='product-detail__slide-two__small'></div>
										</div>
									</div>
									<div className='col-12 col-sm-7'>
										<div>
											<h5>
												Price:&nbsp;$
												{productpro ? (
													productpro.sale_price > 0 ? (
														<>
															{productpro.sale_price}&nbsp;&nbsp;
															<del>${productpro.price}</del>
														</>
													) : (
														productpro.price
													)
												) : (
													0
												)}
											</h5>
											<div className='product-detail__content__header__comment-block'>
												<div className='rate'>
													{avgRatingRange.map((item, i) => {
														return <i key={i} className='fas fa-star'></i>;
													})}
													{avgNonRatingRange.map((item, i) => {
														return <i key={i} className='far fa-star'></i>;
													})}
													<span>&nbsp;({totalReviewers})</span>
												</div>
												<p>{totalReviewers} Review</p>
												<button href='#' onClick={handleClick} className='review-btn'>
													Write a Review
												</button>
											</div>
											<hr />
											<div className='d-flex justify-content-between'>
												<span>
													Size
													<select
														name='unit_name'
														onChange={(e) => {
															handleChangeProperty(e);
														}}
														className='product-dropdown'>
														{productDetails.productproperties &&
															productDetails.productproperties.map((item, i) => {
																return (
																	<option key={i} value={item.id}>
																		{item.size} {item.size_unit}
																	</option>
																);
															})}
													</select>
												</span>
												<div className='quantity-controller -border -round'>
													<div
														onClick={() => {
															setQty((pre) => {
																return pre > 1 ? pre - 1 : 1;
															});
														}}
														className='quantity-controller__btn -descrease'>
														<i className='fas fa-minus fa-sm'></i>
													</div>
													<div className='quantity-controller__number'>{qty}</div>
													<div
														onClick={() => {
															setQty((pre) => {
																return pre + 1;
															});
														}}
														className='quantity-controller__btn -increase'>
														<i className='fas fa-plus fa-sm'></i>
													</div>
												</div>
											</div>
											<hr />
											<div className='product-detail__content'>
												<div className='product-detail__content__footer'>
													<div className='product-detail__controller__box'>
														<div
															className='cart-main'
															onClick={() =>
																add_TO_CART({
																	product,
																	unit: {
																		...productpro,
																		qty: qty
																	}
																})
															}>
															<AddToCart />
														</div>
														<a className='wishbtn -round -white' href='#'>
															<i className='fas fa-heart'></i>
														</a>
														{/* {cartStatus ? (
													<button>Adding...</button>
												) : (
													<button
														className='btn cartbtn'
														onClick={() =>
															addToCartHandler({
																product,
																unit: {
																	...productpro,
																	qty: qty
																}
															})
														}>
														<i className='fas fa-shopping-cart me-2'></i>
														Add To Cart
													</button>
												)} */}
														{/* <a className='wishbtn -round -white' href='#'>
													<i className='fas fa-heart'></i>
												</a> */}
													</div>
													<br />
													<h2>{productDetails.name}</h2>
													<p className='mb-0'>Brand: {productDetails.productbrand ? productDetails.productbrand.name : "Annonimus"}</p>
													<p>Product code: {productDetails.product_no}</p>
													<hr />
													<div className='product-detail__content__tab'>
														<ul className='tab-content__header'>
															<li onClick={() => setTabType(1)} className='tab-switcher'>
																Description
															</li>
															<li onClick={() => setTabType(2)} className='tab-switcher'>
																Shipping & Returns
															</li>
															<li ref={ref} onClick={() => setTabType(3)} className='tab-switcher'>
																Reviews ( 03 )
															</li>
														</ul>
														<div id='allTabsContainer'>
															{tabType == 1 && <div className='tab-content__item -description'>{productDetails.productdetail ? parse(productDetails.productdetail.description) : "--"}</div>}
															{tabType == 2 && (
																<div className='tab-content__item -ship'>
																	<h5>
																		<span>Ship to</span> New york
																	</h5>
																	<ul>
																		<li>
																			Standard Shipping on order over 0kg - 5kg.
																			<span>+10.00</span>
																		</li>
																		<li>
																			Heavy Goods Shipping on oder over 5kg-10kg .<span>+20.00</span>
																		</li>
																	</ul>
																	<h5>Delivery &amp; returns</h5>
																	<p>We diliver to over 100 countries around the word. For full details of the delivery options we offer, please view our Delivery information.</p>
																</div>
															)}
															{tabType == 3 && (
																<div className='tab-content__item -review'>
																	<form>
																		<h5>Write a review</h5>
																		<div className='row'>
																			<div className='col-12 col-md-6'>
																				<div className='input-validator'>
																					<input type='text' name='name' placeholder='Name' />
																				</div>
																			</div>
																			<div className='col-12 col-md-6'>
																				<div className='input-validator'>
																					<input type='text' name='email' placeholder='Email' />
																				</div>
																			</div>
																			<div className='col-12'>
																				<div className='input-validator'>
																					<textarea name='message' placeholder='Message' rows='5'></textarea>
																				</div>
																				<span className='input-error'></span>
																			</div>
																			<div className='col-12'>
																				<button className='btn -dark'>Write a review</button>
																				<Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
																					<Modal.Header closeButton>
																						<Modal.Title>Write a Review</Modal.Title>
																					</Modal.Header>
																					<Modal.Body>
																						<div className='tab-content__item -review'>
																							<div className='review'>
																								<div className='review__header'>
																									<div className='review__header__avatar'>
																										<form>
																											<div className='row'>
																												<div className='col-12 col-md-6'>
																													<div className='input-validator'>
																														<input className='review-inputs' type='text' name='name' placeholder='Name' />
																													</div>
																												</div>
																												<div className='col-12 col-md-6'>
																													<div className='input-validator'>
																														<input className='review-inputs' type='text' name='email' placeholder='Email' />
																													</div>
																												</div>
																												<div className='col-12'>
																													<div className='input-validator'>
																														<textarea className='review-textarea' name='message' placeholder='Message' rows='5'></textarea>
																													</div>
																													<span className='input-error'></span>
																												</div>
																												<div className='col-12'>
																													<button className='btn -dark'>Write a review</button>
																												</div>
																											</div>
																										</form>
																									</div>
																								</div>
																							</div>
																						</div>
																					</Modal.Body>
																					<Modal.Footer>
																						<Button variant='secondary' onClick={() => setModalOpen(false)}>
																							Close
																						</Button>
																						{/* Additional buttons or actions */}
																					</Modal.Footer>
																				</Modal>
																			</div>
																		</div>
																	</form>
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{productDetails.productcategory ? <RelatedProduct categoryId={productDetails.productcategory.id} /> : <></>}
						<InstagramSlider />
					</>
				)}
			</Layout>
		</>
	);
}

export default ProductDetail;

// export async function getServerSideProps(context) {
// 	const { productid } = context.query;
// 	try {
// 		const { data: productDetails } = await axios.get(apiUrl + "/web/get/product/" + productid);
// 		return {
// 			props: {
// 				product: productDetails.appData
// 			}
// 		};
// 	} catch (error) {}
// }
