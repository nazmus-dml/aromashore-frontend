import React from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import apiUrl from "../config";
import parse from "html-react-parser";
import Link from "next/link";

function Terms({ appData }) {
	return (
		<Layout title='Terms and Conditions'>
			<>
				<div className='breadcrumb'>
					<div className='container mt-3'>
						<h3>Terms and Conditions</h3>
						<ul className='p-0'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li className='active'>Terms and Conditions</li>
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
		data = await axios.get(apiUrl + "/public/get/terms-condition");
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

export default Terms;
