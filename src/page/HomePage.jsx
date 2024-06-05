import { Carousel } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import imgProduct from "../assets/images/imgProduct.png";
import ImageProduct from "../component/ImageProduct";
import Countdown from "react-countdown";
import { mediaQueryPoint, useMediaQuery } from "../utils/hooks";
import BannerHomeMobile from "../component/BannerHomeMobile";

function HomePage() {
	const { t } = useTranslation();
	const isPcMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xxl}px)`);
	const isTablet = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.md}px)`);
	const isMobileMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xs}px)`);
	console.log(isPcMin, isMobile, isTablet);
	const products = [
		{
			image: imgProduct,
		},
		{
			image: imgProduct,
		},
		{
			image: imgProduct,
		},
		{
			image: imgProduct,
		},
	];
	const upcomingProducts = [...products, ...products];
	return (
		<div className="container-home">
			<div className="container-home-banner">
				{isMobile ? (
					<BannerHomeMobile />
				) : (
					<Carousel autoplay={true} infinite={true}>
						<div className="container-home-banner-item" />
						<div className="container-home-banner-item" />
						<div className="container-home-banner-item" />
					</Carousel>
				)}
			</div>
			<div className="container-home-current-product">
				<div className="container-home-current-product-head">
					<div className="title">{t("home_page.current_action")}</div>
					<div className="detail">{t("home_page.detail")}</div>
				</div>
				<div className="container-home-current-product-content">
					<div className="container-home-current-product-content-slide-product">
						<ImageProduct data={products} />
					</div>
					<div className="container-home-current-product-content-info-product">
						<h3 className="name-product">
							Anker power conf+ bluetooth speakerphone
						</h3>
						<p className="code-product">
							{t("home_page.code").replace("_CODE_", "AB01")}
						</p>
						<div className="line" />
						<div className="price">10.000.000 MMK</div>
						<p className="code-product">{t("home_page.time_end")}</p>
						<div className="time-count-down">
							<Countdown date={"2024-06-10T10:29:59.000Z"} />
						</div>
						<div className='button-bid'>
							<div className='button-bid-icon' />
							<span className="button-bid-text">{t("home_page.bid_now")}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="container-home-current-product">
				<div className="container-home-current-product-head">
					<div className="title">{t("home_page.upcoming_action")}</div>
					<div className="detail">{t("home_page.detail")}</div>
				</div>
				<div className="container-home-current-product-content-upcoming">
					<div className="box-slide">
						<Carousel
							autoplaySpeed={5000}
							slidesToShow={isMobileMin ? 2 : (isTablet || isMobile) ? 2.5 : isPcMin ? 3 : 4}
							autoplay={false}
							dots={false}
							infinite={false}
							arrows={isMobile ? false : true}
							nextArrow={
								<div>
									<div className="slide-btn next-icon" />
								</div>
							}
							prevArrow={
								<div>
									<div className="slide-btn prev-icon" />
								</div>
							}
							slidesToScroll={1}
						>
							{upcomingProducts.map((product, index) => (
								<div className="box-item">
									<div
										key={index}
										className="box-item-image"
										style={{ backgroundImage: `url(${product.image})` }}
									/>
									<div className="box-item-info-product">
										<div className="box-item-info-product-name">
											Apple Watch
										</div>
										<p className="box-item-info-product-code">
											{t("home_page.product_code").replace("_CODE_", "TCL")}
										</p>
										<div className="box-item-info-product-price">
											10.000.000 MMK
										</div>
										<div className="box-item-info-product-box-foot">
											<div className="box-item-info-product-box-foot-date">
												<div className="icon-date" />
												<span>25/05/2024 15:00</span>
											</div>
											<div className="box-item-info-product-box-foot-icon" />
										</div>
									</div>
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
