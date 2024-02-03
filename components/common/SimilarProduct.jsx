import { useState, useEffect } from "react";
import SlickSlider from "react-slick";
import Link from "next/link";
import axios from "axios";
import apiUrl from "../../config";
import Product from "../shop/Product";

const NextArrow = ({ onClick }) => {
	return (
		<div onClick={onClick} className='slick-next slick-arrow' style={{}}>
			<i className='far fa-chevron-right'></i>
		</div>
	);
};

const PrevArrow = ({ onClick }) => {
	return (
		<div onClick={onClick} className='slick-prev slick-arrow' style={{}}>
			<i className='far fa-chevron-left'></i>
		</div>
	);
};

export default function SimilarProduct({ brandId = null }) {
	const settings = {
		dot: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />
	};

	const [productList, setProductList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(apiUrl + "/web/getall-by-brand/" + brandId)
			.then((response) => {
				if (response.data.appStatus) {
					setProductList(response.data.appData);
				} else {
					setProductList([]);
				}
				setIsLoading(false);
			});
	}, [brandId]);

	return (
		<div className='product-slide'>
			<div className='container'>
				<div className='section-title -center' style={{ marginBottom: "1.875em" }}>
					<h2>Similar Product</h2>
				</div>
				<div className='row'>
					<div className='col-12'>
						<div className='product-slider'>
							<div className='product-slide__wrapper'>
								{isLoading ? (
									<div className='text-center'>
										<i className='fa fa-spinner fa-spin me-2'></i>
										Loading Related Products...
									</div>
								) : (
									<SlickSlider {...settings}>
										{productList.map((product) => {
											return <Product key={product.id} product={product} />;
										})}
									</SlickSlider>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
