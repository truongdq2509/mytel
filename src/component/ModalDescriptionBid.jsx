import { Modal } from "antd";
import React from "react";
import styled from "styled-components";

const ModalDescriptionBid = ({ setOpenModal, openModal, data = {} }) => {
  const { product_name = "", product_code = "", description = "" } = data;

  return (
    <Container
      title="Confirmation"
      centered
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={"middle"}
    >
      <div className="product-title__modal">{product_name}</div>
      <div className="body-modal">
        <div className="content-body">
          <div className="body-title__content">Material Information</div>
          <div>{product_name}</div>
          <div>Code Number: {product_code}</div>
          <div>{description}</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled(Modal)`
  max-width: 700px;

  .ant-modal-content {
    padding-bottom: 38px !important;
  }

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
  }

  .body-modal {
    margin: 0 30px;
    background-color: #f1eff5;
    border-radius: 10px;
  }

  .product-title__modal,
  .body-title__content {
    margin: 0 30px;
    color: #000000;
    font-weight: 700;
    line-height: 19.36px;
    font-size: 16px;
    padding-bottom: 11px;
  }

  .body-title__content {
    margin: 0;
  }

  .content-body {
    padding: 20px 24px;
    color: #191919;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.36px;
  }

  .ant-modal-footer {
    display: none;
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

export default ModalDescriptionBid;
