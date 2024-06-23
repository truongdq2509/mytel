import { useDispatch, useSelector } from "react-redux";
import PATH from "../../config/PATH";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getTurnRemain } from "../../Redux/futures/account/actions";
import CurrentTime from '../../component/CurrentTime';
import { curStateAccount } from '../../Redux/selector';

function HeaderMobile({ user }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selectorAccount = useSelector(curStateAccount);
	const [bidTotal, setBidTotal] = useState(0);
	console.log(user);
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
	return (
		<>
			{user ? (
				<div className="header-mobile-page">
					<div className='box-logo'>
						<a href={PATH.HOME} className="logo-mobile is-login" />
						<div className='box-logo-info'>
							<div className='box-logo-info-name'>{user.name || user.msisdn}</div>
							<div className='box-logo-info-number-bid'>
								<span>{bidTotal}</span>
							</div>
						</div>
					</div>
					<div className='box-right'>
						<div className='box-right-time'>
							<CurrentTime />
						</div>
						<div className='box-right-bid' />
					</div>
				</div>
			) : (
				<div className="header-mobile-page">
					<a href={PATH.HOME} className="logo-mobile" />
					<button onClick={() => { navigate(PATH.LOGIN) }} className="button-login">{t("header.login")}</button>
				</div>
			)}
		</>
	);
}

export default HeaderMobile;
