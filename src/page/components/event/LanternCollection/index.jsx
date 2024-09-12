import HeaderEvent from "../HeaderEvent";
import { ID_EVENT } from "../../../../helper/const";
import BgEvent from "../../../../assets/images/Group 75.svg";
import iconLuckymoon from "../../../../assets/images/luckymoon.svg";
import iconYour from "../../../../assets/images/icon-your.svg";
import styled from "styled-components";
import iconNen from "../../../../assets/images/icon-nen.svg";
import iconPairing from "../../../../assets/images/pairing.svg";
import iconLook from "../../../../assets/images/icon-look.svg";
import { useNavigate } from "react-router";
import PATH from "../../../../config/PATH";
import iconEventGift from "../../../../assets/images/icon-event-gift.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getConfigEvent,
  getDataLanternCollection,
  postApiPairing,
} from "../../../../Redux/futures/event/action";
import { curStateEvent } from "../../../../Redux/selector";
import iconHadingyut from "../../../../assets/images/hadingyut-festival.svg";
import PopupErrorLantern from "./PopupErrorLantern";
import PopupSuccessLantern from "./PopupSuccess";

export default function LanternCollection({ tabActive }) {
  const navigate = useNavigate();
  const totalFly = useRef(0);
  const dispatch = useDispatch();
  const [isModalError, setIsModalError] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const { dataLanternCollection, configEventLuckyMoon } =
    useSelector(curStateEvent) || {};

  useEffect(() => {
    dispatch(getDataLanternCollection());
    dispatch(getConfigEvent());
  }, []);
  console.log(dataLanternCollection);

  const handleAction = (url) => {
    navigate(url);
  };

  const callbackPairing = async (data, isLoading, dataError) => {
    console.log(data);

    if (data?.success) {
      totalFly.current =
        dataLanternCollection.candle < dataLanternCollection.lantern
          ? dataLanternCollection.candle
          : dataLanternCollection.lantern;
      setIsModalSuccess(true);
    }
  };

  const handlePairing = async () => {
    if (!dataLanternCollection.candle || !dataLanternCollection.lantern) {
      return setIsModalError(true);
    }

    const dataApi = {
      callback: callbackPairing,
    };
    await dispatch(postApiPairing(dataApi));
    dispatch(getDataLanternCollection());
  };

  return (
    <Container>
      <PopupErrorLantern
        isModalError={isModalError}
        setIsModalError={setIsModalError}
        dataLanternCollection={dataLanternCollection}
      />

      <PopupSuccessLantern
        isModalSuccess={isModalSuccess}
        setIsModalSuccess={setIsModalSuccess}
        totalFly={totalFly}
      />
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" className="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <img src={iconHadingyut} alt="" className="icon-hadingyut" />
            <HeaderEvent tabActive={tabActive} />
            <div className="icon-lucky-moon">
              <img
                src={iconLuckymoon}
                alt="lucky-moon"
                onClick={() =>
                  handleAction(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
                }
                className="lucky-moon-responstive"
              />
              <div
                className="number-lucky-moon"
                onClick={() =>
                  handleAction(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
                }
              >
                {configEventLuckyMoon?.spin_left || 0}
              </div>

              <div className="btn-click-here-lm">
                Click here to earn more Candles, Lanterns, and 200,000 MMK
              </div>
            </div>
            <div className="event-your">
              <div className="event-your-content">Your collection</div>
              <div className="event-your-detail">
                <img src={iconYour} alt="" />
                <div className="event-your-detail-number">
                  x{dataLanternCollection?.fly || 0}
                </div>
              </div>
            </div>
            <div className="envent-place-container">
              <div className="envent-place">
                <div className="envent-place-item">
                  <img src={iconNen} alt="" className="envent-place-item-img" />
                  <div className="envent-place-content">
                    Place more bid to get more candles
                  </div>
                  <div
                    className="envent-place-btn-bit"
                    onClick={() => handleAction(`${PATH.BID}/running`)}
                  >
                    BID NOW
                  </div>
                  <div className="detail-place-item">
                    {dataLanternCollection.candle || 0}
                  </div>
                </div>
                <div className="icon-pairing-container">
                  <img
                    src={iconPairing}
                    alt="icon-pairing"
                    className="icon-pairing "
                    onClick={handlePairing}
                  />
                </div>
                <div className="envent-place-item">
                  <img
                    src={iconLook}
                    alt="icon-mytel"
                    className="envent-place-item-img"
                  />
                  <div className="envent-place-content">
                    Place more packages to get more lanterns
                  </div>
                  <div
                    className="envent-place-btn-bit"
                    onClick={() => handleAction(PATH.PACKAGE)}
                  >
                    BUY PACKAGE
                  </div>
                  <div className="detail-place-item">
                    {dataLanternCollection.lantern || 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="event-footer-container">
              <img src={iconEventGift} alt="gift" />
              <div className="event-footer-content">
                <div className="event-warning">
                  Click on the Pairing button to light up the lantern and it
                  will be added to your collection.
                </div>
                <div className="event-noti-youcan">
                  You can earn more candles, lanterns and even 200,000 MMK per
                  Luckymoon Spin. Let’s click into Moon icon left corner to join
                  now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 1); */
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  overflow: hidden;
  /* box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1); */

  .bg-event {
    object-fit: cover;
    position: absolute;
    height: 100%;
  }

  .icon-hadingyut {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 98px;
    /* display: none; */
  }

  .position-relative {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .event-footer-content {
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .event-footer-container {
    display: flex;
    gap: 30px;
    position: absolute;
    bottom: 26px;
    left: 30px;

    .event-warning {
      color: rgba(249, 230, 29, 1);
      font-size: 16px;
      font-weight: 200;
      line-height: 24.03px;
      margin-bottom: 14px;
      font-style: italic;
    }

    .event-noti-youcan {
      font-size: 18px;
      font-weight: 600;
      line-height: 27.83px;
      filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
        drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
      color: white;
      max-width: 710px;
    }
  }

  .btn-click-here-lm {
    filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
      drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
    color: white;
    font-size: 18px;
    max-width: 280px;
    text-align: center;
    line-height: 26px;
  }

  .detail-place-item {
    filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
      drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
      drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
    color: white;
    position: absolute;
    font-weight: 500;
    font-size: 64px;
    line-height: 98.94px;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .envent-place-container {
    /* position: absolute;
    bottom: 195px;
    left: 50%;
    transform: translateX(-50%); */
    display: flex;
    justify-content: center;
    padding-top: 60px;
  }

  .icon-pairing-container {
    width: 142px;
    position: relative;

    .icon-pairing {
      position: absolute;
      bottom: 80px;
      cursor: pointer;
    }
  }

  .envent-place-item {
    width: 220px;
    text-align: center;
    position: relative;
  }

  .envent-place {
    display: flex;
    gap: 65px;
    position: relative;

    &-content {
      font-size: 18px;
      line-height: 27.83px;
      font-weight: 600;
      filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
        drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
      color: white;
      margin-bottom: 3px;
    }

    &-btn-bit {
      font-size: 20px;
      line-height: 31.32px;
      font-weight: 700;
      color: rgba(67, 12, 5, 1);
      padding: 14px 0;
      background-color: rgba(249, 230, 29, 1);
      border-radius: 29px;
      text-align: center;
      cursor: pointer;
    }
  }

  .event-your {
    position: absolute;
    top: 126.5px;
    right: 49px;

    &-content {
      text-align: center;
      font-size: 20px;
      line-height: 1;
      filter: drop-shadow(2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(-2px 0 0 rgba(135, 0, 0, 1))
        drop-shadow(0 2px 0 rgba(135, 0, 0, 1))
        drop-shadow(0 -2px 0 rgba(135, 0, 0, 1));
      color: rgba(255, 255, 255, 1);
    }

    &-detail {
      position: relative;

      &-number {
        position: absolute;
        top: 29.5px;
        left: 50%;
        transform: translateX(-25%);
        color: rgba(96, 255, 32, 1);
        font-size: 48px;
        font-weight: 700;
      }
    }
  }

  .event-body {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .envent-main-body {
    position: relative;
    height: 100%;
  }

  .icon-lucky-moon {
    padding-left: 43px;
    padding-top: 13px;
    cursor: pointer;
    position: relative;

    .number-lucky-moon {
      position: absolute;
      font-size: 20px;
      font-weight: 600;
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(254, 30, 31, 1);
      border: 2px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 137px;
      left: 76px;
    }
  }

  @media (min-width: 992px) {
    .envent-place-btn-bit:hover {
      background-color: rgb(210 194 25);
      transition: 0.3s ease-in-out;
    }
  }

  @media (max-width: 1600px) {
    .icon-hadingyut {
      width: 360px;
      top: 120px;
    }

    .lucky-moon-responstive {
      width: 200px;
    }
    .btn-click-here-lm {
      max-width: 220px;
      font-size: 14px;
    }

    .icon-lucky-moon .number-lucky-moon {
      width: 35px;
      height: 35px;
      bottom: 110px;
      left: 58px;
    }

    .event-your {
      top: 108.5px;
      right: 49px;
    }

    .event-your-detail-number {
      font-size: 42px;
      top: 33.5px;
    }
  }

  @media (max-width: 1200px) {
    .icon-hadingyut {
      width: 240px;
      top: 255px;
    }
  }

  @media (max-width: 992px) {
    margin-top: 12px;
    margin-bottom: 100px;
    .icon-hadingyut {
      width: 290px;
      top: 154px;
    }

    .detail-place-item {
      font-size: 48px;
      line-height: 50.94px;
    }

    .event-your-detail-number {
      font-size: 38px;
    }
    .event-footer-container {
      position: relative;
      bottom: inherit;
      left: inherit;
    }
  }

  @media (max-width: 768px) {
    .icon-lucky-moon {
      padding-top: 0;
      padding-left: 10px;
      top: -15px;
    }

    .event-your {
      top: 76.5px;
      right: 12px;
    }

    .event-your-detail-number {
      font-size: 28px;
      top: 41.5px;
    }

    .icon-hadingyut {
      width: 249px;
      top: 202px;
    }

    .btn-click-here-lm {
      max-width: 200px;
      font-size: 12px;
      line-height: 18px;
    }

    .envent-place-item-img {
      width: 140px;
    }

    .envent-place {
      gap: 10px;
    }

    .envent-place-content {
      font-size: 12px;
      max-width: 125px;
      margin: 0 auto;
      line-height: 18px;
    }

    .envent-place-btn-bit {
      width: 140px;
      font-size: 14px;
      margin: 0 auto;
      margin-top: 3px;
      padding: 8px 0;
      border-radius: 20px;
    }

    .event-footer-container {
      margin-top: 20px;
    }

    .event-footer-container .event-noti-youcan {
      font-size: 14px;
      line-height: 24px;
    }

    .event-footer-container {
      gap: 20px;
    }

    .icon-pairing-container {
      width: 142px;
      position: relative;
      margin: 0 auto;
      text-align: center;
      justify-content: center;
      display: flex;
    }

    .icon-pairing-container .icon-pairing {
      width: 105px;
    }
  }

  @media (max-width: 576px) {
    .lucky-moon-responstive {
      width: 140px;
    }

    .btn-click-here-lm {
      max-width: 140px;
    }

    .event-your-content {
      font-size: 16px;
    }

    .event-your-detail {
      img {
        width: 140px;
      }
    }

    .event-your-detail-number {
      font-size: 24px;
      top: 21.5px;
    }

    .icon-hadingyut {
      top: 160px;
    }

    .envent-place-container {
      padding-top: 100px;
    }

    .envent-place-item {
      width: 100%;
    }

    .icon-pairing-container {
      width: 70px;
    }

    .envent-place {
      display: grid;
      width: 100%;
      grid-template-columns: calc(50% - 40px) 70px calc(50% - 40px);
      gap: 5px;
    }

    .event-footer-container {
      position: relative;
      padding: 0 10px;

      img {
        width: 100px;
        position: absolute;
      }

      .event-footer-content {
        padding-left: 100px;
      }
    }
  }

  @media (max-width: 480px) {
    .event-footer-container {
      position: relative;
      padding: 0 10px;

      img {
        width: 100px;
        position: absolute;
      }

      .event-footer-content {
        padding-left: 0;
      }

      .event-warning {
        padding-left: 100px;
      }
    }
  }
`;
