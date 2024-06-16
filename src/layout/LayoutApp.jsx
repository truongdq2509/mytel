import React, { useEffect, useState } from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';
import { getItemCookie } from '../utils/cookie';
import { getCurrentUser } from '../Redux/futures/account/actions';
import { useDispatch } from 'react-redux';

function LayoutApp({ children }) {
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = useState()
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const afterGetUserBid = (data, isLoading) => {
		if (data) {
			console.log(data);
			setUserInfo(data);
		}
	};
	useEffect(() => {
		if (getItemCookie('token')) {
			dispatch(getCurrentUser({ callback: afterGetUserBid }))
		}
	}, []);
	return (
		<div className="main-layout">
			{isMobile ? <HeaderMobile user={userInfo} /> : <HeaderWeb user={userInfo} />}
			<div className='main-layout-body container'>
				<div className='main-layout-body-page'><div>{children}</div></div>
				{!isMobile && <RightWeb user={userInfo} />}
			</div>
			{isMobile && (<FooterMobile user={userInfo} />)}

		</div>
	);
}

export default LayoutApp;
