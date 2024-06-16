import React from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
import HeaderMobile from './components/HeaderMobile';
import FooterMobile from './components/FooterMobile';
import { useParams } from "react-router";

function LayoutApp({ children }) {
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const { id = null, idResult = null } = useParams();

	return (
		<div className="main-layout">
			{isMobile ? <HeaderMobile /> : <HeaderWeb />}
			<div className={`main-layout-body container ${id && idResult ? "main-layout-p-0" : ""}`}>
				<div className='main-layout-body-page'><div>{children}</div></div>
				{!isMobile && <RightWeb />}
			</div>
			{isMobile && (<FooterMobile />)}

		</div>
	);
}

export default LayoutApp;
