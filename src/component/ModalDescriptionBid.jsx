import { Modal } from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ModalDescriptionBid = ({ setOpenModal, openModal, data = {} }) => {
  const { t } = useTranslation();
  if (!data) return null;
  const { product_name = "", product_code = "", description = "" } = data;
  
  return (
    <Container
      title="Detail Description"
      centered
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={"middle"}
    >
      <div className="product-title__modal">{product_name}</div>
      <div className="body-modal">
        <div className="content-body">
          <div className="body-title__content">
            {t("bid_page.title_description")}
          </div>
          <div>{product_name}</div>
          <div>{t("bid_page.code_number").replace("_CODE_", product_code)}</div>
          <div className='content-des'>{description}</div>
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
  .content-des{
    white-space: break-spaces;
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
    /* max-height: 400px; */
    overflow-y: auto;
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
    .ant-modal-header{
      margin-top: 5px;
    }
    
    .ant-modal-close{
      width: max-content;
      height: max-content;
      right: 5px;
      top: 5px;
    }

    .product-title__modal,
    .body-title__content {
      font-size: 12px;
      font-weight: 700;
      line-height: 14.52px;
    }

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
      div {
        font-size: 11px;
      }
    }

    .ant-modal-footer button {
      width: 143px;
      height: 34px;
    }

    .body-modal {
      margin: 0;
    }

    .ant-modal-content {
      padding: 16px !important;
    }

    .content-body {
      padding: 10px 11px;
    }

    .product-title__modal {
      margin: 0;
      padding-bottom: 15px;
    }
  }

  /* @media (max-width: 576px) {
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
  } */
`;

export default ModalDescriptionBid;
