import HeaderEvent from "../HeaderEvent";
import { ID_EVENT } from "../../../../helper/const";
import BgEvent from "../../../../assets/images/bg-event.svg";
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
import { useEffect } from "react";
import { getConfigEvent, getDataLanternCollection } from "../../../../Redux/futures/event/action";
import { curStateEvent } from "../../../../Redux/selector";

export default function LanternCollection({ tabActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataLanternCollection, configEventLuckyMoon } = useSelector(curStateEvent) || {};

  useEffect(() => {
    dispatch(getDataLanternCollection());
    dispatch(getConfigEvent());
  }, []);

  const handleAction = (url) => {
    navigate(url);
  };

  return (
    <Container>
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <HeaderEvent tabActive={tabActive} />
            <div className="icon-lucky-moon">
              <img
                src={iconLuckymoon}
                alt="lucky-moon"
                onClick={() =>
                  handleAction(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
                }
              />
              <div
                className="number-lucky-moon"
                onClick={() =>
                  handleAction(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
                }
              >
                {configEventLuckyMoon?.spin_left || 0}
              </div>
            </div>
            <div className="event-your">
              <div className="event-your-content">Your collection</div>
              <div className="event-your-detail">
                <img src={iconYour} alt="" />
                <div className="event-your-detail-number">x{dataLanternCollection?.fly}</div>
              </div>
            </div>
            <div className="envent-place-container">
              <div className="envent-place">
                <div className="envent-place-item">
                  <img src={iconNen} alt="" />
                  <div className="envent-place-content">
                    Place more bid to get more candles
                  </div>
                  <div
                    className="envent-place-btn-bit"
                    onClick={() => handleAction(`${PATH.BID}/running`)}
                  >
                    Bid now
                  </div>
                </div>
                <div className="icon-pairing-container">
                  <img
                    src={iconPairing}
                    alt="icon-pairing"
                    className="icon-pairing"
                  />
                </div>
                <div className="envent-place-item">
                  <img src={iconLook} alt="icon-mytel" />
                  <div className="envent-place-content">
                    Place more packages to get more lanterns
                  </div>
                  <div
                    className="envent-place-btn-bit"
                    onClick={() => handleAction(PATH.PACKAGE)}
                  >
                    Buy package
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
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1);

  .position-relative {
    position: relative;
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

  .envent-place-container {
    position: absolute;
    bottom: 195px;
    left: 50%;
    transform: translateX(-50%);
  }

  .icon-pairing-container {
    width: 142px;
    position: relative;

    .icon-pairing {
      position: absolute;
      bottom: 80px;
    }
  }

  .envent-place-item {
    width: 220px;
    text-align: center;
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
      margin-top: 3px;
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
    position: absolute;
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
      bottom: 82px;
      left: 76px;
    }
  }

  @media (min-width: 992px) {
    .envent-place-btn-bit:hover {
      background-color: rgb(210 194 25);
      transition: 0.3s ease-in-out;
    }
  }
`;
