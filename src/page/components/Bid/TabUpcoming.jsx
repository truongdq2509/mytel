import React, { useState } from "react";
import imgProduct from "../../../assets/images/bid-img-head.png";
import iconCalendar from "../../../assets/images/calendar.svg";
import iconBid from "../../../assets/images/icon-bid.svg";
import ModalDescriptionBid from "../../../component/ModalDescriptionBid";
import TabRunning from "./TabRunning";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { formatDataNumberToen } from "../../../utils/helper";
import CountdownComponents from "../../../component/CountdownComponents";
import styled from "styled-components";
import { Carousel } from "antd";
import iconGirf from "../../../assets/images/icon-girf.svg";
import ModalGirfBid from "../../../component/ModalGirfBid";

const TabUpcoming = ({ upNextProduct = [] }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [dataPopup, setDataPopup] = useState([]);
  const [data, setData] = useState([]);
  const [dataDetailActive, setDataDetailActive] = useState([]);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const handleShowDetail = (event, data) => {
    event.stopPropagation();
    setOpenModal(true);
    setDataPopup(data);
  };

  const handleClickGirf = (data) => {
    setDataDetailActive(data);
    setIsShowDetail(true);
  };

  // const handleViewProduct = (data) => {
  //   setIsShowProduct(true);
  //   setData(data);
  //   window.scrollTo(0, 0);
  // };

  const getItemProduct = (data) => {
    console.log(data);
    const {
      product_name = "",
      product_code = "",
      description = "",
      product_price = 0,
      start_time = "",
      product_image,
      end_time = "",
    } = data || {};
    const dateObj = parseISO(start_time);
    const formattedDate = format(dateObj, "dd-MM-yyyy");
    const formatHours = format(dateObj, "HH:mm");
    let listImageProduct = product_image?.split(",");

    return (
      <div className="container-item-bid">
        <div
          className="upcoming-container hover-page"
          // onClick={() => handleViewProduct(data)}
        >
          <div className="product-main">
            {/* <img src={listImageProduct[0]} alt="" className="img-product" /> */}
            <ContainerSlider className="container-slider__item">
              <Carousel
                autoplaySpeed={5000}
                autoplay={true}
                infinite={true}
                dots={listImageProduct?.length > 1}
                draggable
              >
                {listImageProduct.map((item) => {
                  return <img src={item} alt="" key={item} />;
                })}
              </Carousel>
            </ContainerSlider>
            <div
              className="product-detail"
              onClick={(e) => handleShowDetail(e, data)}
            >
              <div className="product-title">{product_name}</div>
              <div className="product-code">
                {t("home_page.product_code").replace("_CODE_", product_code)}
              </div>
              <div className="product-price color-black">
                {formatDataNumberToen(product_price)} MMK
              </div>

              <div>
                <div className="container-count__down">
                  <div className="time-countdownt">
                    <div className="auction-code pb-5">{`${t(
                      "bid_page.start_time"
                    )}:`}</div>
                    <div className="start-time__detail">
                      <CountdownComponents
                        targetDate={new Date(start_time)}
                        isTabUpcoming
                      />
                    </div>
                  </div>
                  <div className="light-top" />
                  <div className="time-countdownt">
                    <div className="auction-code pb-5">{`${t(
                      "bid_page.end_time"
                    )}:`}</div>
                    <div className="start-time__detail">
                      <CountdownComponents
                        targetDate={new Date(end_time)}
                        isTabUpcoming
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-timer">
                <img src={iconCalendar} alt="icon-calendar" />
                <span className="timer-detail">
                  {formattedDate}&nbsp;&nbsp;{formatHours}
                </span>
                <img
                  src={iconBid}
                  alt="icon-iconBid"
                  className="icon-bid__upcoming"
                />
              </div>
            </div>
            {data?.gift_name || data?.gift_image || data?.gift_desc ? (
              <img
                src={iconGirf}
                alt="icon-girf"
                className="icon-girf icon-girf__upcoming"
                onClick={() => handleClickGirf(data)}
              />
            ) : null}
          </div>
          <div>
            <div
              href=""
              target="_blank"
              className="link-detail link-detail__up"
              onClick={(e) => handleShowDetail(e, data)}
            >
              {t("home_page.detail")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isShowProduct ? (
        <div id="bid-upcoming">
          {upNextProduct.map((item, index) => {
            return (
              <Container key={`upcoming_${index}`}>
                <ModalGirfBid
                  isShowDetail={isShowDetail}
                  setIsShowDetail={setIsShowDetail}
                  data={dataDetailActive}
                />
                {getItemProduct(item)}
              </Container>
            );
          })}
          <ModalDescriptionBid
            openModal={openModal}
            setOpenModal={setOpenModal}
            data={dataPopup}
          />
        </div>
      ) : (
        <TabRunning currentProduct={[data]} />
      )}
    </>
  );
};

export default TabUpcoming;

const Container = styled.div`
  .auction-code.pb-5 {
    font-size: 14px;
    line-height: 16.94px;
    color: #ff2222;
  }

  .container-count__down {
    gap: 100px;
  }

  @media (max-width: 1200px) {
    .container-count__down {
      gap: 45px;
    }
  }

  @media (max-width: 768px) {
    .container-count__down {
      gap: 45px;
    }

    .auction-code.pb-5 {
      font-size: 10px;
      line-height: 12.1px;
      padding-bottom: 5px;
    }
  }

  @media (max-width: 576px) {
    .container-count__down {
      gap: 10px;
    }

    .container-count__down {
      width: max-content;
    }
  }
`;

const ContainerSlider = styled.div`
  padding-bottom: 6.5px;

  .slick-dots.slick-dots-bottom {
    position: absolute;
    bottom: 0px;

    li button {
      width: 8px;
      height: 8px;
      background: white;
      position: relative;
      border-radius: 50%;
      border: 0.5px solid gray;

      &::after {
        width: 8px;
        height: 8px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .slick-active button {
      background: #f97a1c;
      border-color: #f97a1c;
    }

    li {
      width: auto !important;
    }
  }
  @media (max-width: 768px) {
    padding-bottom: 4px;
    .slick-dots.slick-dots-bottom {
      li button {
        width: 6px;
        height: 6px;
        background: white;
        position: relative;
        border-radius: 50%;
        border: 0.5px solid gray;

        &::after {
          width: 6px;
          height: 6px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      .slick-active button {
        background: #f97a1c;
        border-color: #f97a1c;
      }
    }
  }
`;
