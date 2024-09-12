import React from "react";
import { Modal } from "antd";
import giftBid from "../../../../assets/images/gift-bid.png";
import giftLanterns from "../../../../assets/images/icon-lanterns.svg";
import giftCandles from "../../../../assets/images/icon-Candles.svg";
import giftMmk from "../../../../assets/images/icon-mmk.svg";
import giftGoodluck from "../../../../assets/images/icon-good-luck.svg";

import styled from "styled-components";
import { useNavigate } from "react-router";
import PATH from "../../../../config/PATH";

const PopupGift = ({ isModalGift, setIsModalGift, dataModal }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalGift(false);
  };
  const handleCancel = () => {
    setIsModalGift(false);
  };

  const handleBidNow = (url) => {
    if (!url) {
      setIsModalGift(false);
    }
    navigate(url);
  };
  let data = {
    urlImage: null,
    content: {
      first: "",
      last: "",
    },
    button: {
      name: "",
      url: "",
    },
  };
  switch (dataModal.type) {
    case "GOOD_LUCK":
      data.urlImage = giftGoodluck;
      data.content.first =
        "You have just landed on Good Luck. MytelBid wish you better luck next time. Please try again, thank you!";
      data.content.last = "";
      data.button.name = "BACK TO LUCKYMOON";
      data.button.url = false;
      break;
    case "BID_FREE":
      data.urlImage = giftBid;
      data.content.first = "Congrats! You have just got";
      data.content.last = "Free bids from lucky Moon. Let’s join bidding now!";
      data.button.name = "BID NOW";
      data.button.url = `${PATH.BID}/running`;
      break;
    case "CANDLE":
      data.urlImage = giftCandles;
      data.content.first = "Congrats! You have just got extra";
      data.content.last =
        "Candles. Let’s earn more lanterns to pair with these Candles.";
      data.button.name = "BID PACKAGE";
      data.button.url = `/account/package`;
      break;
    case "LANTERN":
      data.urlImage = giftLanterns;
      data.content.first = "Congrats! You have just got extra";
      data.content.last =
        "lanterns. Let’s earn mỏe candles to pair with these lanterns";
      data.button.name = "BID NOW";
      data.button.url = `${PATH.BID}/running`;
      break;
    case "SPECIAL":
      data.urlImage = giftMmk;
      data.content.first = "Congrats! You have got";
      data.content.last =
        "We will add this amount into your balance account soon";
      data.button.name = "BACK TO LUCKYMOON";
      data.button.url = false;
      break;
    default:
      break;
  }

  return (
    <StyleModal
      closable={true}
      centered
      open={isModalGift}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="gift-container-lm">
        <img src={data.urlImage} alt="" />
        <div className="gift-event-noti">
          <div className="noti">
            {data.content.first}{" "}
            {dataModal?.value || dataModal.type === "SPECIAL" ? (
              <span className="total-bid-free">
                {dataModal.type === "SPECIAL" ? "200.000MMK" : dataModal?.value}
              </span>
            ) : (
              ""
            )}{" "}
            {data.content.last}
          </div>
          <div
            className="btn-bid-now"
            onClick={() => handleBidNow(data.button.url)}
          >
            {data.button.name}
          </div>
        </div>
      </div>
    </StyleModal>
  );
};

const StyleModal = styled(Modal)`
  .gift-event-noti {
    position: absolute;
    bottom: 21px;
    display: flex;
    flex-direction: column;
    gap: 13px;
    padding: 0 20px;
  }

  .total-bid-free {
    color: rgba(255, 213, 0, 1);
    font-weight: 700;
    font-size: 32px;
    line-height: 24px;
  }

  .noti {
    background: rgba(61, 0, 0, 0.5);
    padding: 24px 0;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: white;
    font-weight: 300;
    border-radius: 12px;
  }

  .gift-container-lm {
    position: relative;
    width: max-content;
  }

  .ant-modal-content {
    background-color: inherit !important;
    box-shadow: inherit !important;
    padding: 0 !important;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-body {
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .ant-modal-close {
    right: 40px !important;

    svg {
      color: white;
    }
  }

  .btn-bid-now {
    background-color: rgba(249, 230, 29, 1);
    width: 216px;
    height: 50px;
    border-radius: 25px;
    color: rgba(67, 12, 5, 1);
    font-size: 16px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;

    @media (min-width: 992px) {
      &:hover {
        background-color: #faef79;
        transition: 0.3s ease-in-out;
      }
    }
  }

  @media (max-width: 768px){
    .noti{
      font-size: 13px;
      padding: 20px 0;
    }

    .btn-bid-now{
      font-size: 13px;
      width: 160px;
    }
  }

  @media (max-width: 576px) {
    .ant-modal-close {
      right: 10px !important;
    }
  }
`;
export default PopupGift;
