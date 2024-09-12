import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import iconLaternCandle from "../../../../assets/images/icon-lantern-candle.svg";
import iconLatern from "../../../../assets/images/icon-lantern-den-long.svg";
import PATH from "../../../../config/PATH";
import a from "../../../../assets/images/Vector Smart Object2 2.svg";
import b from "../../../../assets/images/Group 8 3.svg";
import iconFly from "../../../../assets/images/icon-fly.svg";

const PopupSuccessLantern = ({ isModalSuccess, setIsModalSuccess, totalFly={} }) => {
  const [isClosePopup, setIsClosePopup] = useState(true);
console.log("totalFly", totalFly);

  //   useEffect(() => {
  //     if (!isModalSuccess) {
  //       setIsClosePopup(true);
  //     }
  //     setTimeout(() => {
  //       setIsClosePopup(false);
  //     }, [3000]);
  //   }, []);


  const handleOk = () => {
    setIsModalSuccess(false);
  };
  const handleCancel = () => {
    setIsModalSuccess(false);
  };

  const handleThading = () => {
    setIsModalSuccess(false)
  };

  return (
    <StyleModal
      closable={true}
      centered
      open={isModalSuccess}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {/* <div className="container-gift">
        <div className="gift">
        <img src={a} />
        <img src={b} /></div>
      </div> */}
      <div className="gift-container-lm">
        <img src={iconFly} alt="" />
        <div className="gift-event-noti">
          <div className="noti">
            Congrats! You’ve successfully lit up{" "}
            <span className="total-bid-free">{totalFly.current}</span> flying lanterns and sent
            them soaring into the sky. Let’s the magic begin
          </div>
          <div className="btn-bid-now" onClick={handleThading}>
            BACK TO THADINGYUT
          </div>
        </div>
      </div>
    </StyleModal>
  );
};

const StyleModal = styled(Modal)`
  .container-gift {
    position: fixed;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
  }

  .gift {
    display: flex;
    align-items: baseline;
    gap: 20%;
  }

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
export default PopupSuccessLantern;
