import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useEffect, useState } from "react";
import { Col, Row, Spin } from 'antd';
import ItemPackage from '../component/ItemPackage';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getListPackage, getTurnRemain, registerRetailPackage, registerSubPackage } from '../Redux/futures/account/actions';
import { curStateAccount } from '../Redux/selector';
import ModalNotifycation from '../component/ModalNotifycation';
import { LoadingOutlined } from '@ant-design/icons';
import { mediaQueryPoint, useMediaQuery } from '../utils/hooks';
const antIcon = <LoadingOutlined style={{ fontSize: 50, color: "#fff" }} spin />;
function PackagePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`)
	const selectorAccount = useSelector(curStateAccount)
	const [tabActive, setTabActive] = useState("SUB");
	const [listPackage, setListPackage] = useState([])
	const [isRegister, setIsRegister] = useState(false)
	const [stateNotifycation, setStateNotifycation] = useState({
		open: false,
		title: "",
		content: "",
	});
	const [dataSelect, setDataSelect] = useState(null)
	const [isCancelled, setIsCancelled] = useState(false)
	const [isConfirmation, setIsConfirmation] = useState(false)
	const [isLoading, setIsLoading] = useState(false)


	const afterGetUserInfo = (data, isLoading) => {
		if (!isLoading) {
			if (!data) {
				navigate(PATH.HOME);
			}
		}
	};
	const afterHandelPackage = (data, isLoading, dataError) => {
		setIsLoading(isLoading);
		if (dataError) {
			setStateNotifycation({
				open: true,
				title: t('error'),
				content: dataError?.errorMessage
			})
		} else if (data) {
			if (data?.data?.errorCode == '0') {
				setStateNotifycation({
					open: true,
					title: t('success'),
					content: data?.data?.content
				})
				dispatch(getTurnRemain({}))
			} else {
				setStateNotifycation({
					open: true,
					title: t('error'),
					content: data?.data?.content
				})
			}
		}
	}

	useEffect(() => {
		dispatch(getListPackage({}))
		if (!selectorAccount.userInfo) {
			dispatch(getCurrentUser({ callback: afterGetUserInfo }));
		}
	}, [])

	useEffect(() => {
		if (selectorAccount.remainTurn && listPackage) {
			listPackage.map(_item => {
				const isCheckPackRegister = selectorAccount.remainTurn?.some(
					(item) => item?.pack_id === _item?.pack_id
				)
				if (isCheckPackRegister) {
					setIsRegister(isCheckPackRegister)
					return;
				}
			})

		}
	}, [selectorAccount.remainTurn, listPackage])

	useEffect(() => {
		if (selectorAccount.listPackage && selectorAccount.listPackage.length > 0) {
			const listPackageRetail = selectorAccount.listPackage.filter(it => !it.cycle)
			const listPackageSub = selectorAccount.listPackage.filter(it => it.cycle)
			if (tabActive === "SUB") {
				setListPackage(listPackageSub)
			} else {
				setListPackage(listPackageRetail)
			}
		}
	}, [selectorAccount.listPackage, tabActive])
	const handelSelectItem = (data, isCancel) => {
		setDataSelect(data)
		setIsCancelled(isCancel)
		setIsConfirmation(true)
		setStateNotifycation({
			open: true,
			title: t('confirmation'),
			content: t("account_page.package.confirm_buy")
		})
	}
	const handlePackage = () => {
		setIsConfirmation(false)
		setStateNotifycation({
			open: false,
			title: "",
			content: "",
		});
		let body = {
			callback: afterHandelPackage
		}
		if (tabActive === "SUB") {
			if (isCancelled) {
				body.isRegister = false
				body.packId = dataSelect?.pack_id
			} else {
				body.isRegister = true
				body.packId = dataSelect?.pack_id
			}
			dispatch(registerSubPackage(body))
		} else {
			body.selectedPack = dataSelect?.pack_id
			body.selectedPackPrice = dataSelect?.price
			dispatch(registerRetailPackage(body))
		}

	}
	return (
		<div className="container-child-account">
			{isLoading ? <div className='loading' >
				<Spin indicator={antIcon} />
			</div> : null}
			<div className="container-child-account-header">
				<div onClick={() => navigate(PATH.ACCOUNT)} className="box-title">
					<div className="icon-back" />
					<div className="box-title-text">
						{t("account_page.package.package")}
					</div>
				</div>
			</div>
			<div className="container-child-account-body">
				<div className="box-package">
					<div className="box-package-tab">
						<div
							className={`box-package-tab-item ${tabActive === "SUB" ? "active" : ""
								}`}
							onClick={() => { setTabActive("SUB") }}
						>
							{t("account_page.package.sub_Package")}
						</div>
						<div
							className={`box-package-tab-item ${tabActive === "RETAIL" ? "active" : ""
								}`}
							onClick={() => { setTabActive("RETAIL") }}
						>
							{t("account_page.package.retail_package")}
						</div>
					</div>
					<div className='box-package-content'>
						<Row gutter={24}>
							{listPackage.length > 0 ? listPackage.map((item, index) => {
								return <Col key={`item_package_${item.id}_${index}`} span={isMobile ? 24 : 12} >
									<ItemPackage isRegister={isRegister && tabActive === "SUB"} handelSelectItem={handelSelectItem} data={item} type={tabActive} />
								</Col>
							}) : null}

						</Row>
					</div>
				</div>
			</div>
			<ModalNotifycation
				open={stateNotifycation.open}
				handleCancel={() => {
					setStateNotifycation({
						open: false,
						title: "",
						content: "",
					});
				}}
				handleOk={isConfirmation ? handlePackage : null}
				title={stateNotifycation.title}
				message={stateNotifycation.content}
			/>
		</div>
	);
}

export default PackagePage;
