import React, { useRef, useState } from "react";
import { ID_EVENT } from "../../../../helper/const";
import { useNavigate } from "react-router";
import styled from "styled-components";
import BgEvent from "../../../../assets/images/Group 75.svg";
import HeaderEvent from "../HeaderEvent";
import iconLoa from "../../../../assets/images/icon-loa.svg";
import luckymoon from "../../../../assets/images/luckymoon 3.svg";
import mmkWin from "../../../../assets/images/200,000 MMK Winners.svg";
import yourmoon from "../../../../assets/images/Your moon spin tracker.svg";
import { Table } from "antd";
import iconLuckMoon from "../../../../assets/images/icon-luckymoon.svg";
import luckGift from "../../../../assets/images/gift 2.svg";
import iconSpin from "../../../../assets/images/spin-icon.svg";
import iconde from "../../../../assets/images/icon-de-spiter.svg";
import { rotate } from "../../../../helper/awardRotate";
import { useDispatch, useSelector } from "react-redux";
import { curStateAccount, curStateEvent } from "../../../../Redux/selector";
import ModalLogin from "../../../../component/ModalLogin";
import {
  getConfigEvent,
  postStartSpin,
} from "../../../../Redux/futures/event/action";
import { getTurnRemain } from "../../../../Redux/futures/account/actions";

