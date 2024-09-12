import { Table } from "antd";
import React from "react";
import { totalTableRankLimit } from "../../../../helper/const";
import moment from "moment";
import iconTop1 from "../../../../assets/images/icon-top-1.svg";
import iconTop2 from "../../../../assets/images/icon-top-2.svg";
import iconTop3 from "../../../../assets/images/icon-top-3.svg";

const columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
    render: (text) => {
      switch (+text) {
        case 1:
          return <img src={iconTop1} alt="" />;
        case 2:
          return <img src={iconTop2} alt="" />;
        case 3:
          return <img src={iconTop3} alt="" />;

        default:
          return <div>{text}</div>;
      }
    },
  },
  {
    title: "ISDN",
    dataIndex: "isdn",
    key: "isdn",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Number of Candles",
    dataIndex: "candle",
    key: "candle",
    render: (text) => <div>{text}</div>,
  },

  {
    title: "Number of Lanterns",
    dataIndex: "lantern",
    key: "lantern",
    render: (text) => <div>{text}</div>,
  },

  {
    title: "Number of Flying Lanterns",
    dataIndex: "fly",
    key: "fly",
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Time of Last Flying Lantern",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (_, record) => {
      return (
        <div className="item-rank-timer">
          <span>{record.updated_at.day}</span>
          <span className="time-hours-event">{record.updated_at.hours}</span>
        </div>
      );
    },
  },
];
export default function TableRank({ dataRankTable = {}, setPage, page }) {
  const handleTableChange = (pagination) => {
    setPage(pagination);
  };
  const { data = [] } = dataRankTable?.ranks || {};

  const dataSource = data.map((item, index) => {
    const date = item?.paired_time;
    return {
      ...item,
      no: totalTableRankLimit * (page - 1) + index + 1,
      updated_at: {
        day: item?.paired_time ? moment(date).format("DD/MM/YYYY") : "",
        hours: item?.paired_time ? moment(date).format("HH:mm:ss") : "",
      },
    };
  });

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={
        dataRankTable?.ranks?.total > totalTableRankLimit
          ? {
              current: page,
              pageSize: dataRankTable?.ranks?.pageSize,
              total: dataRankTable?.ranks?.total || 0,
              onChange: handleTableChange,
            }
          : false
      }
    />
  );
}
