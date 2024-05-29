import { useTranslation } from "react-i18next";
import avtDefaults from "../../assets/images/avtRight.png";
import { Pagination, Select } from "antd";
function RightWeb() {
	const { t } = useTranslation();
	const dataTable = [
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
		{
			avt: avtDefaults,
			price: "***",
			fullname: "098****337",
			msisdn: "098****337",
			date: "Mar 25, 2024, 5:27 PM",
		},
	];
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
				<div className="right-page-content-head">
					<div className="right-page-content-head-title">
						{t("right_page.bid_report")}
					</div>
					<Select
						defaultValue={t("right_page.the_last")}
						style={{ width: 125, height: 36 }}
						options={[
							{ value: "desc", label: t("right_page.the_last") },
							{ value: "asc", label: t("right_page.the_first") },
						]}
					/>
				</div>
				<div className="right-page-content-body">
					{dataTable.map((it, index) => {
						return (
							<div key={`item_right_${index}`} className="item-body">
								<div className="box-user">
									<div
										style={{ backgroundImage: `url(${it.avt})` }}
										className="avatar"
									/>
									<div className="box-info">
										<div className="name one-line">{it.fullname}</div>
										<div className="phone-number">{it.msisdn}</div>
										<div className="date">{it.date}</div>
									</div>
								</div>
								<div className="box-price">
									<div className="text">{t("right_page.bid_price")}</div>
									<div className="price">{it.price}</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="box-pagination">
					<Pagination
						responsive={true}
						hideOnSinglePage={true}
						showSizeChanger={false}
						showTitle={false}
						style={{ width: "100%" }}
						defaultCurrent={1}
						total={5000}
					/>
				</div>
			</div>
		</div>
	);
}

export default RightWeb;
