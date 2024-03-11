import { useState, useEffect } from "react";
// import Image from "next/image";
import apiUrl from "../../config";
import axios from "axios";

export default function ProductBundle({ productDetails = null, productId = null }) {

	const [bundleProductList, setBundleProductList] = useState([]);

	useEffect(() => {
		console.log(productDetails)
		if (productId != null) {
			axios.get(apiUrl + "/web/getall/bundle/" + Number(productId)).then((response) => {
				console.log(response);
				if (response.data.appStatus) {
					const productBundleDetails = response.data.appData;
					console.log("/web/getall/bundle/", productBundleDetails);
					setBundleProductList(productBundleDetails)
				} else {
					setBundleProductList([]);
				}
			}).catch((error) => {
				console.log(error);
				setBundleProductList([]);
			});
		}
	}, [productId, productDetails]);

	let totalBundlePrice = 0;

	const getDiscountedPrice = (discount, price) => {
		// console.log(discount, price);
		let calculatedPrice = Number(price) - (Number(price) * (Number(discount) / 100));
		totalBundlePrice += calculatedPrice;
		return <span className="text-success">${calculatedPrice}</span>;
	}

	return (
		<>
			{
				bundleProductList.length > 0 ? <div className="card mt-4">
					{bundleProductList.map(bpl => {
						const productVeriation = JSON.parse(bpl.product_variation);
						const bundleProducts = JSON.parse(bpl.bundle_products);
						return <>
							<div className="card-header pt-3 pb-3">
								<h5 className="mb-0">Frequently Bought Together</h5>
								<p className="mb-0">Buy this bundle and get <b className="text-success">{bpl.discount}% off</b></p>
							</div>
							<div className="card-body pt-4 pb-4">
								<div className="d-flex justify-content-evenly align-items-center" key={bpl.id}>
									<div className="border border-secondary rounded  p-2">
										{/* {productDetails.productimages.length > 0 ? <Image src={productDetails.productimages[0].image} width={75} height={75} /> : ""}<br /> */}
										<p className="mb-1"><b>{productVeriation.product_name}</b></p>
										<p className="mb-0"><b>SKU:</b>&nbsp;{productVeriation.variation_no}</p>
										<p className="mb-0"><b>Size:</b>&nbsp;{productVeriation.size} {productVeriation.size_unit}</p>
										<p className="mb-0"><b>Price:</b>&nbsp;<del className="text-danger">
											${productVeriation.price}</del>&nbsp;{getDiscountedPrice(bpl.discount, productVeriation.price)}
										</p>
									</div>
									{
										bundleProducts.map(bp => <>
											<i className="fas fa-plus"></i>
											<div className="border border-secondary rounded  p-2">
												<p className="mb-1"><b>{bp.product_name}</b></p>
												<p className="mb-0"><b>SKU:</b>&nbsp;{bp.variation_no}</p>
												<p className="mb-0"><b>Size:</b>&nbsp;{bp.size} {bp.size_unit}</p>
												<p className="mb-0"><b>Price:</b>&nbsp;<del className="text-danger">
													${bp.price}</del>&nbsp;{getDiscountedPrice(bpl.discount, bp.price)}
												</p>
											</div>
										</>
										)
									}
								</div>
							</div>
							<div className="card-footer pt-3 pb-3 d-flex justify-content-between align-items-center">
								<b>Total Price: ${totalBundlePrice} ({bpl.discount}% off)</b>
								<button className="btn btn-dark">
									<i className="fa fa-cart-plus me-2"></i>
									Add Bundle To Cart
								</button>
							</div>
						</>
					})}
				</div> : <></>
			}
		</>
	);
}
