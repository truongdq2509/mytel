import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { curStateAccount } from "../Redux/selector";
import { getCurrentUser, getTurnRemain, logoutUser, updateUserInfo, uploadFile } from "../Redux/futures/account/actions";
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
import avatarDefault from "../assets/images/avatarDefault.svg"
import { checkImage } from '../helper/helper';
import { Button, Image, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import API_PATH from '../config/API_PATH';
const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

function AccountPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const selectorAccount = useSelector(curStateAccount);
	const [userInfo, setUserInfo] = useState(selectorAccount.userInfo);
	const [bidTotal, setBidTotal] = useState(0)
	const [showModallogout, setShowModalLogout] = useState(false)
	const [stateModal, setStateModal] = useState({
		open: false,
		title: t('error'),
		message: ''
	})
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'avatar.svg',
			status: 'done',
			url: userInfo?.image || avatarDefault,
		},
	]);
	const [previewVisible, setPreviewVisible] = useState(false)
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
	const afterUpdateUserInfo = (data, isLoading) => {
		if (data) {
			if (data.success) {
				setStateModal({
					open: true,
					title: t('success'),
					message: data.message
				})
			} else {
				setStateModal({
					open: true,
					title: t('error'),
					message: data.errorMessage
				})
			}
			getUserInfo()
		}
	}
	useEffect(() => {
		if (selectorAccount.remainTurn) {
			const bidTotal = selectorAccount.remainTurn?.reduce((acc, pack) => {
				return acc + pack?.turn;
			}, 0);
			setBidTotal(bidTotal)
		}
	}, [selectorAccount.remainTurn])
	useEffect(() => {

		let urlAvatar = avatarDefault
		if (userInfo) {
			if (checkImage(userInfo?.image)) {
				urlAvatar = userInfo?.image
			}
		}
		setFileList([{ ...fileList[0], url: urlAvatar }])
	}, [userInfo])
	const getUserInfo = () => {
		dispatch(getCurrentUser({ callback: afterGetUserInfo }));
	};
	useEffect(() => {
		if (!userInfo) {
			getUserInfo();
		}
		dispatch(getTurnRemain({}))
	}, []);
	useEffect(() => {
		if (fileList.length > 0) {
			if (fileList[0].status === "done" && fileList[0].response) {
				let body = {
					image: fileList[0].response.file,
					displayName: selectorAccount?.userInfo?.name,
					emailAddress: selectorAccount?.userInfo?.email,
					isdn: selectorAccount?.userInfo?.isdn,
					callback: afterUpdateUserInfo
				}
				dispatch(updateUserInfo(body))
			}
		}
	}, [fileList[0].status])
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
	const handleChangeAvarta = ({ fileList, file }) => {
		if (fileList.length > 0) {

			setFileList(fileList)
		}
	}


	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setPreviewVisible(true);
	};
	const onRemove = () => {
		setFileList([{
			uid: '-1',
			name: 'avatar.svg',
			status: 'done',
			url: avatarDefault,
		},])
		let body = {
			image: "",
			displayName: selectorAccount?.userInfo?.name,
			emailAddress: selectorAccount?.userInfo?.email,
			isdn: selectorAccount?.userInfo?.isdn,
			callback: afterUpdateUserInfo
		}
		dispatch(updateUserInfo(body))
	}

	return (
		<div className="container-account">
			{userInfo && (
				<div className="container-account-info">
					{isMobile ? <div className="container-account-info-bgr" /> : null}
					<div className="container-account-info-user">
						<div
							className="avarta"
						>
							<ImgCrop
								modalTitle={t('account_page.edit_image')}
								modalOk={t('modal.modal_login.ok')}
								modalCancel={t('account_page.package.cancel')}>
								<Upload
									listType='picture-card'
									maxCount={1}
									accept='image/*'
									fileList={fileList}
									onChange={handleChangeAvarta}
									onPreview={handlePreview}
									onRemove={onRemove}
									action={API_PATH.upload}>
									<div className="icon-camera" />
								</Upload>
							</ImgCrop>
							{previewVisible && (
								<Image
									className='modal-preview'
									wrapperStyle={{
										display: 'none',
									}}
									preview={{
										visible: previewVisible,
										onVisibleChange: (visible) => setPreviewVisible(visible),
										afterOpenChange: (visible) => !visible && setPreviewVisible(''),
									}}
									src={fileList[0].url}
								/>
							)}
						</div>
						<span className="name">{userInfo?.msisdn}</span>
					</div>
					<div className="container-account-info-foot">
						<div className="total-bid">
							<div className="total-bid-icon" />
							<div className="total-bid-number">
								<span>{bidTotal}</span>
							</div>
						</div>
						<div onClick={() => navigate(PATH.PACKAGE)} className="buy-more-bid">
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
				open={showModallogout}
				handleCancel={() => {
					setShowModalLogout(false)
				}}
				handleOk={handleConfirmLogout}
				title={t('confirmation')}
				message={t("modal.logout")}
			/>
			<ModalNotifycation
				open={stateModal.open}
				handleCancel={() => {
					setStateModal({
						open: false,
						title: t('error'),
						message: ''
					})
				}}
				title={stateModal.title}
				message={stateModal.message}
			/>
		</div>
	);
}

export default AccountPage;
