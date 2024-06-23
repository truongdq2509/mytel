import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { curStateAccount } from "../Redux/selector";
import { getCurrentUser, getTurnRemain, logoutUser } from "../Redux/futures/account/actions";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useTranslation } from "react-i18next";
import iconPackageHistory from "../assets/images/iconPackageHistory.svg";
import iconAuctionRecord from "../assets/images/iconAuctionRecord.svg";
import iconChangePassword from "../assets/images/iconChangePassword.svg";
import iconLogout from "../assets/images/iconLogout.svg";
import { getItemCookie } from "../utils/cookie";
import { Link } from "react-router-dom";
import ModalNotifycation from '../component/ModalNotifycation';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';

function AccountPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const selectorAccount = useSelector(curStateAccount);
	const [userInfo, setUserInfo] = useState(selectorAccount.userInfo);
	const [bidTotal, setBidTotal] = useState(0)
	const [showModalelogout, setShowModalLogout] = useState(false)
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const afterGetUserInfo = (data, isLoading) => {
		if (!isLoading) {
			if (data) {
				setUserInfo(data.data);
			} else {
				navigate(PATH.HOME);
			}
		}
	};
	useEffect(() => {
		if (selectorAccount.remainTurn) {
			const bidTotal = selectorAccount.remainTurn?.reduce((acc, pack) => {
				return acc + pack?.turn;
			}, 0);
			setBidTotal(bidTotal)
		}
	}, [selectorAccount.remainTurn])
	useEffect(() => {
		dispatch(getTurnRemain({}))
	}, [])
	const getUserInfo = () => {
		dispatch(getCurrentUser({ callback: afterGetUserInfo }));
	};
	useEffect(() => {
		if (!userInfo) {
			getUserInfo();
		}
	}, []);
	const handleLogout = () => {
		setShowModalLogout(true)
	};
	const listLinkAccounts = [
		{
			label: t("account_page.package_history"),
			link: PATH.PACKAGE_HISTORY,
			icons: iconPackageHistory,
		},
		{
			label: t("account_page.auction_record"),
			link: PATH.AUCTION_RECORD,
			icons: iconAuctionRecord,
		},
		{
			label: t("account_page.change_password"),
			link: PATH.CHANGE_PASSWORD,
			icons: iconChangePassword,
		},
		{
			label: t("account_page.logout"),
			link: handleLogout,
			icons: iconLogout,
		},
	];
	const handleConfirmLogout = () => {
		dispatch(logoutUser({}))
		setShowModalLogout(false)
		window.location.href = PATH.HOME
	}
	return (
		<div className="container-account">
			{userInfo && (
				<div className="container-account-info">
					{isMobile ? <div className="container-account-info-bgr" /> : null}
					<div className="container-account-info-user">
						<div
							style={{ backgroundImage: `url(${userInfo.image})` }}
							className="avarta"
						>
							<div className="icon-camera" />
						</div>
						<span className="name">{userInfo?.name || userInfo?.msisdn}</span>
					</div>
					<div className="container-account-info-foot">
						<div className="total-bid">
							<div className="total-bid-icon" />
							<div className="total-bid-number">
								<span>{bidTotal}</span>
							</div>
						</div>
						<div className="buy-more-bid">
							<div className="icon-cart" />
							<div className="buy-more-text">
								{" "}
								{t("account_page.buy_more_bid")}
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="container-account-link">
				{listLinkAccounts.map((item, index) => {
					if (typeof item.link === "function") {
						return (
							<div className="container-account-link-item" onClick={() => item.link()}>
								<div className="box-link">
									<div
										className="icon-link"
										style={{ backgroundImage: `url(${item.icons})` }}
									/>
									<div className="box-link-label">{item.label}</div>
								</div>
								<div className="icon-next" />
							</div>
						);
					}
					return (
						<Link className="container-account-link-item" to={item.link}>
							<div className="box-link">
								<div
									className="icon-link"
									style={{ backgroundImage: `url(${item.icons})` }}
								/>
								<div className="box-link-label">{item.label}</div>
							</div>
							<div className="icon-next" />
						</Link>
					);
				})}
			</div>
			<ModalNotifycation
				open={showModalelogout}
				handleCancel={() => {
					setShowModalLogout(false)
				}}
				handleOk={handleConfirmLogout}
				title={t('confirmation')}
				message={t("modal.logout")}
			/>
		</div>
	);
}

export default AccountPage;
