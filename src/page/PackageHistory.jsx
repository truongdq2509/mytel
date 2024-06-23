import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PATH from '../config/PATH';
import { getCurrentUser, getPackageHistory } from '../Redux/futures/account/actions';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { curStateAccount } from '../Redux/selector';

function PackageHistory() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [status, setStatus] = useState("all");
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(0);
	const [listPackages, setListPackages] = useState([])
	const [dataResApi, setdataResApi] = useState(null)
	const selectorAccount = useSelector(curStateAccount);
	const afterGetUserInfo = (data, isLoading) => {
		setIsLoading(isLoading);
		if (!isLoading) {
			if (!data) {
				navigate(PATH.HOME);
			} else {
				getPackageHistoryPage()
			}
		}
	};
	const afterGetPackageHistory = (data, isLoading) => {
		if (data) {
			setdataResApi(data)
			setListPackages(data.data)
		}
	}
	const getPackageHistoryPage = () => {
		const body = {
			query: {
				pageSize: 11,
				current: page,
			},
			callback: afterGetPackageHistory
		}
		if (status !== "all") {
			body.query.status = status
		}
		dispatch(getPackageHistory(body))
	}
	useEffect(() => {
		if (!selectorAccount.userInfo) {
			dispatch(getCurrentUser({ callback: afterGetUserInfo }));
		} else {
			getPackageHistoryPage()
		}
	}, [status, page]);
	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);
	};
	const options = [
		{
			value: "all",
			label: t("account_page.package_history_page.all"),
		},
		{
			value: 1,
			label: t("account_page.package_history_page.valid"),
		},
		{
			value: 0,
			label: t("account_page.package_history_page.invalid"),
		},
	];
	const columns = [
		{
			title: t('account_page.package_history_page.package_name'),
			dataIndex: 'pack_id',
			align: 'center',
		},
		{
			title: t('account_page.package_history_page.number_bid'),
			dataIndex: 'max_turn',
			align: 'center',
		},
		{
			title: t('account_page.package_history_page.purchase'),
			dataIndex: 'purchase_time',
			align: 'center',
		},
		{
			title: t('account_page.package_history_page.expire'),
			align: 'center',
			dataIndex: 'expired_time',
		},
		{
			title: t('account_page.package_history_page.situation'),
			dataIndex: 'status_show',
			align: 'center',
			className: 'align-middle',
			render: (record, index) => {
				if (record === 0) {
					return <sapn style={{ color: "#575757" }}>{t("account_page.package_history_page.invalid")}</sapn>
				}
				if (record === 1) {
					return <sapn style={{ color: "#575757" }}>{t("account_page.package_history_page.valid")}</sapn>
				}
			},
		},
	];
	const pagination = {
		position: 'bottomRight',
		className: 'account-product-pagination',
		showQuickJumper: false,
		showSizeChanger: false,
		hideOnSinglePage: true,
		showTitle: false,
		defaultCurrent: 1,
		pageSize: 11,
	};
	return (
		<div className="container-child-account">
			<div className="container-child-account-header">
				<div onClick={() => navigate(PATH.ACCOUNT)} className="box-title">
					<div className="icon-back" />
					<div className="box-title-text">
						{t("account_page.package_history")}
					</div>
				</div>
				<div className="box-filter">
					<div className="label">
						{t("account_page.package_history_page.status")}
					</div>
					<Select
						value={status}
						onChange={(value) => setStatus(value)}
						style={{ minWidth: 100 }}
						options={options}
					/>
				</div>
			</div>
			<div className='container-child-account-body'>
				<Table
					className='account-table'
					rowKey={(record) => record.bid_time}
					loading={isLoading}
					onChange={handleTableChange}
					pagination={{ ...pagination, total: dataResApi?.total }}
					columns={columns}
					dataSource={listPackages}
					scroll={{ x: true }}
				/>
			</div>
		</div>
	);
}

export default PackageHistory;
