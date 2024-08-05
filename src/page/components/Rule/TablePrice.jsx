import React from "react";
import { Space, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";

const TablePrice = ({ isShowTitle = false }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("rule_page.body_FQA.what_price.content.package"),
      dataIndex: "package",
      key: "package",
      align: "center",
    },
    {
      title: t("rule_page.body_FQA.what_price.content.price"),
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: t("rule_page.body_FQA.what_price.content.number_of_bids"),
      dataIndex: "number_of_bids",
      key: "number_of_bids",
      align: "center",
    },
  ];

  const columns2 = [
    {
      title: t("rule_page.body_FQA.what_price.content.package"),
      dataIndex: "package",
      key: "package",
      align: "center",
    },
    {
      title: t("rule_page.body_FQA.what_price.content.text"),
      dataIndex: "text",
      key: "text",
      align: "center",
    },
    {
      title: t("rule_page.body_FQA.what_price.content.price"),
      dataIndex: "price",
      key: "price",
      align: "center",
    },

    {
      title: t("rule_page.body_FQA.what_price.content.bidding_times"),
      dataIndex: "bidding_times",
      key: "bidding_times",
      align: "center",
    },
    {
      title: t("rule_page.body_FQA.what_price.content.expiry_date"),
      dataIndex: "expiry_date",
      key: "expiry_date",
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      package: "BID",
      price: "၁၉၀ Ks",
      number_of_bids: "၁",
    },
    {
      key: "2",
      package: "BID2",
      price: "၃၉၀ Ks",
      number_of_bids: "၂",
    },
    {
      key: "3",
      package: "BID5",
      price: "၉၂၅ Ks",
      number_of_bids: "၅",
    },
    {
      key: "1",
      package: "BID10",
      price: "၁၈၀၀ Ks",
      number_of_bids: "၁၀",
    },
    {
      key: "1",
      package: "BID20",
      price: "၃၅၀၀ Ks",
      number_of_bids: "၂၀",
    },
  ];

  const data2 = [
    {
      key: "1",
      package: t("rule_page.body_FQA.what_price.content.daily"),
      text: "ON1",
      price: "299Ks",
      bidding_times: "2",
      expiry_date: `1 ${t("rule_page.body_FQA.what_price.content.day")}`,
    },

    {
      key: "2",
      package: t("rule_page.body_FQA.what_price.content.While_spitting"),
      text: "ON7",

      price: "1699Ks",
      bidding_times: "10",
      expiry_date: `7 ${t("rule_page.body_FQA.what_price.content.days")}`,
    },

    {
      key: "3",
      package: t("rule_page.body_FQA.what_price.content.monthly"),
      text: "ON30",

      price: "4999Ks",
      bidding_times: "30",
      expiry_date: `30 ${t("rule_page.body_FQA.what_price.content.days")}`,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      {isShowTitle ? (
        <div>{t("rule_page.body_T&C.rates.the_price")}</div>
      ) : (
        <></>
      )}
      <div style={{ marginTop: "30px" }}>
        <Table columns={columns2} dataSource={data2} pagination={false} />
      </div>
    </>
  );
};
export default TablePrice;
