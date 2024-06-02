import { Carousel } from "antd";
import React from "react";
import { useTranslation } from 'react-i18next';
import imgProduct from "../assets/images/imgProduct.png"
import ImageProduct from '../component/ImageProduct';
import Countdown from 'react-countdown';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';



function HomePage() {
	const { t } = useTranslation()
	const isPcMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xxl}px)`)
	const isTablet = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const products = [
		{
			image: imgProduct
		},
		{
			image: imgProduct
		},
		{
			image: imgProduct
		},
		{
			image: imgProduct
		}

	]
	const upcomingProducts = [...products, ...products]
	return (
		<div className="container-home">
			<div className="container-home-banner">
				<Carousel autoplay={true} infinite={true}>
					<div className="container-home-banner-item" />
					<div className="container-home-banner-item" />
					<div className="container-home-banner-item" />
				</Carousel>
			</div>
			<div className="container-home-current-product">
				<div className='container-home-current-product-head'>
					<div className='title'>{t("home_page.current_action")}</div>
					<div className='detail'>{t("home_page.detail")}</div>
				</div>
				<div className='container-home-current-product-content'>
					<div className='container-home-current-product-content-slide-product'>
						<ImageProduct data={products} />
					</div>
					<div className='container-home-current-product-content-info-product'>
						<h3 className='name-product'>Anker power conf+ bluetooth speakerphone</h3>
						<p className='code-product'>{t("home_page.code").replace("_CODE_", "AB01")}</p>
						<div className='line' />
						<div className='price'>10.000.000 MMK</div>
						<p className='code-product'>{t("home_page.time_end")}</p>
						<div className='time-count-down'>
							<Countdown date={"2024-06-10T10:29:59.000Z"} />
						</div>

					</div>
				</div>
			</div>
			<div className='container-home-current-product'>
				<div className='container-home-current-product-head'>
					<div className='title'>{t("home_page.upcoming_action")}</div>
					<div className='detail'>{t("home_page.detail")}</div>
				</div>
				<div className='container-home-current-product-content-upcoming'>
					<div className='box-slide'>
						<Carousel
							autoplaySpeed={5000}
							slidesToShow={isPcMin ? 3 : isTablet ? 2 : 4}
							autoplay={false}
							dots={false}
							infinite={false}
							arrows={true}
							slidesToScroll={1}
						>
							{upcomingProducts.map((product, index) => (
								<div className="container-image-product-slide-item">
									<div
										key={index}
										className="image"
										style={{ backgroundImage: `url(${product.image})` }}
									/>
								</div>
							))}
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
