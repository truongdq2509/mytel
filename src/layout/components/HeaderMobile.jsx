import { useDispatch, useSelector } from "react-redux";
import PATH from "../../config/PATH";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getTurnRemain } from "../../Redux/futures/account/actions";
import CurrentTime from '../../component/CurrentTime';
import { curStateAccount } from '../../Redux/selector';
import iconBtnBack from "../../assets/images/iconBtnBack.svg"

function HeaderMobile({ user, checkShowBack }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectorAccount = useSelector(curStateAccount);
	const [bidTotal, setBidTotal] = useState(0);
	useEffect(() => {
		if (selectorAccount.remainTurn) {
			const bidTotal = selectorAccount.remainTurn?.reduce((acc, pack) => {
				return acc + pack?.turn;
			}, 0);
			setBidTotal(bidTotal)
		}
	}, [selectorAccount.remainTurn])
	useEffect(() => {
		dispatch(getTurnRemain({}));
	}, [user]);
	console.log(checkShowBack);

	return (
		<>
			{user ? (
				<div className="header-mobile-page">
					<div className='box-logo'>
						<div className='box-logo-logo'>
							{checkShowBack ? <div className={`box-back `}>
								<a href='mytel://back'> <img src={iconBtnBack} alt='icon-back' /> </a>
							</div> : null}
							<a href={PATH.HOME} className="logo-mobile is-login" />
						</div>

						<div className='box-logo-info'>
							<div className='box-logo-info-name'>{user.msisdn}</div>
							<div className='box-logo-info-number-bid'>
								<span>{bidTotal}</span>
							</div>
						</div>
					</div>
					<div className='box-right'>
						<div className='box-right-time'>
							<CurrentTime />
						</div>
						<div onClick={() => { navigate(PATH.PACKAGE) }} className='box-right-bid' />
					</div>
				</div>
			) : (
				<div className="header-mobile-page">
					<div className='header-mobile-page-logo'>
						{checkShowBack ? <div className={`box-back `}>
							<a href='mytel://back'> <img src={iconBtnBack} alt='icon-back' /> </a>
						</div> : null}
						<a href={PATH.HOME} className="logo-mobile" />
					</div>
					<button onClick={() => { navigate(PATH.LOGIN) }} className="button-login">{t("header.login")}</button>
				</div>
			)}
		</>
	);
}

export default HeaderMobile;
