import React from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import apiUrl from "../config";
import parse from "html-react-parser";
import Link from "next/link";

function ReturnPolicy({ appData }) {
	return (
		<Layout title='Shop Page'>
			<>
				<div className='breadcrumb'>
					<div className='container mt-3'>
						<h3>Return Policy</h3>
						<ul className='p-0'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li className='active'>Return Policy</li>
						</ul>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>{appData != null ? parse(appData.description) : appData}</div>
					</div>
				</div>
			</>
		</Layout>
	);
}

export async function getStaticProps() {
	let data = { appData: null };
	try {
		data = await axios.get(apiUrl + "/public/get/return-policy");
		return {
			props: {
				appData: data.data.appData
			}
		};
	} catch (error) {
		return {
			props: {
				appData: null
			}
		};
	}
}

export default ReturnPolicy;
