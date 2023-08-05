import React, { useContext } from "react";
// import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
// import { getProducts } from "../../store/productReducers";
// import { AppContext } from "../../store/Store";
import Product from "../shop/Product";
const OfferProductSlider = () => {
	// const { state } = useContext(AppContext);
	let products = [];
	products = products.filter((product) => {
		return product.on_sale > 0;
	});
	return (
		<div className='product-slide'>
			<div className='container'>
				<div
					className='section-title offer'
					style={{
						marginBottom: "1.875em",
						overflow: "hidden"
					}}>
					<div style={{ width: "50%", float: "left" }}>
						<h2>New Offer</h2>
					
					</div>
					<div className='text-right' style={{ width: "50%", float: "left", marginTop: "25px" }}>
						<a className='btn -transparent -underline' href='shop-fullwidth-4col.html'>
							View all product
						</a>
					</div>
				</div>
				<div className='product-slider'>
					<div className='product-slide__wrapper'>
						<Swiper
							slidesPerView={1}
							spaceBetween={10}
							pagination={{
								clickable: true
							}}
							breakpoints={{
								640: {
									slidesPerView: 2,
									spaceBetween: 20
								},
								768: {
									slidesPerView: 4,
									spaceBetween: 40
								},
								1024: {
									slidesPerView: 4,
									spaceBetween: 50
								}
							}}>
							{products.map((product, i) => {
								return (
									<SwiperSlide key={i}>
										<div className='product-slide__item'>
											<Product product={product} />
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OfferProductSlider;
