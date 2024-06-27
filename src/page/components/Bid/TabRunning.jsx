import React, { Fragment, useMemo, useState } from "react";
import CountdownComponents from "../../../component/CountdownComponents";
import ImageProduct from "../../../component/ImageProduct";
import iconBit from "../../../assets/images/icon-bit.svg";
import iconGirf from "../../../assets/images/icon-girf.svg";
import ModalConfirmBid from "../../../component/ModalConfirmBid";
import ModalGirfBid from "../../../component/ModalGirfBid";
import SliderBid from "./SliderBid";
import RightWebMobile from "../../../layout/components/RightMobile";
import ModalDescriptionBid from "../../../component/ModalDescriptionBid";
import { useTranslation } from "react-i18next";
import { formatDataNumberToen } from "../../../utils/helper";
import { mediaQueryPoint, useMediaQuery } from "../../../utils/hooks";
import ModalErrorBid from "../../../component/ModalErrorBid";
import { useSelector } from "react-redux";
import { curStateAccount } from "../../../Redux/selector";

const TabRunning = ({ currentProduct = [], setOpenModalLogin }) => {
  const selectorAccount = useSelector(curStateAccount);
  const { t } = useTranslation();
  const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);
  const [valueInput, setValueInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataDetailActive, setDataDetailActive] = useState([]);

  const isBidActiveErr = useMemo(() => {
    if (+valueInput < 1000 || +valueInput % 50 !== 0 || +valueInput > 2000000) {
      return true;
    }
    return false;
  }, [valueInput]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setValueInput(value);
  };
  // console.log(valueInput);
  const handleGift = (data) => {
    setDataDetailActive([data]);
    setIsShowDetail(true);
  };

  const handleBit = (data) => {
    if (!selectorAccount.userInfo) {
      return setOpenModalLogin(true);
    }

    if (valueInput === "") {
      setOpenModalError(true);
      return null;
    }
    if (isBidActiveErr) {
      return null;
    }
    if (valueInput) {
      setOpenModal(true);
      setDataDetailActive([data]);
    }
  };

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  return (
    <>
      <ModalGirfBid
        isShowDetail={isShowDetail}
        setIsShowDetail={setIsShowDetail}
        data={dataDetailActive}
      />
      <ModalErrorBid
        openModalError={openModalError}
        setOpenModalError={setOpenModalError}
      />
      <div className="header-main">
        <div className="main-container">
          {currentProduct.length > 0 ? (
            currentProduct.map((item, index) => {
              let listImageProduct = item?.product_image?.split(",");
              const {
                product_name = "",
                product_price = 0,
                product_code = "",
                start_time = "",
                end_time = "",
              } = item;

              let classFlex = "";
              if (index !== 0) {
                classFlex = "first-flex";
              }

              return (
                <Fragment key={`curren_product_${item.product_id}_${index}`}>
                  <div className={`bid-banner-mobile ${classFlex}`}>
                    <SliderBid listImageProduct={listImageProduct} />
                  </div>
                  <div className="d-flex  bg-white pt-30">
                    <ModalDescriptionBid
                      openModal={openModalDetail}
                      setOpenModal={setOpenModalDetail}
                      data={item}
                    />
                    {item?.gift_name && (
                      <ModalGirfBid
                        isShowDetail={isShowDetail}
                        setIsShowDetail={setIsShowDetail}
                        data={item}
                      />
                    )}
                    <div className="container-product">
                      <ImageProduct data={listImageProduct} />{" "}
                    </div>
                    <div className="header-content">
                      <div className="title-product__container">
                        <div className="title-product">
                          <span>{product_name}</span>{" "}
                          <div
                            className="link-detail"
                            onClick={() => setOpenModalDetail(true)}
                          >
                            {t("home_page.detail")}
                          </div>
                        </div>
                        <div className="product-code">
                          {t("home_page.code").replace("_CODE_", product_code)}
                        </div>
                        <div className="product-money">{`${formatDataNumberToen(
                          +product_price
                        )} MMK`}</div>
                        <div className="line" />
                        <div className="auction-code pb-12">
                          {" "}
                          {t("bid_page.auction_code")}
                        </div>
                        <div className="auction-code pb-12">{`${t(
                          "bid_page.quantity"
                        )}: 01`}</div>
                        <div className="container-count__down">
                          <div className="time-countdownt">
                            <div className="auction-code pb-5">{`${t(
                              "bid_page.start_time"
                            )}:`}</div>
                            <div className="start-time__detail">
                              <CountdownComponents
                                targetDate={new Date(start_time)}
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
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bit-container">
                        <div className="position-relative">
                          <input
                            className="input-bit__now"
                            placeholder=""
                            value={valueInput}
                            // type="number"
                            onChange={handleInputChange}
                          />
                          <div className="currency-bit">MMK</div>
                          <div
                            className={`btn-bit ${
                              isBidActiveErr && valueInput !== ""
                                ? "disable-bid"
                                : ""
                            }`}
                            onClick={() => handleBit(item)}
                          >
                            <img
                              src={iconBit}
                              alt="icon-bit"
                              className="icon-bit"
                            />
                            <span className="btn-title__bit">
                              {" "}
                              {t("home_page.bid_now")}
                            </span>
                          </div>
                        </div>
                        {valueInput !== "" && isBidActiveErr ? (
                          <div className="error-input__bid">
                            {t("bid_page.warning")}
                          </div>
                        ) : null}
                      </div>
                      {item?.gift_name ? (
                        <div
                          className="girf-container"
                          onClick={() => handleGift(item)}
                        >
                          <img
                            src={iconGirf}
                            alt="icon-girf"
                            className="icon-girf"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="header-main header-main__content mt-13">
        <div className="tips-container">
          <div className="tips">{`${t("bid_page.tip_to_win")}:`}</div>
          <div className="content-container">
            <div className="content-item">
              {t("bid_page.content_you_can_bit")}
            </div>
            <div className="content-item">
              {t("bid_page.content_you_do_not")}
            </div>
            <div className="content-item">
              {t("bid_page.content_auction_is_a")}{" "}
              <span className="only">{t("bid_page.content_only_you_bid")}</span>
            </div>
          </div>
        </div>
        {isMobile ? (
          <div className="is-mobile">
            <RightWebMobile />
          </div>
        ) : null}
      </div>
      {openModal ? (
        <ModalConfirmBid
          setOpenModal={setOpenModal}
          openModal={openModal}
          valueInput={+valueInput}
          data={dataDetailActive}
          setValueInput={setValueInput}
        />
      ) : null}
      {/* <ModalSuccessfullBid setOpenModal={setOpenModal} openModal={openModal} /> */}
    </>
  );
};

export default TabRunning;
