import React from "react";
import Slider from "../components/home/Slider";
import NewProductSlider from "../components/home/NewProductSlider";
import FeaturedProductSlider from "../components/home/FeaturedProductSlider";
import ResellerRequest from "../components/home/ResellerRequest";
import Layout from "../layouts/Layout";
import ProductCategories from "../components/home/ProductCategories";
import "swiper/css";

export default function Home() {
	return (
		<Layout title='Home Page'>
			<>
				<Slider />
				<ProductCategories />
				<NewProductSlider />
				<FeaturedProductSlider />
				<ResellerRequest />
			</>
		</Layout>
	);
}
