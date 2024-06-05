import React from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';

function LayoutApp({ children }) {
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	return (
		<div className="main-layout">
			{isMobile ? <HeaderMobile /> : <HeaderWeb />}
			<div className='main-layout-body container'>
				<div className='main-layout-body-page'><div>{children}</div></div>
				{!isMobile && <RightWeb />}
			</div>
			{isMobile && (<FooterMobile />)}

		</div>
	);
}

export default LayoutApp;
