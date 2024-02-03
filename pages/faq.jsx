import React from "react";
import Layout from "../layouts/Layout";
import axios from "axios";
import apiUrl from "../config";
import parse from "html-react-parser";
import Link from "next/link";

function Faq({ appData }) {
	return (
		<Layout title='FAQ'>
			<>
				<div className='breadcrumb'>
					<div className='container mt-2'>
						<ul className='p-0 mb-2'>
							<li>
								<Link href='/'>Home</Link>
							</li>
							<li className='active'>FAQ</li>
						</ul>
					</div>
				</div>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<div className='accordion' id='faqAccordianList'>
								{appData != null
									? appData.map((item) => {
										return (
											<div className='card mb-2' key={item.id}>
												<div className='card-header' data-bs-toggle='collapse' data-bs-target={`#faq-answer-section_${item.id}`}>
													<b>{item.question}</b>
												</div>
												<div id={`faq-answer-section_${item.id}`} className='collapse' data-bs-parent='#faqAccordianList'>
													<div className='card-body'>{parse(item.answer)}</div>
												</div>
											</div>
										);
									})
									: appData}
							</div>
						</div>
					</div>
				</div>
			</>
		</Layout>
	);
}

export async function getStaticProps() {
	let data = { appData: null };
	try {
		data = await axios.get(apiUrl + "/public/get/faq");
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

export default Faq;
