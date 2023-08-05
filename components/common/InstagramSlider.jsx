import React from "react";
import SlickSlider from "react-slick";
import Image from "next/image";

function InstagramSlider() {
	const settings = {
		dot: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1
	};
	return (
		<div className='instagram-two'>
			<div className='instagram-two-slider'>
				<SlickSlider {...settings}>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/1.png' alt='Instagram image' width={320} height={320} />
					</a>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/2.png' alt='Instagram image' width={320} height={320} />
					</a>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/3.png' alt='Instagram image' width={320} height={320} />
					</a>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/4.png' alt='Instagram image' width={320} height={320} />
					</a>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/5.png' alt='Instagram image' width={320} height={320} />
					</a>
					<a className='slider-item' href='https://www.instagram.com/'>
						<Image src='/app/assets/images/instagram/InstagramTwo/6.png' alt='Instagram image' width={320} height={320} />
					</a>
				</SlickSlider>
			</div>
		</div>
	);
}

export default InstagramSlider;
