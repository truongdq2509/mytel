import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import SliderBid from "../page/components/Bid/SliderBid";
import { useTranslation } from "react-i18next";

const ModalGirfBid = ({ data = {}, isShowDetail, setIsShowDetail }) => {
  const { t } = useTranslation();
  const listImageProduct = data?.gift_image?.split(',')

  return (
    <Container
      title=""
      centered
      open={isShowDetail}
      onOk={() => setIsShowDetail(false)}
      onCancel={() => setIsShowDetail(false)}
      // width={"middle"}
    >
      <div className="modal-detail__container">
        <div className="detail-bid">{t("bid_page.gift")}</div>
        <div className="detail-body__bid">
          <SliderBid listImageProduct={listImageProduct} />

          {/* <div className="gift-title">{product_name}</div> */}
          {/* <div className="commodity text-content">
                {t("home_page.code").replace("_CODE_", product_code)}
              </div> */}
          {/* <div className="price">{product_price} MMK</div> */}
          {/* <div className="quantity text-content">{`${t("bid_page.quantity")}: 01`}</div> */}

          <div className="description">
            <div className="description-title">{`${t(
              "bid_page.description"
            )}:`}</div>
            <div className="description-content">
              {/* <div className="text-content">{product_name}</div>
              <div className="text-content">
                {t("home_page.code").replace("_CODE_", product_code)}
              </div> */}
              <div className='content-des'>{data.gift_desc}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
const Container = styled(Modal)`
  max-width: 688px;

  .ant-modal-content {
    background-color: inherit !important;
  }
  .content-des{
    white-space: break-spaces;
  }

  .gift-title {
    font-size: 20px;
    line-height: 24.2px;
    font-weight: 600;
    color: #000000;
    padding-top: 60px;
  }

  .commodity {
    padding-top: 7px;
  }

  .quantity {
    padding-top: 5px;
    padding-bottom: 42px;
  }

  .description {
    padding-top: 60px;
  }

  .description-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 19.36px;
    color: #000000;
    padding-bottom: 3px;
  }

  .text-content {
    font-weight: 300;
    font-size: 16px;
    line-height: 19.36px;
    color: #444444;
  }

  .price {
    line-height: 36.31px;
    font-size: 30px;
    font-weight: 700;
    color: #ff2222;
  }

  .img-gift {
    border-radius: 28px;
    width: auto;
    height: 357px;
    margin: 0 auto;
  }
  .ant-carousel .slick-dots li button,
  .ant-carousel .slick-dots li {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }

  .ant-carousel .slick-dots .slick-active button,
  .ant-carousel .slick-dots .slick-active {
    height: 9px;
    width: 29px;
    border-radius: 4.5px;
    background-color: #afafaf;
  }

  ul.slick-dots {
    bottom: -15px !important;
  }

  .detail-body__bid {
    padding: 15px 45px;
    padding-bottom: 45px;
    background-color: white;
    max-height: 470px;
    overflow-y: auto;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-content {
    padding: 0;
    border-radius: 15px 15px 15px 15px;
    overflow: hidden;
  }

  .ant-modal-close {
    svg {
      color: white;
    }
  }

  .detail-bid {
    height: 78px;
    background-color: #f97a1c;
    line-height: 36.31px;
    font-size: 30px;
    font-weight: 600;
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  @media (max-width: 768px) {
    .ant-modal-close {
      top: 0px;
      right: 0px;

      svg {
        color: white;
      }
    }

    .detail-bid {
      font-weight: 500;
      font-size: 20px;
      line-height: 24.2px;
    }

    .detail-bid {
      height: 45px;
    }

    .detail-body__bid {
      padding: 12px 16px;
    }

    .gift-title {
      padding-top: 35px;
    }

    .gift-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 19.36px;
    }
    .text-content {
      font-size: 12px;
      line-height: 14.52px;
    }

    .price {
      font-size: 20px;
      font-weight: 700;
      line-height: 24.2pxs;
    }

    .quantity {
      padding-top: 0;
      padding-bottom: 8px;
    }
  }
`;
export default ModalGirfBid;
