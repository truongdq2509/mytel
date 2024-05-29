import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import PATH from "../../config/PATH";
import { Link, useLocation } from "react-router-dom";

function HeaderWeb() {
	const { t } = useTranslation();
	const location = useLocation()
	const listTab = [
		{
			name: t("header.home"),
			link: PATH.HOME,
		},
		{
			name: t("header.bid"),
			link: PATH.BID,
		},
		{
			name: t("header.result"),
			link: PATH.RESULT,
		},
		{
			name: t("header.rule"),
			link: PATH.RULE,
		},
		{
			name: t("header.account"),
			link: PATH.ACCOUNT,
		},
	];
	const getClassActive = (data) => {
		let activeClass = ''
		if (data.link === location.pathname) {
			activeClass = 'active'
		}
		return activeClass
	}

	return (
		<div className="header-page">
			<div className="container">
				<div className="header-page-container">
					<div className="box-logo">
						<a className='logo' href={PATH.HOME}>
							<img src={logo} alt="logo" />
						</a>

						<div className="box-menu">
							{listTab.map((item, index) => {
								return (
									<div className={`box-menu-item ${getClassActive(item)}`} key={`menu_${index}`}>
										<Link to={item.link}>{item.name}</Link>
									</div>
								);
							})}
						</div>
					</div>
					<div className='box-user'>
						<div className='box-user-action'>
							<div className='box-user-action-cart' />
							<div className='box-user-action-line' />
							<div className='box-user-action-info'>
								<div className='name one-line'>0987654321</div>
								<div className='number-bid'>
									<span>20</span>
								</div>
							</div>
							<div className='box-user-action-avt' />
						</div>
						<div className='box-user-date'>
							<span>12:02:00</span>
							<span className='line'></span>
							<span>Thứ Hai, 25/03/2024</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderWeb;
