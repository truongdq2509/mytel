import React, { useEffect, useState } from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';
import { getCurrentUser } from '../Redux/futures/account/actions';
import { useDispatch, useSelector } from 'react-redux';
import { curStateAccount } from '../Redux/selector';
import { useParams } from "react-router";

function LayoutApp({ children }) {
	const dispatch = useDispatch();
	const selectorAccount = useSelector(curStateAccount)
	const [userInfo, setUserInfo] = useState(selectorAccount.userInfo)
	const heightWeb = window.innerHeight
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const afterGetUserBid = (data, isLoading) => {
		if (data) {
			setUserInfo(data.data);
		} else {
			setUserInfo(null)
		}
	};
	useEffect(() => {
		dispatch(getCurrentUser({ callback: afterGetUserBid }))

	}, [selectorAccount.token]);

	const { id = null, idResult = null } = useParams();

	return (
		<div style={{ minHeight: `${heightWeb}px` }} className="main-layout">
			{isMobile ? <HeaderMobile user={userInfo} /> : <HeaderWeb user={userInfo} />}
			<div style={{ minHeight: isMobile ? `${heightWeb - 69}px` : null }} className={`main-layout-body container ${id && idResult ? "main-layout-p-0" : ""}`}>
				<div style={{ minHeight: isMobile ? `${heightWeb - 68 - 80}px` : null }} className='main-layout-body-page'>{children}</div>
				{!isMobile && <RightWeb user={userInfo} />}
			</div>
			{isMobile && (<FooterMobile user={userInfo} />)}

		</div>
	);
}

export default LayoutApp;
