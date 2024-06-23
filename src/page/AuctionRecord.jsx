import { Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PATH from '../config/PATH';
import { getAuctionRecord, getCurrentUser } from '../Redux/futures/account/actions';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { curStateAccount } from '../Redux/selector';
import { currentDate } from '../helper/const';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

function AuctionRecord() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(0);
	const [listPackages, setBidHistory] = useState([])
	const [dataResApi, setdataResApi] = useState(null)
	const selectorAccount = useSelector(curStateAccount);
	const afterGetUserInfo = (data, isLoading) => {
		setIsLoading(isLoading);
		if (!isLoading) {
			if (!data) {
				navigate(PATH.HOME);
			} else {
				getBidHistoryPage()
			}
		}
	};
	const afterGetBidHistory = (data, isLoading) => {
		if (data) {
			setdataResApi(data)
			setBidHistory(data.data)
		}
	}
	const getBidHistoryPage = () => {
		const body = {
			query: {
				pageSize: 9,
				current: page,
			},
			callback: afterGetBidHistory
		}
		dispatch(getAuctionRecord(body))
	}
	useEffect(() => {
		if (!selectorAccount.userInfo) {
			dispatch(getCurrentUser({ callback: afterGetUserInfo }));
		} else {
			getBidHistoryPage()
		}
	}, [page]);
	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);
	};

	const columns = [
		{
			title: t('account_page.auction_record_page.name'),
			dataIndex: 'product_name',
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (value, record) => record.product.includes(value),
			render: (_, record) => {
				const isRunningNow =
					new Date(record?.start_time).getTime() < currentDate;
				return (
					<div className='account-product'>
						<div className='account-product-image' style={{ backgroundImage: `url(${record.product_image?.split(',')[0]})` }} />
						{/* <Text className="account-product-title">{record.product_name}</Text> */}
						<Link
							to={
								record?.product_status === 1 && isRunningNow
									? PATH.BID
									: record?.product_status === 2 ||
										record?.product_status == null
										? PATH.ACCOUNT
										: `${PATH.RESULT}/all/${record?.cp_id}`
							}
							className='account-product-title'>
							{record?.product_name ?? t('account_page.auction_record_page.product_not_found')}
						</Link>
					</div>
				);
			},
			width: '40%',
		},
		{
			title: t('account_page.auction_record_page.code'),
			dataIndex: 'product_code',
			filterSearch: true,
			align: 'center',
			className: 'align-middle',
			render: (text) => (
				<Text className='account-product-product-code'>{text ?? 'null'}</Text>
			),
			width: '25%',
		},
		{
			title: t('account_page.auction_record_page.market_price'),
			dataIndex: 'product_price',
			align: 'center',
			className: 'align-middle',
			render: (text) => (
				<Text className='account-product-price'>
					{text ?? 'null'} {text ? "MMK" : null}
				</Text>
			),
			// sorter: (a, b) => a.product_price - b.product_price,
			width: '25%',
		},
		// {
		// 	title: t('account_page.auction_record_page.bid_price'),
		// 	dataIndex: 'price',
		// 	align: 'center',
		// 	className: 'align-middle',
		// 	render: (text) => {
		// 		return (
		// 			<Text className='account-product-price'>
		// 				{text} {t('currency_sign')}
		// 			</Text>
		// 		);
		// 	},
		// 	// sorter: (a, b) => a.price - b.price,
		// 	width: '15%',
		// }
	];
	const pagination = {
		position: 'bottomRight',
		className: 'account-product-pagination',
		showQuickJumper: false,
		showSizeChanger: false,
		hideOnSinglePage: true,
		showTitle: false,
		defaultCurrent: 1,
		pageSize: 9,
	};
	return (
		<div className="container-child-account">
			<div className="container-child-account-header">
				<div onClick={() => navigate(PATH.ACCOUNT)} className="box-title">
					<div className="icon-back" />
					<div className="box-title-text">
						{t("account_page.auction_record")}
					</div>
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

export default AuctionRecord;
