import React from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import apiUrl from "../config";
import parse from "html-react-parser";
import Link from "next/link";

function AboutUs({ appData }) {
	return (
		<Layout title='About Page'>
			<>
				<div className='breadcrumb'>
					<div className='container mt-3'>
						<h3>About Us</h3>
						<ul className='p-0'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li className='active'>About Us</li>
						</ul>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>{parse(appData.description)}</div>
					</div>
				</div>
			</>
		</Layout>
	);
}

export async function getStaticProps() {
	try {
		const {
			data: { appStatus, appMessage, appData }
		} = await axios.get(apiUrl + "/public/get/about");
		return {
			props: {
				appData: appData
			}
		};
	} catch (error) {
		return {
			props: {
				appData: []
			}
		};
	}
}

export default AboutUs;
