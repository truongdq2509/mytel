import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRankTable } from "../../../../Redux/futures/event/action";
import BgEvent from "../../../../assets/images/Group 75.svg";
import styled from "styled-components";
import HeaderEvent from "../HeaderEvent";
import iconTitle from "../../../../assets/images/icon-rank-title.svg";
import iconThading from "../../../../assets/images/icon-thading.svg";
import { curStateEvent } from "../../../../Redux/selector";
import TableRank from "./TableRank";
import { totalTableRankLimit } from "../../../../helper/const";

const ID_RANK = {
  myRank: 1,
  user: 0,
};
export default function RankTable({ tabActive }) {
  const dispatch = useDispatch();
  const { dataRankTable } = useSelector(curStateEvent) || {};
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getRankTable({ my_rank: ID_RANK.user, page, limit: totalTableRankLimit })
    );
  }, [page]);

  return (
    <Div>
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" className="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <HeaderEvent tabActive={tabActive} />
            <div className="rank-table-main">
              <div className="rank-table-main-head">
                {/* <img src={iconThading} alt="" className="icon-thading" /> */}
                <img src={iconTitle} alt="" className="icon-title" />
              </div>
              <div>
                <TableRank
                  dataRankTable={dataRankTable}
                  setPage={setPage}
                  page={page}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .rank-table-main {
    position: relative;

    &-head {
      text-align: center;
      margin-top: 10px;
    }
  }

  .position-relative {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    overflow: hidden;
  }

  position: relative;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 1); */
  border-radius: 12px;
  /* box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1); */

  .bg-event {
    min-height: 1079px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .icon-title {
    margin-top: 40px;
    margin-bottom: 15px;
  }

  .event-body {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .envent-main-body {
    position: relative;
    height: 100%;
  }

  /* antd */
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder,
  .ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: inherit;
    background: inherit;
  }

  .ant-empty-description {
    display: none !important;
  }

  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td {
    border-bottom: 0px;
    color: white;
  }

  .time-hours-event {
    padding-left: 20px;
  }

  .ant-table-tbody tr:nth-child(2),
  .ant-table-tbody tr:nth-child(4),
  .ant-table-tbody tr:nth-child(6),
  .ant-table-tbody tr:nth-child(8),
  .ant-table-tbody tr:nth-child(10) {
    background-color: rgba(32, 0, 0, 0.4);
  }

  .ant-table {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(254, 253, 4, 1);
  }

  .ant-table,
  .event-table {
    width: 90%;
    text-align: center;
    justify-content: center;
    margin: 0 auto;
  }

  .ant-table-thead {
    background-color: rgba(32, 0, 0, 0.6) !important;
  }

  .ant-table-wrapper .ant-table {
    background: rgba(51, 0, 0, 0.6);
  }

  .ant-table-thead > tr > th {
    background-color: rgba(32, 0, 0, 0.6) !important;
    color: rgba(255, 219, 15, 1) !important;
    text-align: center;
  }

  .ant-table-cell-row-hover {
    background: inherit !important;
  }

  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }

  .ant-table-wrapper .ant-table-pagination.ant-pagination {
    width: 95%;
  }

  .ant-pagination .ant-pagination-item-active {
    background-color: rgba(32, 0, 0, 0.6) !important;
    border: 0px solid rgba(32, 0, 0, 0.6) !important;
    a {
      color: rgba(255, 219, 15, 1) !important;
    }
  }

  .ant-pagination .ant-pagination-item a,
  .anticon svg {
    color: white;
  }

  .ant-table-wrapper .ant-table-tbody > tr > td {
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    padding: 0 10px !important;
    height: 56px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  @media (max-width: 992px) {
    margin-top: 12px;
    .time-hours-event {
      padding-left: 10px;
    }

    .ant-table,
    .event-table {
      width: 97%;
    }

    .rank-table-main-head {
      margin-bottom: 20px;
    }
    .bg-event {
      margin-top: 1px;
    }
  }

  @media (max-width: 768px) {
    .ant-table,
    .event-table {
      overflow-x: auto;
    }

    .ant-table-container {
      min-width: 750px;
    }

    .rank-table-main-head {
      margin-left: 1.5%;
      margin-right: 1.5%;
    }
  }

  @media (max-width: 576px) {
    .ant-table-thead > tr > th,
    .ant-table-wrapper .ant-table-tbody > tr > td {
      font-size: 12px;
    }

    .rank-table-main-head {
      margin: 0 10px;
    }
    
    .ant-table{
      width: calc(100% - 20px);
    }
  }
  /* antd */
`;
