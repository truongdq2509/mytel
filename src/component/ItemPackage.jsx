import { Button } from "antd";
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { curStateAccount } from '../Redux/selector';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ItemPackage({ data, type, isRegister = false, handelSelectItem }) {
	const { t } = useTranslation();
	const selectorAccount = useSelector(curStateAccount)
	const [currentpackage, setCurrentPackage] = useState([])
	let textHeader = {
		header: t('header.bid'),
		description: t('account_page.package.title_bid_retail').replace("_NUMBER_", data?.max_turn)
	}
	if (type !== "SUB" && data?.pack_id === "BID") {
		textHeader.description = t('account_page.package.title_bid_retail_1').replace("_NUMBER_", data?.max_turn)
	}
	if (type === "SUB") {
		if (data.pack_id === "REVERSE_DAILY") {
			textHeader.header = t('account_page.package.daily')
			textHeader.description = t('account_page.package.title_bid_sub').replace("_NUMBER_", data?.max_turn).replace("_CYCLE_", "day")
		}
		if (data.pack_id === "REVERSE_WEEKLY") {
			textHeader.header = t('account_page.package.weekly')
			textHeader.description = t('account_page.package.title_bid_sub').replace("_NUMBER_", data?.max_turn).replace("_CYCLE_", "week")
		}
		if (data.pack_id === "REVERSE_MONTHLY") {
			textHeader.header = t('account_page.package.monthly')
			textHeader.description = t('account_page.package.title_bid_sub').replace("_NUMBER_", data?.max_turn).replace("_CYCLE_", "month")
		}
	}
	useEffect(() => {
		if (selectorAccount.remainTurn) {
			setCurrentPackage(selectorAccount.remainTurn)
		}
	}, [selectorAccount.remainTurn])
	const isCheckPackRegister = currentpackage?.some(
		(item) => item?.pack_id === data?.pack_id
	)
	const dataSub = currentpackage?.find(it => it.pack_id === data?.pack_id)

	return (
		<div className={`box-item-package ${type === "RETAIL" ? 'package-retail' : ''}`}>
			<div className="box-item-package-title">
				<span>{textHeader.header} - </span>
				<span>{textHeader.description}</span>
			</div>
			<div className="box-item-package-content">
				<div className="box-item-package-content-info">
					<div className="price">{`${data?.price / 100} MMK`}</div>

					{type === "SUB" && isCheckPackRegister && <div className="text">{t("account_page.package.description_sub").replace("_NUMBER_", data?.max_turn)}</div>}

					{type === "RETAIL" && <div className="text">{t("account_page.package.description_retail")}</div>}

					{type === "SUB" && data.pack_id === "REVERSE_DAILY" && <div className="text">{t("account_page.package.description_sub_day")}</div>}

					{type === "SUB" && data.pack_id === "REVERSE_WEEKLY" && <div className="text">{t("account_page.package.description_sub_week")}</div>}

					{type === "SUB" && data.pack_id === "REVERSE_MONTHLY" && <div className="text">{t("account_page.package.description_sub_month")}</div>}

					{type === "SUB" && isCheckPackRegister && dataSub && <div className="text">{moment(dataSub.next_charge_time).format("DD/MM/YYYY    HH:mm:ss")}</div>}
				</div>
				<Button onClick={() => handelSelectItem(data, isCheckPackRegister ? true : false)} disabled={isRegister && !isCheckPackRegister} className={`box-item-package-content-button ${isCheckPackRegister ? "btn-cancel" : ""}`}>
					{isCheckPackRegister ? t("account_page.package.cancel") : t("account_page.package.buy")}
				</Button>
			</div>
			{data.best_seller ? <div className='icon-best-sale' /> : null}
		</div>
	);
}

export default ItemPackage;
