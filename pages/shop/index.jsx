import React, { useEffect, useState, useContext } from "react";
import Layout from "../../layouts/Layout";
import apiUrl from "../../config";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Product from "../../components/shop/Product";

export default function Index() {
	const [isGridView, setIsGridView] = useState(true);
	const router = useRouter();
	const query = router.query;
	const [allProductList, setAllProductList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [productBrandList, setProductBrandList] = useState([]);
	const [selectedBrandIdList, setSelectedBrandIdList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios.get(apiUrl + "/web/getall/brand").then((response) => {
			// console.log(response);
			if (response.data.appStatus) {
				const brandList = response.data.appData;
				brandList.map((brand) => {
					brand.isChecked = false;
				});
				setProductBrandList(brandList);
			}
		});

		axios.get(apiUrl + "/web/getall/category").then((response) => {
			// console.log(response);
			if (response.data.appStatus) {
				setCategoryList(response.data.appData);
			}
		});

		axios
			.post(apiUrl + "/web/getall/product", {
				pageSize: 20,
				pageNo: 0
			})
			.then((response) => {
				// console.log(response);
				if (response.data.appStatus) {
					setAllProductList(response.data.appData.rows);
					const allProducts = response.data.appData.rows;
					if (query.category && query.category !== "" && query.category !== "all") {
						const localProductList = allProducts.filter((pl) => pl.productcategory.id === Number(query.category));
						setProductList(localProductList);
					} else {
						setProductList(response.data.appData.rows);
					}
					setIsLoading(false);
				}
			});
	}, [query.category]);

	const handleCategorySelect = (categoryId) => {
		setIsLoading(true);
		let href = "/shop?category=" + categoryId;
		router.push(href);

		if (categoryId === "all") {
			if (selectedBrandIdList.length > 0) {
				let tempLocalProductList = [];
				selectedBrandIdList.map((brandId) => {
					const localProduct = allProductList.filter((pl) => pl.productbrand.id === brandId);
					tempLocalProductList.push(...localProduct);
				});
				setProductList([...tempLocalProductList]);
				setIsLoading(false);
			} else {
				const localProductList = [...allProductList];
				setProductList(localProductList);
				setIsLoading(false);
			}
		} else {
			const localProductList = allProductList.filter((pl) => pl.productcategory.id === categoryId);
			if (selectedBrandIdList.length > 0) {
				let tempLocalProductList = [];
				selectedBrandIdList.map((brandId) => {
					const localProduct = localProductList.filter((pl) => pl.productbrand.id === brandId);
					tempLocalProductList.push(...localProduct);
				});
				setProductList([...tempLocalProductList]);
				setIsLoading(false);
			} else {
				setProductList(localProductList);
				setIsLoading(false);
			}
		}
	};

	const handleBandSelect = (event, brand) => {
		// console.log(event, brand);
		const locbrandsMap = productBrandList.map((item) => {
			if (item.id == brand.id) {
				return {
					...item,
					isChecked: !item.isChecked
				};
			}
			return item;
		});
		setProductBrandList(locbrandsMap);
		const selectedBrandIds = [];
		locbrandsMap.map((brand) => {
			if (brand.isChecked === true) {
				selectedBrandIds.push(brand.id);
			}
		});
		setIsLoading(true);
		setSelectedBrandIdList(selectedBrandIds);

		if (query.category && query.category !== "" && query.category !== "all") {
			const localProducts = allProductList.filter((pl) => pl.productcategory.id === Number(query.category));
			if (selectedBrandIds.length > 0) {
				let localProductList = [];
				selectedBrandIds.map((brandId) => {
					const localProduct = localProducts.filter((pl) => pl.productbrand.id === brandId);
					localProductList.push(...localProduct);
				});
				setProductList([...localProductList]);
				setIsLoading(false);
			} else {
				const localProductList = [...localProducts];
				setProductList(localProductList);
				setIsLoading(false);
			}
		} else {
			if (selectedBrandIds.length > 0) {
				let localProductList = [];
				selectedBrandIds.map((brandId) => {
					const localProduct = allProductList.filter((pl) => pl.productbrand.id === brandId);
					localProductList.push(...localProduct);
				});
				setProductList([...localProductList]);
				setIsLoading(false);
			} else {
				const localProductList = [...allProductList];
				setProductList(localProductList);
				setIsLoading(false);
			}
		}
	};

	return (
		<Layout title='Shop Page'>
			<div id='content'>
				<div className='breadcrumb'>
					<div className='container mt-2'>
						<ul className='p-0 mb-2'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li className='active'>Shop</li>
						</ul>
					</div>
				</div>
				<div className='shop'>
					<div className='container'>
						<div className='row'>
							<div className='col-12 col-md-4 col-lg-3'>
								<div className='shop-sidebar'>
									<div className='shop-sidebar__content'>
										<div className='shop-sidebar__section -categories'>
											<div className='section-title -style1 -medium' style={{ marginBottom: "1.875em" }}>
												<h2 className='sidebar-categories'>Categories</h2>
											</div>
											<ul>
												<li onClick={() => handleCategorySelect("all")}>All</li>
												{categoryList.map((category) =>
													<li key={category.id} onClick={() => handleCategorySelect(category.id)}>
														{category.category_name}
													</li>
												)}
											</ul>
										</div>
										<div className='shop-sidebar__section -refine'>
											<div className='section-title -style1 -medium' style={{ marginBottom: "1.875em" }}>
												<h2 className='sidebar-refine-search'>Brand</h2>
											</div>
											<div className='shop-sidebar__section__item'>
												<ul>
													{productBrandList?.map((brand, i) =>
														<li key={i}>
															<label htmlFor={"brand_id_" + brand.id}>
																<input
																	type='checkbox'
																	checked={brand.isChecked}
																	name='brand_name'
																	id={"brand_id_" + brand.id}
																	onChange={(e) => {
																		handleBandSelect(e.target.checked, brand);
																	}}
																/>
																{brand.name}
															</label>
														</li>
													)}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-12 col-md-8 col-lg-9'>
								<div className='shop-header'>
									<div className='shop-header__view'>
										<div className='shop-header__view__icon'>
											<a
												onClick={() => {
													setIsGridView(true);
												}}
												className={isGridView ? "text-success" : "text-secondary"}>
												<i className='fas fa-th'></i>
											</a>
											<a
												onClick={() => {
													setIsGridView(false);
												}}
												className={!isGridView ? "text-success" : "text-secondary"}>
												<i className='fas fa-bars'></i>
											</a>
										</div>
									</div>
								</div>
								<>
									{isLoading ? (
										<div className='col-12 text-center'>
											<i className='fa fa-spinner fa-spin me-2'></i>Loading Products...
										</div>
									) : (
										<div className='shop-products '>
											<div className='shop-products__gird'>
												<div className='row'>
													{
														productList.length > 0 &&
														productList.map((product, i) => <Product key={i} product={product} viewType={isGridView} shopPage={true} />)
													}
												</div>
											</div>
										</div>
									)}
								</>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
