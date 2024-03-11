import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import apiUrl from "../../config";
import { Card, ListGroup } from "react-bootstrap";
import { AppStore } from "../../store/AppStore";
import { calculateCart } from "../../services/utilityService";
import Product from "../shop/Product";
import Image from "next/image";
import "swiper/css";

export default function HeaderNavigation({ openCart }) {
	const { cart, user, logout } = useContext(AppStore);
	// const [showCard, setShowCard] = useState(0);
	const [inputValue, setInputValue] = useState();
	// const { state } = useContext(AppContext);
	const [menuList, setMenuList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [productList, setProductList] = useState([]);
	const [filteredProductList, setFilteredProductList] = useState([]);
	// let { totalQty } = calculateCart(cart);
	const [gender, setGender] = useState(null);
	let { totalQty } = calculateCart(cart);

	useEffect(() => {
		// console.log('header', cart)
		axios.get(apiUrl + "/web/get/webmenu").then((response) => {
			// console.log("waiting end", response);
			if (response.data.appStatus) {
				// const bottomMenuList = response.data.appData;
				// let bottomMenuListCopy = bottomMenuList?.map((item) => {
				// 	return {
				// 		...item,
				// 		isActive: false
				// 	};
				// });
				setMenuList(response.data.appData);
			}
		});

		axios
			.post(apiUrl + "/web/getall/product", {
				pageSize: 10,
				pageNo: 0
			})
			.then((response) => {
				console.log("HeaderNavigation ---- fetchProducts ------->", response);
				if (response.data.appStatus) {
					setProductList(response.data.appData.rows);
				}
			});
	}, []);

	const handleSelectCategory = (category) => {
		console.log(category);
		if (category !== null) {
			setSelectedCategory(category);
		} else {
			setSelectedCategory(null);
		}
	};

	const handleInput = (e) => {
		setInputValue(e.target.value);
		const searchString = e.target.value.toLowerCase();
		const loaclProductList = productList;
		// loaclProductList.map(prod => console.log(prod.name.toLowerCase()))
		let filterList = [];
		if (searchString) {
			filterList = loaclProductList.filter((prod) => prod.name.toLowerCase().includes(searchString));
		}
		console.log(filterList);
		setFilteredProductList(filterList);
	};

	return (
		<>
			<nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark ps-2 pe-2'>
				<div className='container-fluid'>
					<Link href='/'>
						<span className='navbar-brand me-2'>
							<Image className='logo' src='/app/assets/images/logo-white.png' alt='Logo' width={50} height={44} />
						</span>
					</Link>
					<button className='navbar-toggler' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasNavbar' aria-controls='offcanvasNavbar' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='offcanvas offcanvas-end' tabIndex='-1' id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel'>
						<div className='offcanvas-header'>
							<h5 className='offcanvas-title text-light' id='offcanvasNavbarLabel'>
								Aromashore
							</h5>
							<button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
						</div>
						<div className='offcanvas-body'>
							<ul className='navbar-nav mr-auto desktop-tablet-view'>
								{menuList?.map((category, i) => {
									if (i <= 4) {
										return (
											<li key={category.id} className='nav-item' onClick={() => handleSelectCategory(category)}>
												<a className='nav-link' href='#'>
													{category.category_name}
													<i className='fas fa-angle-down ms-2'></i>
												</a>
											</li>
										);
									}
								})}
								{menuList.length > 4 ? (
									<div className='dropdown'>
										<li className='nav-item'>
											<a className='nav-link' href='#' data-bs-toggle='dropdown' aria-expanded='false'>
												More<i className='fas fa-angle-down ms-2'></i>
											</a>
											<div className='dropdown-menu'>
												{menuList?.map((category, i) => {
													if (i > 4) {
														return (
															<a key={category.id} className='dropdown-item' href='#' onClick={() => handleSelectCategory(category)}>
																{category.category_name}
															</a>
														);
													}
												})}
											</div>
										</li>
									</div>
								) : (
									<></>
								)}
							</ul>
							<ul className='navbar-nav mr-auto mobile-view'>
								{menuList?.map((category, i) => (
									<li key={category.id} className='nav-item' onClick={() => handleSelectCategory(category)}>
										<a className='nav-link' href='#'>
											{category.category_name}
											<i className='fas fa-angle-down ms-2'></i>
										</a>
									</li>
								))}
							</ul>
							<ul className='navbar-nav'>
								<li className='nav-item me-lg-2 search-box'>
									<input type='search' id='search' className='form-control form-control-sm' placeholder='Search by Product Name...' onChange={handleInput} onFocus={handleInput} />
								</li>
								<li className='nav-item cart-button'>
									<button
										className='btn btn-outline-light btn-sm position-relative'
										onClick={(e) => {
											openCart(true);
											e.preventDefault();
										}}>
										<i className='fas fa-shopping-bag'>{totalQty > 0 ? <span className='cart__quantity'>{totalQty}</span> : <></>}</i>
									</button>
								</li>
								{!user && (
									<li className={`nav-item ${totalQty > 0 ? "ms-lg-4" : "ms-lg-2"} me-2 user-button`}>
										<Link href='/login'>
											<button className='btn btn-outline-light btn-sm'>
												<i className='fas fa-user'></i>
											</button>
										</Link>
									</li>
								)}
								{user && (
									<>
										<li className={`nav-item ${totalQty > 0 ? "ms-lg-4" : "ms-lg-2"} me-2 user-button`}>
											<Link href='/user'>
												<button className='btn btn-outline-secondary btn-sm'>
													<i className='fas fa-user'></i>
													<span className='customer-name'>{user.username}</span>
												</button>
											</Link>
										</li>
										<li className='nav-item me-2 logout-button'>
											<button
												className='btn btn-danger btn-sm'
												onClick={() => {
													Cookies.remove("login");
													logout();
												}}>
												<i className='fa fa-sign-out'></i>
											</button>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>
				</div>
			</nav>
			{/* 
			<nav className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark ps-2 pe-2'>
				<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerAromashore' aria-controls='navbarTogglerAromashore' aria-expanded='false' aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarTogglerAromashore'>
					<Link href='/'>
						<span className='navbar-brand me-2'>
							<img className='logo' src='/app/assets/images/logo-white.png' alt='Logo' width={50} />
						</span>
					</Link>
				</div>
			</nav> */}

			<div>
				{filteredProductList.length > 0 ? (
					<div className='result-card shadow' onMouseLeave={() => setFilteredProductList([])}>
						{/* <Card.Header>Featured</Card.Header> */}
						<ListGroup variant='flush'>
							{filteredProductList?.map((product, i) => {
								return (
									<div key={i}>
										<Link href={"/products/" + product.id}>
											<ListGroup.Item className='result-item'>
												{product.productimages[0] ? <Image src={product.productimages[0]?.image} alt={product.productimages[0]?.name} width={30} height={30} /> : <Image src='/app/assets/images/200.svg' alt='Placeholder' width={30} height={30} />}
												&nbsp;&nbsp;
												<b>Brand:&nbsp;</b>
												{product.productbrand.name},&nbsp;
												<b>Name:&nbsp;</b>
												{product.name}
											</ListGroup.Item>
											{/* <ListGroup.Item>{product.name}</ListGroup.Item> */}
										</Link>
									</div>
								);
							})}
						</ListGroup>
					</div>
				) : (
					<></>
				)}

				{selectedCategory === null ? (
					<></>
				) : (
					<div className='dropdown_mega_nav' onMouseLeave={() => setSelectedCategory(null)}>
						<div className='container-fluid'>
							<div className='item_wrapper'>
								<div className='item'>
									<h4 className=''>{selectedCategory?.category_name}</h4>
									<ul>
										<li className='category_name' onClick={() => setGender(null)}>
											<Link href={"/shop?category=" + selectedCategory?.id}>All</Link>
										</li>
										<li>
											<a className='category_name' onClick={() => setGender(2)}>
												Men&apos;s Collection
											</a>
										</li>
										<li>
											<a className='category_name' onClick={() => setGender(1)}>
												Women&apos;s Collection
											</a>
										</li>
									</ul>
								</div>
								{selectedCategory?.products.map((product, i) => {
									return (
										<div key={i} className='item'>
											{gender !== null ? product?.productdetail.gender === gender ? <Product product={product} /> : <></> : <Product product={product} />}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
