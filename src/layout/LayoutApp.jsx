import React, { useEffect, useState } from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';
import { getItemCookie } from '../utils/cookie';
import { getCurrentUser } from '../Redux/futures/account/actions';
import { useDispatch, useSelector } from 'react-redux';
import { curStateAccount } from '../Redux/selector';
import { useParams } from "react-router";

function LayoutApp({ children }) {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState(null)
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const selectorAccount = useSelector(curStateAccount)
	const afterGetUserBid = (data, isLoading) => {
		if (data) {
			setUserInfo(data);
		}
	};
	useEffect(() => {
		console.log(getItemCookie('token'));
		if (getItemCookie('token')) {
			dispatch(getCurrentUser({ callback: afterGetUserBid }))
		}
	}, [selectorAccount.token]);

	const { id = null, idResult = null } = useParams();

	return (
		<div className="main-layout">
			{isMobile ? <HeaderMobile user={userInfo} /> : <HeaderWeb user={userInfo} />}
			<div className={`main-layout-body container ${id && idResult ? "main-layout-p-0" : ""}`}>
				<div className='main-layout-body-page'><div>{children}</div></div>
				{!isMobile && <RightWeb user={userInfo} />}
			</div>
			{isMobile && (<FooterMobile user={userInfo} />)}

		</div>
	);
}

export default LayoutApp;
