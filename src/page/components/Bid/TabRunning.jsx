import React, { Fragment, useState } from "react";
import CountdownComponents from "../../../component/CountdownComponents";
import ImageProduct from "../../../component/ImageProduct";
import iconBit from "../../../assets/images/icon-bit.svg";
import iconGirf from "../../../assets/images/icon-girf.svg";
import ModalConfirmBid from "../../../component/ModalConfirmBid";
import ModalGirfBid from "../../../component/ModalGirfBid";
import SliderBid from "./SliderBid";
import RightWebMobile from "../../../layout/components/RightMobile";
import ModalDescriptionBid from "../../../component/ModalDescriptionBid";
import { useTranslation } from 'react-i18next';
import { formatDataNumberToen } from "../../../utils/helper";

const TabRunning = ({ currentProduct = [] }) => {
  const { t } = useTranslation()
  const [valueInput, setValueInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dataDetailActive, setDataDetailActive] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setValueInput(value);
  };

  const handleGift = (data) => {
    setDataDetailActive([data]);
    setIsShowDetail(true);
  };

  const handleBit = (data) => {
    setOpenModal(true);
    setDataDetailActive([data]);
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
                  <div className={`d-flex  bg-white`}>
                    <ModalDescriptionBid
                      openModal={openModalDetail}
                      setOpenModal={setOpenModalDetail}
                      data={item}
                    />
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
                        <div className="product-money">{`${formatDataNumberToen(+product_price)} MMK`}</div>
                        <div className="line" />
                        <div className="auction-code pb-12"> {t("bid_page.auction_code")}</div>
                        <div className="auction-code pb-12">{`${t("bid_page.quantity")}: 01`}</div>
                        <div className="container-count__down">
                          <div className="time-countdownt">
                            <div className="auction-code pb-5">{`${t("bid_page.start_time")}:`}</div>
                            <div className="start-time__detail">
                              <CountdownComponents
                                targetDate={new Date(start_time)}
                              />
                            </div>
                          </div>
                          <div className="light-top" />
                          <div className="time-countdownt">
                            <div className="auction-code pb-5">{`${t("bid_page.end_time")}:`}</div>
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
                            className="btn-bit"
                            onClick={() => handleBit(item)}
                          >
                            <img
                              src={iconBit}
                              alt="icon-bit"
                              className="icon-bit"
                            />
                            <span className="btn-title__bit"> {t("home_page.bid_now")}</span>
                          </div>
                        </div>
                      </div>
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
              - You can bid multiple times, the more you bid, the higher your
              chances of winning
            </div>
            <div className="content-item">
              - You do not have to pay for the product at the
              price you place. You just need to pay fee for bidding times
            </div>
            <div className="content-item">
              - Auction is a game where many users participate
              in bidding for a product. With Reverse Auction game, you bid as
              low as possible. However, there can be many users offering the
              same price while there is only 1 product. Therefore, Mytelbid
              offers the following rule for selecting winners: Your price must
              be the lowest and only price{" "}
              <span className="only">
                (only you bid at that price). Among those unique prices, the
                system will filter for the lowest price -> find the winner
              </span>
            </div>
          </div>
        </div>
        <div className="is-mobile">
          <RightWebMobile />
        </div>
      </div>
      <ModalConfirmBid
        setOpenModal={setOpenModal}
        openModal={openModal}
        valueInput={+valueInput}
        data={dataDetailActive}
      />

      {/* <ModalSuccessfullBid setOpenModal={setOpenModal} openModal={openModal} /> */}
    </>
  );
};

export default TabRunning;
