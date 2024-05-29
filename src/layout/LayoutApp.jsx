import React from "react";
import HeaderWeb from "./components/HeaderWeb";
import RightWeb from './components/RightWeb';

function LayoutApp({ children }) {
	return (
		<div className="main-layout">
			<HeaderWeb />
			<div className='main-layout-body container'>
				<div className='main-layout-body-page'>{children}</div>
				<RightWeb />
			</div>

		</div>
	);
}

export default LayoutApp;
