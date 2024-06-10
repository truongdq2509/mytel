import { Carousel } from "antd";
import { useEffect, useRef, useState } from "react";
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';

function ImageProduct({ data }) {
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.md}px)`);
	const [slider, setSlider] = useState(null);
	const [sliderDot, setSliderDot] = useState(null);
	const sliderTop = useRef(null);
	const sliderBottom = useRef(null);
	const [activeImage, setActiveImage] = useState(0);
	const [prevAutoImageActive, setPrevAutoImageActive] = useState(null);
	let prevImageActive;
	function handleActiveImage(event, index) {
		if (prevImageActive && typeof prevImageActive === 'object') {
			prevImageActive.style.border = 'none';
		}
		if (prevAutoImageActive && typeof prevAutoImageActive === 'object') {
			prevAutoImageActive.style.border = 'none';
		}
		prevImageActive = event.target;
		event.target.style.border = '2px solid #F97A1C';
	}
	useEffect(() => {
		setSlider(sliderTop.current);
		setSliderDot(sliderBottom.current);
	}, []);
	let id = 'block_preview';
	useEffect(() => {
		const bottomSlideEl = document.querySelectorAll(
			`#${id} .slick-slide:nth-child(${activeImage + 1}) .container-image-product-slide-item .image`
		)
		bottomSlideEl.forEach((el) => {
			if (prevAutoImageActive && typeof prevAutoImageActive === 'object') {
				prevAutoImageActive.style.border = 'none';
			}
			setPrevAutoImageActive(el);
			el.style.border = '2px solid #F97A1C';
		});
	}, [activeImage, id, prevAutoImageActive]);
	return (
		<div className="container-image-product">
			<div className="container-image-product-slide">
				<Carousel
					autoplaySpeed={5000}
					autoplay
					asNavFor={sliderDot}
					dots={false}
					ref={sliderTop}
					beforeChange={(current, next) => {
						setActiveImage(next);
					}}
				>
					{data.map((product, index) => (
						<div className="container-image-product-slide-item">
							<div
								key={index}
								className="image"
								style={{ backgroundImage: `url(${product})` }}
							/>
							<div className="icon-gift" />
						</div>
					))}
				</Carousel>
			</div>
			{!isMobile && <div id={`block_preview`} className="container-image-product-dot-slide">
				<Carousel
					autoplaySpeed={5000}
					asNavFor={slider}
					slidesToShow={data.length}
					dots={false}
					focusOnSelect
					infinite={false}
					ref={sliderBottom}
				>
					{data.map((product, index) => (
						<div className="container-image-product-slide-item item-btn-slide">
							<div
								key={index}
								className="image"
								onClick={(event) => handleActiveImage(event, index)}
								style={{ backgroundImage: `url(${product})` }}
							/>
						</div>
					))}
				</Carousel>
			</div>}
		</div>
	);
}

export default ImageProduct;
