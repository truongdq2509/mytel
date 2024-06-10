import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageProduct from "../component/ImageProduct";
import Countdown from "react-countdown";
import { mediaQueryPoint, useMediaQuery } from "../utils/hooks";
import BannerHomeMobile from "../component/BannerHomeMobile";
import { useDispatch, useSelector } from 'react-redux';
import { getBannerHome, getBidProduct, getUpNextProduct } from '../Redux/futures/home/actions';
import { curStateHome } from '../Redux/selector';
import { currentDate } from '../helper/const';
import moment from 'moment';
import { setIdCurrentProduct } from '../Redux/futures/rightWeb/actions';

function HomePage() {
	const { t } = useTranslation();
	const dispatch = useDispatch()
	const selectorHome = useSelector(curStateHome)
	const isPcMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xxl}px)`);
	const isTablet = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.md}px)`);
	const isMobileMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xs}px)`);

	const [currentProduct, setCurrentProduct] = useState([])
	const [upNextProduct, setUpNextProduct] = useState([])
	const [banner, setBanner] = useState([])

	useEffect(() => {
		dispatch(getBidProduct({}))
		dispatch(getUpNextProduct({}))
		dispatch(getBannerHome({}))
	}, [])
	useEffect(() => {
		if (selectorHome?.bidProduct?.length > 0) {
			let currentProduct = selectorHome.bidProduct.filter(
				(product) => new Date(product?.start_time).getTime() < currentDate
			);
			dispatch(setIdCurrentProduct(currentProduct[0]?.cp_id))
			setCurrentProduct(currentProduct)
		} else {
			dispatch(setIdCurrentProduct(null))
			setCurrentProduct([])
		}
		if (selectorHome?.upNextProduct?.length > 0) {
			let newUpNextProduct = selectorHome.upNextProduct?.sort(
				(a, b) => Date.parse(a?.start_time) - Date.parse(b?.start_time)
			)
			setUpNextProduct(newUpNextProduct)
		} else {
			setUpNextProduct([])
		}
		if (selectorHome?.banner?.length > 0) {
			let banner = selectorHome.banner?.sort(
				(a, b) => a?.position - b?.position
			)
			setBanner(banner)
		} else {
			setBanner([])
		}
	}, [selectorHome])
	return (
		<div className="container-home">
			{banner.length > 0 ? <div className="container-home-banner">
				{isMobile ? (
					<BannerHomeMobile data={banner} />
				) : (
					<Carousel autoplaySpeed={5000} autoplay={true} infinite={true}>
						{banner.map((it, index) => {
							return <div><div key={`banner_item_${it.id}_${index}`} className="container-home-banner-item" style={{ backgroundImage: `url(${it.path})` }} /></div>
						})}
					</Carousel>
				)}
			</div> : null}

			{currentProduct.length > 0 ? currentProduct.map((item, index) => {
				let listImageProduct = item?.product_image?.split(',')
				return <div key={`curren_product_${item.product_id}_${index}`} className="container-home-current-product">
					<div className="container-home-current-product-head">
						<div className="title">{t("home_page.current_action")}</div>
						<div className="detail">{t("home_page.detail")}</div>
					</div>
					<div className="container-home-current-product-content">
						<div className="container-home-current-product-content-slide-product">
							<ImageProduct data={listImageProduct} />
						</div>
						<div className="container-home-current-product-content-info-product">
							<h3 className="name-product">
								{item?.product_name}
							</h3>
							<p className="code-product">
								{t("home_page.code").replace("_CODE_", item?.product_code)}
							</p>
							<div className="line" />
							<div className="price">{`${item?.product_price.toLocaleString('de-DE')} MMK`}</div>
							<p className="code-product">{t("home_page.time_end")}</p>
							<div className="time-count-down">
								<Countdown date={item?.end_time} />
							</div>
							<div className='button-bid'>
								<div className='button-bid-icon' />
								<span className="button-bid-text">{t("home_page.bid_now")}</span>
							</div>
						</div>
					</div>
				</div>
			}) : null}
			{upNextProduct.length > 0 ? <div className="container-home-current-product">
				<div className="container-home-current-product-head">
					<div className="title">{t("home_page.upcoming_action")}</div>
					<div className="detail">{t("home_page.detail")}</div>
				</div>
				<div className="container-home-current-product-content-upcoming">
					<div className="box-slide">
						<Carousel
							autoplaySpeed={5000}
							slidesToShow={isMobileMin ? 2 : (isTablet || isMobile) ? 2 : isPcMin ? 3 : 4}
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
							{upNextProduct.map((item, index) => {
								let listImageProduct = item?.product_image?.split(',')
								let dateFormat = moment(item.start_time).format('DD/MM/YYYY HH:mm')
								return (
									<div className="box-item" key={`curren_product_${item.product_id}_${index}`}>
										<div
											key={index}
											className="box-item-image"
											style={{ backgroundImage: `url(${listImageProduct[0]})` }}
										/>
										<div className="box-item-info-product">
											<div className="box-item-info-product-name">
												{item?.product_name}
											</div>
											<p className="box-item-info-product-code">
												{t("home_page.product_code").replace("_CODE_", item?.product_code)}
											</p>
											<div className="box-item-info-product-price">
												{`${item?.product_price.toLocaleString('de-DE')} MMK`}
											</div>
											<div className="box-item-info-product-box-foot">
												<div className="box-item-info-product-box-foot-date">
													<div className="icon-date" />
													<span>{dateFormat}</span>
												</div>
												<div className="box-item-info-product-box-foot-icon" />
											</div>
										</div>
									</div>
								)
							})}
						</Carousel>
					</div>
				</div>
			</div> : null}
		</div>
	);
}

export default HomePage;
