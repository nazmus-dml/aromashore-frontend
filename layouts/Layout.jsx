import React, { useState } from "react";
import Head from "next/head";
import HeaderNavigation from "../components/common/HeaderNavigation";
import Footer from "../components/common/Footer";
import ShoppingCart from "../components/common/ShoppingCart";

export default function Layout({ children, title = "Aromashore" }) {
	const [isCartOpen, setIsCarOpen] = useState(false);
	const openCart = (isTrue) => {
		setIsCarOpen(isTrue);
	};
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<HeaderNavigation openCart={openCart} />
			<div id='content' className='main-content'>
				{children}
				<Footer />
				<ShoppingCart isCartOpen={isCartOpen} />
			</div>
			{isCartOpen && (
				<div
					onClick={() => {
						setIsCarOpen(false);
					}}
					className='drawer-backdrop fade show'></div>
			)}
		</>
	);
}