const MarqueeText = styled.div`
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  position: relative;

  div {
    display: inline-block;
    position: relative;
    will-change: transform;
    animation: marquee 20s linear infinite;
    white-space: nowrap;
    color: rgba(255, 255, 255, 1);
    height: 44px;
    align-items: center;
    display: flex;

    .event-lm-noti-content {
      padding-left: 65px;
      font-size: 20px;
      font-weight: 500;
    }

    .loa {
      position: absolute;
      height: 44px;
    }
  }

  @keyframes marquee {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

const data = [
  {
    key: "1",
    ["No."]: "1",
    ISDN: "096xxxxxx",
    Time: { day: "2024-08-28", hours: "12:00:00" },
  },
  {
    key: "2",
    ["No."]: "2",
    ISDN: "096xxxxxx",
    Time: { day: "2024-08-28", hours: "12:00:00" },
  },
  {
    key: "3",
    ["No."]: "3",
    ISDN: "096xxxxxx",
    Time: { day: "2024-08-28", hours: "12:00:00" },
  },
  {
    key: "4",
    ["No."]: "4",
    ISDN: "096xxxxxx",
    Time: { day: "2024-08-28", hours: "12:00:00" },
  },
  {
    key: "5",
    ["No."]: "5",
    ISDN: "096xxxxxx",
    Time: { day: "2024-08-28", hours: "12:00:00" },
  },
];

const columns = [
  {
    title: "No.",
    dataIndex: "No.",
    key: "No.",
  },
  {
    title: "ISDN",
    dataIndex: "ISDN",
    key: "ISDN",
  },
  {
    title: "Time",
    dataIndex: "Time",
    key: "Time",
    render: (_, record) => {
      return (
        <div>
          <span>{record.Time.day}</span>
          <span className="time-hours-event">{record.Time.hours}</span>
        </div>
      );
    },
  },
];

export default function LuckyMoon({ tabActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { configEventLuckyMoon } = useSelector(curStateEvent) || {};

  const imgSpin = useRef(null);
  const isSpinning = useRef(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  const handleGetSpinLeft = async () => {
    await dispatch(getConfigEvent());
  };

  const afterSpin = async (data, isLoading, dataError) => {
    if (data) {
      if (data?.data?.award) {
        const award = data?.data?.award;
        const angels = award?.pos;
        console.log("award", award);
        console.log("angels", angels);

        await rotate(imgSpin.current, {
          angle: 0,
          animateTo: angels + 1800,
          duration: 4000,
          callback: function () {
            isSpinning.current = false;
            if (award.type == "BID_FREE") {
              dispatch(getTurnRemain({}));
            }
          },
        });
      }
    } else if (dataError) {
      console.log(dataError);
      isSpinning.current = false;
    }
  };

  const spinNow = async () => {
    const token = localStorage.getItem("token");

    // check user dang nhap
    if (!token) {
      return setOpenModalLogin(true);
    }
    // không cho quay nhiều lần liên tục
    if(isSpinning.current){
      return;
    }

    const dataApi = {
      callback: afterSpin,
    };
    isSpinning.current = true;
    await dispatch(postStartSpin(dataApi));
    handleGetSpinLeft();
  };

  return (
    <Div luckGift={luckGift}>
      <ModalLogin open={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" className="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <HeaderEvent tabActive={tabActive} />
            <div className="event-lm-noti-main">
              <img src={iconLoa} alt="loa" className="loa" />
              <div className="event-lm-noti-container">
                <div className="event-lm-noti">
                  <MarqueeText>
                    <div className="">
                      <span className="event-lm-noti-content">
                        “089xxx has just won the prize: Get 3 more candles”
                        “089xxx has just won the prize: Get 3 ...
                      </span>
                    </div>
                  </MarqueeText>
                </div>
              </div>
            </div>
            <div>
              <div className="position-relative">
                <div className="lucky-moon-icon">
                  <img src={luckymoon} alt="lucky moon" />
                  <div className="position-relative">
                    <div className="icon-de">
                      <div className="position-relative event-container-spiter">
                        <img
                          src={iconLuckMoon}
                          alt=""
                          className="iconLuckMoon"
                        />
                        <div className="container-event-gift" ref={imgSpin}>
                          <div className="position-relative ralative-main">
                            <img
                              src={luckGift}
                              alt=""
                              className="img-icon-gift-event icon-luck-gift"
                            />
                          </div>
                        </div>
                        <div className="container-event-gift">
                          <div className="position-relative ralative-main">
                            <img
                              src={iconSpin}
                              alt=""
                              onClick={() => spinNow()}
                              className="img-icon-gift-event icon-spin"
                            />
                          </div>
                        </div>
                        <div className="icon-de-spiter">
                          <img src={iconde} about="" alt="" />
                          <div className="spin-left">
                            <span>{configEventLuckyMoon?.spin_left || 0}</span>{" "}
                            spin left
                          </div>
                        </div>
                      </div>
                      <div className="text-content-spiter">
                        You have 3 spins left. Login daily to get 3 free spins
                        each day.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-relative">
                <div className="event-table">
                  <div>
                    <div className="event-table-item">
                      <div className="event-table-item-title">
                        <img src={mmkWin} alt="" />
                      </div>
                      <div>
                        <Table
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                        />
                      </div>
                    </div>
                    <div className="event-prizes">
                      3 prizes of 200,000 MMK are still up for grabs! Login and
                      spin 3 times daily for your chance to win big!
                    </div>
                  </div>
                  <div style={{ paddingTop: "26px" }}>
                    <div className="event-table-item">
                      <div className="event-table-item-title">
                        <img src={yourmoon} alt="" />
                      </div>
                      <div>
                        <Table
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1);

  .container-event-gift {
    width: 537px;
    height: 544px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;

    .ralative-main {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 5;
    }

    .img-icon-gift-event {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .icon-spin {
      top: calc(50% - 9px);
      left: 50%;
    }
  }

  .event-table-item-title {
    text-align: center;
  }

  .iconLuckMoon {
    position: relative;
    z-index: 4;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .event-prizes {
    font-size: 20px;
    font-weight: 600;
    line-height: 30.92px;
    text-align: center;
    color: white;
    filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
      drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
    margin-top: 7px;
  }

  /* antd */
  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-tbody > tr > td {
    border-bottom: 0px;
    color: white;
  }

  .time-hours-event {
    padding-left: 20px;
  }

  .ant-table-tbody tr:nth-child(2),
  .ant-table-tbody tr:nth-child(4) {
    background-color: rgba(32, 0, 0, 0.4);
  }

  .ant-table {
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(254, 253, 4, 1);
  }

  .ant-table,
  .event-table {
    width: 540px;
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
  /* antd */
  .event-table {
    position: absolute;
    right: 24px;
    top: 30px;
  }

  .lucky-moon-icon {
    top: -40px;
    left: 95px;
    position: absolute;
    text-align: center;
  }

  .icon-de {
    position: absolute;
    top: -18px;
    width: 565px;
    left: -70px;
  }

  .icon-spin {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    cursor: pointer;
  }

  .icon-de-spiter {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -70px;
    z-index: 1;
    width: 100%;
  }

  .bg-event {
    min-height: 1079px;
  }

  .spin-left {
    position: absolute;
    z-index: 4;
    color: white;
    left: 50%;
    bottom: 17.5px;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: 700;
    line-height: 31.32px;
    text-transform: uppercase;

    span {
      color: rgba(255, 220, 20, 1);
      font-size: 32px;
      font-weight: 700;
      line-height: 31.32px;
      text-transform: uppercase;
    }
  }

  .text-content-spiter {
    position: absolute;
    bottom: -120px;
    color: white;
    font-size: 18px;
    font-weight: 500;
    line-height: 27.47px;
    filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
      drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
    left: 10px;
  }

  .luckGift {
    left: 26.5px;
    top: 55px;
    position: absolute;
    z-index: 2;
  }

  .position-relative {
    position: relative;
  }

  .event-lm-noti-main {
    position: relative;

    .loa {
      position: absolute;
      left: 22px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .event-lm-noti-container {
    width: calc(100% - 190px);
    position: relative;
    overflow: hidden;
    height: 44px;
    margin: auto;
    background-color: rgba(32, 0, 0, 0.6);
    margin-top: 15px;
  }

  .event-lm-noti {
    position: absolute;
    top: 0;
    z-index: 2;
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
`;
