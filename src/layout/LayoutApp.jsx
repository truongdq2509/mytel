import React, { useEffect, useState } from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';
import { getCurrentUser, getWinnerMonth, loginWithPassword } from '../Redux/futures/account/actions';
import { useDispatch, useSelector } from 'react-redux';
import { curStateAccount } from '../Redux/selector';
import { useLocation, useParams } from "react-router";
import ModalChangePassword from '../component/ModalChangePassword';
import "moment/locale/en-gb";
import i18n from 'i18next';
import ModalWinnerMonth from '../component/ModalWinnerMonth';
import { getData, setData } from '../utils/localstorage';
import Cookies from 'universal-cookie';
import ModalNotifycation from '../component/ModalNotifycation';

function LayoutApp({ children }) {
	const dispatch = useDispatch();
	const selectorAccount = useSelector(curStateAccount)
	const [userInfo, setUserInfo] = useState(selectorAccount.userInfo)
	const location = useLocation()
	const heightWeb = window.innerHeight
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const [changePage, setChangePage] = useState(0)
	const [monthWinner, setMonthWinner] = useState(null)
	const cookies = new Cookies();
	const [openModalNotification, setOpenModalNotification] = useState(false)
	const [messageError, setMessageError] = useState('')
	const [checkShowBack, setCheckShowBack] = useState(getData("login_with_app") || null)
	const afterGetUserBid = (data, isLoading) => {
		if (data) {
			setUserInfo(data.data);
		} else {
			setUserInfo(null)
		}
	};
	const afterAutoLogin = (data, isLoading) => {
		if (data) {
			setCheckShowBack(1)
			dispatch(getCurrentUser({ callback: afterGetUserBid }))
		}


	}
	useEffect(() => {
		let timout
		let countLogin = 0
		console.log("run nẻ");

		let checkAutoLogin = () => {
			const msisdn = document.getElementById('msisdn_myid').value;
			const tokenEncoded = document.getElementById("token_myid").value;
			console.log("tokenEncoded", msisdn, tokenEncoded);


			if ((msisdn && !msisdn.includes("<!--#")) || (tokenEncoded && !tokenEncoded.includes("<!--#"))) {
				if (!getData("login_with_app") || getData("login_with_app") != 1) {
					localStorage.removeItem("login_with_app")
					setData("login_with_app", 1)
				}
			}

			if (msisdn && tokenEncoded && !(cookies.get('isLoggedIn') !== undefined && cookies.get('isLoggedIn'))) {
				const body = {
					isdn: msisdn,
					tokenEncoded,
					callback: afterAutoLogin
				}
				dispatch(loginWithPassword(body))
			} else {
				if (countLogin < 5) {
					timout = setTimeout(() => {
						countLogin++
						checkAutoLogin()
					}, 200)
				}
			}
		}
		checkAutoLogin()
		return () => {
			clearTimeout(timout)
		}
	}, [])
	useEffect(() => {
		if (selectorAccount.userInfo) {
			setUserInfo(selectorAccount.userInfo);
		} else {
			dispatch(getCurrentUser({ callback: afterGetUserBid }))
		}
	}, [selectorAccount.userInfo, selectorAccount.token]);
	const afterGetWinner = (data, isLoading) => {
		if (data) {
			setMonthWinner(data.data)
		} else {
			setMonthWinner(null)
		}
	}
	useEffect(() => {
		dispatch(getWinnerMonth({ callback: afterGetWinner }))
	}, [changePage])
	useEffect(() => {
		window.scrollTo(0, 0);
		setChangePage(new Date() * 1)
	}, [location.pathname])
	useEffect(() => {
		if (localStorage.getItem("i18nextLng") === "en") {
			localStorage.setItem("i18nextLng", "my")
			i18n.changeLanguage("my");
		}
	}, [])


	const { id = null, idResult = null } = useParams();

	return (
		<div style={{ minHeight: `${heightWeb}px` }} className="main-layout">
			{isMobile ? <HeaderMobile checkShowBack={checkShowBack} user={userInfo} /> : <HeaderWeb checkShowBack={checkShowBack} user={userInfo} />}
			<div style={{ minHeight: isMobile ? `${heightWeb - 69}px` : null }} className={`main-layout-body container ${id && idResult ? "main-layout-p-0" : ""}`}>
				<div style={{ minHeight: isMobile ? `${heightWeb - 68 - 80}px` : null }} className='main-layout-body-page'>{children}</div>
				{!isMobile && <RightWeb user={userInfo} />}
			</div>
			{isMobile && (<FooterMobile user={userInfo} />)}
			{selectorAccount && selectorAccount.userInfo && !selectorAccount.userInfo.is_updated_password ? <ModalChangePassword changePage={changePage} /> : null}
			{monthWinner ? <ModalWinnerMonth monthWinner={monthWinner} /> : null}
			<ModalNotifycation
				open={openModalNotification}
				handleCancel={() => setOpenModalNotification(false)}
				message={messageError}
			/>
		</div>
	);
}

export default LayoutApp;
