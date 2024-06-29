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
import moment from 'moment';
import { getResultProduct } from '../Redux/futures/result/action';
const { Title, Text } = Typography;

function AuctionRecord() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(0);
	const [bidHistory, setBidHistory] = useState([])
	const [dataResApi, setdataResApi] = useState(null)
	const selectorAccount = useSelector(curStateAccount);
	const [dataResult, setDataResult] = useState([])
	const BID_HISTORY_STATUS = {
		BIDING: t('account_page.auction_record_page.status_success'),
		FAIL: t('account_page.auction_record_page.status_fail'),
		DEALED: t('account_page.auction_record_page.status_dealed'),
	};
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
	const afterGetResultProduct = (data, loading) => {
		if (data) {
			setDataResult(data.data)
		}
	}
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
	useEffect(() => {
		dispatch(getResultProduct({ callback: afterGetResultProduct }));
	}, [])
	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);
	};
	const bidHistoriesFilter = bidHistory?.data?.map(
		(bidHistorie) => bidHistorie
	);
	const resultsFilter = dataResult
		?.filter((result) => result?.id === selectorAccount?.userInfo?.id)
		?.map((item) => item?.auction_price);
	const dealedArr = resultsFilter
		?.map((el) => bidHistoriesFilter?.find((item) => item?.price === el))
		?.map((item) => item?.key);

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
			width: '25%',
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
			width: '15%',
		},
		{
			title: t('account_page.auction_record_page.market_price'),
			dataIndex: 'product_price',
			align: 'center',
			className: 'align-middle',
			render: (text) => {
				return (
					<Text className='account-product-price'>
						{text ? text.toLocaleString('en-US') : 'null'} {text ? "MMK" : null}
					</Text>
				)
			},
			width: '15%',
		},
		{
			title: t('account_page.auction_record_page.bid_price'),
			dataIndex: 'price',
			align: 'center',
			className: 'align-middle',
			render: (text) => {
				return (
					<Text className='account-product-price'>
						{text ? text.toLocaleString('en-US') : 'null'} {text ? "MMK" : null}
					</Text>
				)
			},
			width: '15%',
		},
		{
			title: t('account_page.auction_record_page.bid_time'),
			dataIndex: 'auction_time',
			align: 'center',
			className: 'align-middle',
			render: (text) => (
				<Text className='account-product-time'>
					{moment(text).format("DD/MM/YYYY HH:mm:ss")}
				</Text>
			),
			width: '20%',
		},
		{
			title: t('account_page.auction_record_page.status'),
			dataIndex: 'status',
			align: 'center',
			className: 'align-middle',
			render: (text, record, index) => (
				<Text className='account-product-time'>
					{dealedArr?.includes(index)
						? BID_HISTORY_STATUS.DEALED
						: BID_HISTORY_STATUS.BIDING}
				</Text>
			),
			width: '20%',
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
					dataSource={bidHistory}
					scroll={{ x: true }}
				/>
			</div>
		</div>
	);
}

export default AuctionRecord;
