import { useState, useEffect } from "react";
import Image from "next/image";
import apiUrl from "../../config";
import axios from "axios";

export default function ProductBundle({ productDetails = null, productId = null }) {

	const [bundleProductList, setBundleProductList] = useState([]);
	const [productpro, setProductpro] = useState(null);

	useEffect(() => {
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
			setProductpro(productDetails.productproperties[0]);
		}
	}, [productId, productDetails]);

	const handleChangeProperty = (e) => {
		let findproductpro = productDetails.productproperties.find((item) => item.id == e.target.value);
		setProductpro(findproductpro);
	};

	return (
		<>
			{
				bundleProductList.length > 0 ? <div className="pt-3">
					<h5>Frequently Bought Together</h5>
					{bundleProductList.map(bpl => <>
						<p>Buy this bundle and get {bpl.discount}% off</p>
						<div className="d-flex justify-content-evenly align-items-center" key={bpl.id}>
							<div className="text-center">
								{productDetails.productimages.length > 0 ? <Image src={productDetails.productimages[0].image} width={75} height={75} /> : ""}<br />
								<b className="d-block mb-2">{productDetails.name} ($
									{productpro ? (
										productpro.sale_price > 0 ? (
											<>
												{productpro.sale_price}&nbsp;&nbsp;
												<del className="text-danger">${productpro.price}</del>
											</>
										) : (
											productpro.price
										)
									) : (
										0
									)})</b>
								<select
									name='unit_name'
									onChange={(e) => {
										handleChangeProperty(e);
									}}
									className='product-dropdown'>
									{productDetails.productproperties &&
										productDetails.productproperties.map((item, i) =>
											<option key={i} value={item.id}>
												{item.size} {item.size_unit}
											</option>
										)}
								</select>
							</div>
							<i className="fas fa-plus"></i>
							<div className="text-center">
								<Image src='/app/assets/images/200.svg' alt='Placeholder' width={75} height={75} /><br />
								{bpl.product_name}
							</div>
						</div>
					</>
					)}
					<hr />
					<div className="text-end mt-3">
						<button className="btn btn-outline-dark rounded">
							<i className="fa fa-cart-plus me-2"></i>Add Bundle To Cart</button>
					</div>
				</div> : <></>
			}
		</>
	);
}
