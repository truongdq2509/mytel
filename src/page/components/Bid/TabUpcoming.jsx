import React, { useState } from "react";
import imgProduct from "../../../assets/images/bid-img-head.png";
import iconCalendar from "../../../assets/images/calendar.svg";
import iconBid from "../../../assets/images/icon-bid.svg";
import ModalDescriptionBid from "../../../component/ModalDescriptionBid";
import TabRunning from "./TabRunning";
import { format, parseISO } from "date-fns";
import { useTranslation } from 'react-i18next';
import { formatDataNumberToen } from "../../../utils/helper";

const TabUpcoming = ({ upNextProduct = [] }) => {
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false);
  const [isShowProduct, setIsShowProduct] = useState(false);
  const [dataPopup, setDataPopup] = useState([]);
  const [data, setData] = useState([]);

  const handleShowDetail = (event, data) => {
    event.stopPropagation();
    setOpenModal(true);
    setDataPopup(data);
  };

  const handleViewProduct = (data) => {
    setIsShowProduct(true);
    setData(data);
    window.scrollTo(0, 0);
  };

  const getItemProduct = (data) => {
    const {
      product_name = "",
      product_code = "",
      description = "",
      product_price = 0,
      start_time = "",
      product_image,
    } = data || {};
    const dateObj = parseISO(start_time);
    const formattedDate = format(dateObj, "dd-MM-yyyy");
    const formatHours = format(dateObj, "HH:mm");
    let listImageProduct = product_image?.split(",");

    return (
      <div
        className="upcoming-container"
        onClick={() => handleViewProduct(data)}
      >
        <div className="product-main">
          <img src={listImageProduct[0]} alt="" className="img-product" />
          <div className="product-detail">
            <div className="product-title">{product_name}</div>
            <div className="product-code">{t("home_page.product_code").replace("_CODE_", product_code)}</div>
            <div className="product-price">{formatDataNumberToen(product_price)} MMK</div>
            <div className="product-timer">
              <img src={iconCalendar} alt="icon-calendar" />
              <span className="timer-detail">
                {formattedDate}&nbsp;&nbsp;{formatHours}
              </span>
              <img src={iconBid} alt="icon-iconBid" className="icon-bid__upcoming" />
            </div>
          </div>
        </div>
        <div>
          <div
            href=""
            target="_blank"
            className="link-detail"
            onClick={(e) => handleShowDetail(e, data)}
          >
            {t("home_page.detail")}
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
            return <div key={`upcoming_${index}`}>{getItemProduct(item)}</div>;
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
