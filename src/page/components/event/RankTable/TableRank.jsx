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
  const datas = [
    {
      key: 0,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 1,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 2,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 3,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 4,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 5,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 6,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 7,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 8,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
    {
      key: 9,
      id: 658,
      isdn: "930****572",
      candle: 0,
      lantern: 15,
      fly: 113,
      created_at: "2024-09-09T07:49:05.000Z",
      updated_at: null,
      paired_time: null,
      name: "930****572",
    },
  ];

  const dataSource = datas.map((item, index) => {
    const date = item?.created_at;
    return {
      ...item,
      no: totalTableRankLimit * (page - 1) + index + 1,
      updated_at: {
        day: moment(date).format("DD/MM/YYYY"),
        hours: moment(date).format("HH:mm:ss"),
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
