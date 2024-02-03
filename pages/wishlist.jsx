import React from "react";
import Layout from "../layouts/Layout";
import InstagramSlider from "../components/common/InstagramSlider";
import Image from "next/image";

function Wishlist() {
	return (
		<Layout>
			<div className='breadcrumb'>
				<div className='container mt-2'>
					<ul className='p-0 mb-2'>
						<li>Home</li>
						<li>Shop</li>
						<li className='active'>Wishlist</li>
					</ul>
				</div>
			</div>
			<div className='wishlist'>
				<div className='container'>
					<div className='wishlist__table'>
						<div className='wishlist__table__wrapper'>
							<table>
								<colgroup>
									<col style={{ width: "40%" }} />
									<col style={{ width: "20%" }} />
									<col style={{ width: "20%" }} />
									<col style={{ width: "20%" }} />
								</colgroup>
								<thead>
									<tr>
										<th>Product</th>
										<th>Unit Price</th>
										<th>Stock</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className='wishlist-product'>
												<div className='wishlist-product__image'>
													<Image src='/app/assets/images/product/1.png' alt='The expert mascaraa' layout='fill' />
												</div>
												<div className='wishlist-product__content'>
													<h5>eyes</h5>
													<a href='/shop-fulwidth-4col.html'>The expert mascaraa</a>
												</div>
											</div>
										</td>
										<td>$35.00</td>
										<td>In stock</td>
										<td>
											<a className='btn -dark' href='#'>
												Add to cart
											</a>
											<a className='remove-btn' href='#'>
												<i className='fal fa-times'></i>
											</a>
										</td>
									</tr>
									<tr>
										<td>
											<div className='wishlist-product'>
												<div className='wishlist-product__image'>
													<Image src='/app/assets/images/product/2.png' alt='Velvet Melon High Intensity' layout='fill' />
												</div>
												<div className='wishlist-product__content'>
													<h5>eyes</h5>
													<a href='/shop-fulwidth-4col.html'>Velvet Melon High Intensity</a>
												</div>
											</div>
										</td>
										<td>$38.00</td>
										<td>Out stock</td>
										<td>
											<a className='btn -dark' href='#'>
												Add to cart
											</a>
											<a className='remove-btn' href='#'>
												<i className='fal fa-times'></i>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			{/* <InstagramSlider /> */}
		</Layout>
	);
}

export default Wishlist;
