import { useTranslation } from "react-i18next";
import avtDefaults from "../../assets/images/avtRight.png";
import { Pagination, Select } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { curStateRightWeb } from '../../Redux/selector';
import { useEffect, useState } from 'react';
import { getHistoryBid, getHistoryBidAll } from '../../Redux/futures/rightWeb/actions';
import moment from 'moment';
import { getTotalUserBid } from '../../Redux/futures/home/actions';
import { getCurrentUser } from '../../Redux/futures/account/actions';
function RightWeb() {
	const { t } = useTranslation();
	const [sort, setSort] = useState('desc')
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [listBidHistory, setListBidHistory] = useState([])
	const selectorRightWeb = useSelector(curStateRightWeb)
	const dispatch = useDispatch()
	const afterGetUserBid = (data, isLoading) => {
		console.log(data, isLoading);
	}
	useEffect(() => {
		dispatch(getTotalUserBid({ callback: afterGetUserBid }))
		dispatch(getCurrentUser({}))
	}, [])
	useEffect(() => {
		let query = {
			current: page,
			pageSize: 7,
			sort: sort
		}
		if (selectorRightWeb.idCurrentProduct) {
			query.cp_ids = selectorRightWeb.idCurrentProduct
			dispatch(getHistoryBid({ query }))
		} else {
			delete query.cp_ids
			dispatch(getHistoryBidAll({ query }))
		}

	}, [selectorRightWeb.idCurrentProduct, sort, page])
	useEffect(() => {
		if (selectorRightWeb.idCurrentProduct) {
			if (selectorRightWeb?.bidHistory?.data?.length > 0) {
				setPage(+selectorRightWeb?.bidHistory?.current)
				setTotal(+selectorRightWeb?.bidHistory?.total)
				setListBidHistory(selectorRightWeb?.bidHistory?.data);
			} else {
				setPage(1)
				setTotal(0)
				setListBidHistory([])
			}
		} else {
			if (selectorRightWeb?.bidHistoryAll?.data?.length > 0) {
				setPage(+selectorRightWeb?.bidHistoryAll?.current)
				setTotal(+selectorRightWeb?.bidHistoryAll?.total)
				setListBidHistory(selectorRightWeb?.bidHistoryAll.data);
			} else {
				setPage(1)
				setTotal(0)
				setListBidHistory([])
			}
		}


	}, [selectorRightWeb.bidHistory, selectorRightWeb.bidHistoryAll, selectorRightWeb.idCurrentProduct])
	return (
		<div className="right-page">
			<div className="right-page-head">
				<div className="number-people">
					<span>243</span>
					<span>{t("right_page.number_people")}</span>
				</div>
				<div className="icon-head" />
				<div className="box-text">
					<div>{t("right_page.text_foot1")}</div>
					<div>{t("right_page.text_foot2")}</div>
				</div>
			</div>
			<div className="right-page-content">
				<div>
					<div className="right-page-content-head">
						<div className="right-page-content-head-title">
							{t("right_page.bid_report")}
						</div>
						<Select
							defaultValue={t("right_page.the_last")}
							style={{ width: 125, height: 36 }}
							onChange={(value) => { setSort(value) }}
							options={[
								{ value: "desc", label: t("right_page.the_last") },
								{ value: "asc", label: t("right_page.the_first") },
							]}
						/>
					</div>

					<div className="right-page-content-body">
						{listBidHistory.length > 0 ? listBidHistory.map((it, index) => {
							let dateFomat = moment(it.auction_time).format('MMM D, YYYY, h:mm A')
							return (
								<div key={`item_right_${it.key}_${index}`} className="item-body">
									<div className="box-user">
										<div
											style={{ backgroundImage: `url(${it.image})` }}
											className="avatar"
										/>
										<div className="box-info">
											<div className="name one-line">{it.name || it.isdn}</div>
											<div className="phone-number">{it.isdn}</div>
											<div className="date">{dateFomat}</div>
										</div>
									</div>
									<div className="box-price">
										<div className="text">{t("right_page.bid_price")}</div>
										<div className="price">{it.price}</div>
									</div>
								</div>
							);
						}) : null}
					</div>
				</div>
				<div className="box-pagination">
					<Pagination
						responsive={true}
						hideOnSinglePage={true}
						showSizeChanger={false}
						showTitle={false}
						style={{ maxWidth: '100%' }}
						onChange={(page, pageSize) => { setPage(page) }}
						current={page}
						pageSize={7}
						defaultCurrent={1}
						showLessItems
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}

export default RightWeb;
