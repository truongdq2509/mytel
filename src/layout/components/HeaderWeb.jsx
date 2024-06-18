import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import PATH from "../../config/PATH";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { urlPageBid, urlPageResult } from "../../helper/const";
import _ from "lodash";
import CurrentTime from '../../component/CurrentTime';
import ModalLogin from '../../component/ModalLogin';
import { useState } from 'react';

function HeaderWeb({ user }) {
	const { t } = useTranslation();
	const location = useLocation()
	const navigate = useNavigate()
	const [openModalLogin, setOpenModalLogin] = useState(false)
	const { id = null, idResult = null } = useParams();
	const listTab = [
		{
			name: t("header.home"),
			link: PATH.HOME,
		},
		{
			name: t("header.bid"),
			link: `${PATH.BID}/${urlPageBid.running}`,
			linkActive: [`${PATH.BID}/${urlPageBid.running}`, `${PATH.BID}/${urlPageBid.upcoming}`,]
		},
		{
			name: t("header.result"),
			link: `${PATH.RESULT}/${urlPageResult.all}`,
			linkActive: [`${PATH.RESULT}/${urlPageResult.all}`, `${PATH.RESULT}/${urlPageResult.the_winner}`, `${PATH.RESULT}/${urlPageResult.no_winner}`]
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
		let activeClass = '';
		let isCheckPageResult = false
		if(data.link === `${PATH.RESULT}/${urlPageResult.all}` && id && idResult){
			isCheckPageResult = true;
		}
		if (data.link === location.pathname || _.includes(data.linkActive, location.pathname) || isCheckPageResult) {
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
									<div className={`box-menu-item ${getClassActive(item)}`} key={`menu_${index}`} onClick={() => { navigate(item.link) }}>
										<Link to={item.link}>{item.name}</Link>
									</div>
								);
							})}
						</div>
					</div>
					<div className='box-user'>
						{user ? (<div className='box-user-action'>
							<div className='box-user-action-cart' />
							<div className='box-user-action-line' />
							<div className='box-user-action-info'>
								<div className='name one-line'>0987654321</div>
								<div className='number-bid'>
									<span>20</span>
								</div>
							</div>
							<div className='box-user-action-avt' />
						</div>) : (
							<div className='box-user-btn-login' onClick={() => setOpenModalLogin(true)}>{t("header.login")}</div>
						)}

						<CurrentTime />
					</div>
				</div>
			</div>
			<ModalLogin open={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
		</div>
	);
}

export default HeaderWeb;
