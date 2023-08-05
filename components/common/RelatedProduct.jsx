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

export default function RelatedProduct({ categoryId = null }) {
	const settings = {
		dot: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />
	};

	const [productList, setProductList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.post(apiUrl + "/web/getall/categorywise/product", {
				pageSize: 10,
				pageNo: 0,
				categoryId: categoryId
			})
			.then((response) => {
				if (response.data.appStatus) {
					setProductList(response.data.appData.rows);
				} else {
					setProductList([]);
				}
				setIsLoading(false);
			});
	}, [categoryId]);

	return (
		<div className='product-slide'>
			<div className='container'>
				<div className='section-title -center' style={{ marginBottom: "1.875em" }}>
					<h2>Related Product</h2>
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
