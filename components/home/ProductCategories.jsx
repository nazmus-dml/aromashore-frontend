import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// import { AppContext } from "../../store/Store";
import axios from "axios";
import apiUrl from "../../config";

function ProductCategories() {
	const [categoryList, setCategoryList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios.get(apiUrl + "/web/getall/category").then((response) => {
			console.log(response);
			if (response.data.appStatus) {
				setCategoryList(response.data.appData);
				setIsLoading(false);
			}
		});
	}, []);

	return (
		<div className='product-categories'>
			<div className='container'>
				<div
					className='section-title categories'
					style={{
						marginBottom: "1.875em",
						overflow: "hidden"
					}}>
					<div>
						<h2>Categories</h2>
					</div>
				</div>
				<div className='container mb-5'>
					<div className='row justify-content-center'>
						{isLoading ? (
							<div className='col-12 text-center'>
								<i className='fa fa-spinner fa-spin me-2'></i>Loading Categories...
							</div>
						) : (
							categoryList?.map((item) => (
								<div className='col-12 col-md-4 col-lg-3 col-xl-2' key={item.id}>
									<div className='category-box mb-2'>
										<Link href={"shop?category=" + item.id}>
											<h3 className='category-item-name'>{item.category_name} </h3>
										</Link>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCategories;
