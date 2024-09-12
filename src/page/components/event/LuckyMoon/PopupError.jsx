import React from "react";
import { Modal } from "antd";
import iconNoSpin from "../../../../assets/images/icon-no-spin.svg";
import styled from "styled-components";
import { useNavigate } from "react-router";

const PopupError = ({ isModalError, setIsModalError }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalError(false);
  };
  const handleCancel = () => {
    setIsModalError(false);
  };

  const handleBidNow = () => {
    navigate(`/event/lantern-collection`);
  };

  return (
    <StyleModal
      closable={true}
      centered
      open={isModalError}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="gift-container-lm">
        <img src={iconNoSpin} alt="" />
        <div className="gift-event-noti">
          <div className="noti">
            You have no spins left today. Please come back tomorrow for 3 new
            free spins. Thank you!
          </div>
          <div className="btn-bid-now" onClick={handleBidNow}>
            BACK TO THADINGYUT
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
export default PopupError;
