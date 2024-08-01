import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ImageProduct from "../component/ImageProduct";
import Countdown, { zeroPad } from "react-countdown";
import { mediaQueryPoint, useMediaQuery } from "../utils/hooks";
import BannerHomeMobile from "../component/BannerHomeMobile";
import { useDispatch, useSelector } from 'react-redux';
import { getBannerHome, getBidProduct, getUpNextProduct } from '../Redux/futures/home/actions';
import { curStateAccount, curStateHome } from '../Redux/selector';
import { currentDate } from '../helper/const';
import moment from 'moment';
import { setIdCurrentProduct } from '../Redux/futures/rightWeb/actions';
import ModalDescriptionBid from '../component/ModalDescriptionBid';
import { useNavigate } from 'react-router';
import PATH from '../config/PATH';
import ModalWinner from '../component/ModalWinner';
import { getResultProduct } from '../Redux/futures/result/action';

function HomePage() {
	const { t } = useTranslation();
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const selectorHome = useSelector(curStateHome)
	const selectorAccount = useSelector(curStateAccount)
	const isPcMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xxl}px)`);
	const isTablet = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.md}px)`);
	const isMobileMin = useMediaQuery(`(max-width: ${mediaQueryPoint.xs}px)`);

	const [currentProduct, setCurrentProduct] = useState([])
	const [upNextProduct, setUpNextProduct] = useState([])
	const [banner, setBanner] = useState([])
	const [openModalDetail, setOpenModalDetail] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [results, setResults] = useState([])
	const [objTextHeader, setObjectTextHeader] = useState({
		text1: t("right_page.text_foot1"),
		text2: t("right_page.text_foot2"),
		text3: null
	})
	useEffect(() => {
		if (selectorAccount.userInfo) {
			if (selectorAccount.userInfo.isAdvantage) {
				setObjectTextHeader({
					text1: t("right_page.text_foot1"),
					text2: t("right_page.text_foot2"),
					text3: t("right_page.text_foot8")
				})
			} else {
				if (selectorAccount.userInfo.minPriceOfCurrentUser > 0) {
					setObjectTextHeader({
						text1: t("right_page.text_foot5"),
						text2: t("right_page.text_foot6").replace("_NUMBER_", selectorAccount.userInfo.countSamePrice),
						text3: t("right_page.text_foot7").replace("_NUMBER_", selectorAccount.userInfo.countLowerPrice)
					})
				} else {
					setObjectTextHeader({
						text1: t("right_page.text_foot3"),
						text2: t("right_page.text_foot4"),
						text3: null
					})
				}
			}
		} else {
			setObjectTextHeader({
				text1: t("right_page.text_foot3"),
				text2: t("right_page.text_foot4"),
				text3: null
			})
		}
	}, [selectorAccount.userInfo]);


	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		let textDay = t("home_page.day")
		if (days > 1) {
			textDay = t("home_page.days")
		}
		if (days >= 1) {
			return <span className='day'>{`${zeroPad(days)} ${textDay.toUpperCase()} ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}</span>
		} else {
			return <span >{`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}</span>
		}
	};
	const afterGetResult = (data, isLoading) => {
		if (data) {
			setResults(data.data)
		}
	}

	useEffect(() => {
		dispatch(getBidProduct({}))
		dispatch(getUpNextProduct({}))
		dispatch(getBannerHome({}))
		dispatch(getResultProduct({ callback: afterGetResult }))
	}, [])
	useEffect(() => {
		if (selectorHome?.bidProduct?.length > 0) {
			let currentProduct = selectorHome.bidProduct.filter(
				(product) => new Date(product?.start_time).getTime() < currentDate
			);
			if (currentProduct) {
				dispatch(setIdCurrentProduct(currentProduct[0]?.cp_id))
				setCurrentProduct(currentProduct)
			} else {
				dispatch(setIdCurrentProduct(null))
				setCurrentProduct([])
			}

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
			let bannerMobile = []
			if (isMobile) {
				bannerMobile = banner.filter(it => it.is_mobile)
			} else {
				bannerMobile = banner.filter(it => !it.is_mobile)
			}
			setBanner(bannerMobile)
		} else {
			setBanner([])
		}
	}, [selectorHome, isMobile])
	const handleClickBanner = (data) => {
		if (data.href) window.location.href = data.href;
		return;
	}
	const handleCurrentProduct = (data) => {
		setOpenModalDetail(true);
		setSelectedProduct(data)
	}
	return (
		<div className="container-home">
			{banner.length > 0 ? <div className="container-home-banner">
				{isMobile ? (
					<BannerHomeMobile data={banner} />
				) : (
					<Carousel autoplaySpeed={5000} autoplay={true} infinite={true}>
						{banner.map((it, index) => {
							return <div key={`banner_item_${it.id}_${index}`}><div onClick={() => handleClickBanner(it)} className="container-home-banner-item" style={{ backgroundImage: `url(${it.path})` }} /></div>
						})}
					</Carousel>
				)}
			</div> : <div className='fake-banner' />}

			{currentProduct.length > 0 ? currentProduct.map((item, index) => {
				let listImageProduct = item?.product_image?.split(',')
				return <div key={`curren_product_${item.product_id}_${index}`} className={`container-home-current-product ${upNextProduct.length > 0 ? '' : 'full-height'}`}>
					<div className="container-home-current-product-head">
						<div className="title">{t("home_page.current_action")}</div>
						<div className="detail" onClick={() => { handleCurrentProduct(item) }}>{t("home_page.detail")}</div>
					</div>
					<div className="container-home-current-product-content">
						<div className="container-home-current-product-content-slide-product">
							<ImageProduct product={item} data={listImageProduct} />
						</div>
						<div className="container-home-current-product-content-info-product">
							<h3 className="name-product" >
								{item?.product_name}
							</h3>
							<p className="code-product">
								{t("home_page.code").replace("_CODE_", item?.product_code)}
							</p>
							<div className="line" />
							<div className="price">{`${item?.product_price.toLocaleString('en-US')} MMK`}</div>
							<p className="code-product">{t("home_page.time_end")}</p>
							<div className="time-count-down">
								<Countdown date={item?.end_time} renderer={renderer} />
							</div>
							<div onClick={() => navigate(`${PATH.BID}/running`)} className='button-bid'>
								<div className='button-bid-icon' />
								<span className="button-bid-text">{t("home_page.bid_now")}</span>
							</div>
						</div>
					</div>
				</div>
			}) : null}
			{upNextProduct.length > 0 ? <div className={`container-home-current-product ${!currentProduct.length > 0 ? '' : 'full-height'}`}>
				<div className="container-home-current-product-head">
					<div className="title">{t("home_page.upcoming_action")}</div>
					<div onClick={() => navigate(`${PATH.BID}/upcoming`)} className="detail">{t("home_page.detail")}</div>
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
									<div onClick={() => navigate(`${PATH.BID}/upcoming`)} className="box-item hover-page" key={`curren_product_${item.product_id}_${index}`}>
										<div
											key={index}
											className="box-item-image"
											style={{ backgroundImage: `url(${listImageProduct[0]})` }}
										/>
										<div className="box-item-info-product" >
											<div className="box-item-info-product-info">
												<div className="box-item-info-product-info-name two-line">
													{item?.product_name}
												</div>
												<p className="box-item-info-product-info-code one-line">
													{t("home_page.product_code").replace("_CODE_", item?.product_code)}
												</p>
												<div className="box-item-info-product-info-price one-line">
													{`${item?.product_price.toLocaleString('en-US')} MMK`}
												</div>
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
			{isMobile ? <div className="right-page-head">
				<div className="number-people">
					<span>{currentProduct[0]?.count_user || 0}</span>
					<span>{t("right_page.number_people")}</span>
				</div>
				<div className="hr-mobile" />

				<div className={`icon-head ${selectorAccount.userInfo && !selectorAccount.userInfo.isAdvantage && selectorAccount.userInfo.minPriceOfCurrentUser > 0 ? 'icon-lose' : ''}`} />
				<div className="box-text">
					<div>{objTextHeader.text1}</div>
					<div>{objTextHeader.text2}</div>
					{objTextHeader.text3 ? <div>{objTextHeader.text3}</div> : null}
				</div>
			</div> : null}
			<ModalDescriptionBid
				openModal={openModalDetail}
				setOpenModal={setOpenModalDetail}
				data={selectedProduct}
			/>
			{results?.length > 0 &&
				results != null &&
				results?.[0]?.status !== 5 ? (
				<ModalWinner
					result={results?.[0]}
					isWinner={results?.[0]?.status !== 5}
				/>
			) : null}
		</div>
	);
}

export default HomePage;
