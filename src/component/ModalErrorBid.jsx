import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const ModalErrorBid = ({ setOpenModalError, openModalError }) => {
  const { t } = useTranslation();

  const handleOkeApi = () => {
    setOpenModalError(false);
  };

  return (
    <Container
      title={t("bid_page.sorry")}
      centered
      open={openModalError}
      onOk={handleOkeApi}
      onCancel={() => setOpenModalError(false)}
      width={"middle"}
    >
      <div className="body-modal">
        <div className="content-body">{t("bid_page.please_type_the_number")}</div>
      </div>
    </Container>
  );
};

const Container = styled(Modal)`
  max-width: 700px;

  .ant-modal-close {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .ant-modal-title {
    color: #000000;
    line-height: 30.26px;
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    padding-top: 3px;
    padding-bottom: 20px;
    text-transform: capitalize !important;
  }

  .body-modal {
    margin: 0 30px;
    background-color: #f1eff5;
    border-radius: 10px;
  }

  .content-body {
    padding: 43px 26px;
    color: #191919;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
    text-align: center;
  }

  .ant-modal-footer {
    text-align: center;
    gap: 10px;

    button {
      width: 35%;
      height: 42px;
      color: #575757;
      font-size: 16px;
      font-weight: 400;
      line-height: 19.36px;
      border-radius: 50px;
      background-color: #dedede;

      &:hover {
        opacity: 0.6;
        transition: 0.3s ease-in-out;
        background-color: #dedede !important;
        color: #575757 !important;
        border: 0px !important;
      }
    }

    button:last-child {
      background-color: #f97a1c;
      color: white;
      margin-inline-start: 10px !important;

      &:hover {
        opacity: 0.6;
        transition: 0.3s ease-in-out;
        background-color: #f97a1c !important;
        color: white !important;
        border: 0px !important;
      }
    }
  }

  .ant-modal-footer {
    margin-top: 30px !important;
  }

  @media (max-width: 768px) {
    .ant-modal-content {
      padding: 16px 24px;
    }
    .ant-modal-title {
      font-size: 20px;
      font-weight: 500;
      line-height: 24.2px;
      padding-top: 0;
      padding-bottom: 16px;
    }

    .content-body {
      padding: 26px 34px;
      font-size: 12px;
      font-weight: 400;
      line-height: 14.52px;
    }

    .ant-modal-footer button {
      width: 143px;
      height: 34px;
    }

    .body-modal {
      margin: 0;
    }
  }

  @media (max-width: 576px) {
    .ant-modal-footer {
      display: flex;
      justify-content: space-between;
    }

    .ant-modal-footer button:last-child {
      margin-inline-start: 0px !important;
    }

    .ant-modal-footer button {
      font-size: 12px;
      font-weight: 500;
      line-height: 14.52px;
    }
  }
`;

export default ModalErrorBid;
