import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import CountdownComponents from "../../../component/CountdownComponents";
import ImageProduct from "../../../component/ImageProduct";
import SliderBid from "../Bid/SliderBid";
import { formatDataNumberToen } from "../../../utils/helper";
import errorImage from "../../../assets/images/Rectangle 54.svg";
import iconWinner from "../../../assets/images/icon-result-winner.svg";
import _ from "lodash";
import { useNavigate } from "react-router";
import PATH from "../../../config/PATH";
import { useLocation } from "react-router";
import { urlPageResult } from "../../../helper/const";
import ModalDescriptionBid from "../../../component/ModalDescriptionBid";
import { getResultDetailProduct } from "../../../Redux/futures/result/action";
import { useDispatch, useSelector } from "react-redux";
import { curStateResult } from "../../../Redux/selector";
import avatarDefault from "../../../assets/images/avatarDefault.svg";
import styled from "styled-components";

const ResultComponent = ({ currentProduct = [], idTab }) => {
  const dataDetailResult = useSelector(curStateResult).detail;
  const selectorResult = useSelector(curStateResult).data;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModalDetail, setOpenModalDetail] = useState(false);

  const handleGetDetail = async (id, item) => {
    await dispatch(getResultDetailProduct({}, id));
    setOpenModalDetail(true);
  };

  const handleGoback = () => {
    navigate(`${PATH.RESULT}/${idTab}`);
  };

  const handleError = (event) => {
    event.target.src = avatarDefault;
  };

  // if (idResult || idResult == 0) {
  //   const { product_name = "", description = "" } = dataDetailResult;
  //   let descriptionFormat = description;
  //   if (description && description.includes("\n")) {
  //     descriptionFormat = description.split("\n");
  //   }

  //   return (
  //     <div className="result-detail__main">
  //       <div className="result-title__header">
  //         <i
  //           class="fa fa-angle-left"
  //           aria-hidden="true"
  //           onClick={() => handleGoback()}
  //         />
  //         <div className="result-title__detail">{product_name}</div>
  //       </div>
  //       <div className="result-title__body">
  //         <div className="detail-title__name">{product_name}</div>
  //         <div className="detail-content__main">
  //           <div className="content-main__head">
  //             {t("bid_page.title_description")}
  //           </div>
  //           {typeof descriptionFormat === "string" ? (
  //             <div className="result-des">{descriptionFormat}</div>
  //           ) : (
  //             <>
  //               {descriptionFormat?.map((des = "") => (
  //                 <div className="result-des" key={des}>
  //                   {des}
  //                 </div>
  //               ))}
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <Div className="header-main">
      {!_.isEmpty(dataDetailResult) ? (
        <ModalDescriptionBid
          openModal={openModalDetail}
          setOpenModal={setOpenModalDetail}
          data={dataDetailResult}
        />
      ) : null}

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
              auction_price = 0,
              name = "",
              isdn = "",
              status,
            } = item;
            let classFlex = "";
            if (index !== 0) {
              classFlex = "first-flex";
            }

            return (
              <Fragment key={`curren_product_${item.product_id}_${index}`}>
                <div className={`bid-banner-mobile mt-10__bid ${classFlex}`}>
                  <SliderBid listImageProduct={listImageProduct} />
                </div>
                <div className={`d-flex  bg-white`}>
                  <div className="container-product">
                    <ImageProduct product={item} data={listImageProduct} />
                  </div>
                  <div className="header-content">
                    <div className="title-product__container">
                      <div className="title-product title-product-result">
                        <span>{product_name}</span>{" "}
                        <div
                          className="link-detail link-detail-result"
                          onClick={() => handleGetDetail(item.cp_id)}
                        >
                          {t("home_page.detail")}
                        </div>
                      </div>
                      <div className="product-code">
                        {t("home_page.code").replace("_CODE_", product_code)}
                      </div>

                      <Row className="">
                        <Col span={11} className="time-countdownt">
                          <div className="auction-code pb-5">{`${t(
                            "bid_page.start_time"
                          )}:`}</div>
                          <div className="start-time__detail">
                            <CountdownComponents
                              targetDate={new Date(start_time)}
                            />
                          </div>
                        </Col>
                        <Col span={2} className="result-light__top">
                          <div className="light-top" />
                        </Col>
                        <Col span={11} className="time-countdownt">
                          <div className="auction-code pb-5">{`${t(
                            "bid_page.end_time"
                          )}:`}</div>
                          <div className="start-time__detail">
                            <CountdownComponents
                              targetDate={new Date(end_time)}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="result-price__mmk">
                        <Col span={11} className="">
                          <div className="product-code pt-5 pb-5">
                            {t("result_page.market_price")}
                          </div>
                          <div className="product-money">
                            {`${formatDataNumberToen(+product_price)} MMK`}
                          </div>
                        </Col>
                        <Col span={2} className="result-light__top">
                          <div className="light-top" />
                        </Col>
                        <Col span={11}>
                          <div>
                            <div className="product-code pt-5 pb-5">
                              {t("result_page.win_price")}
                            </div>
                            <div className="product-money">
                              {+auction_price == 0 || +status === 5 ? (
                                `N/A`
                              ) : (
                                <>{`${formatDataNumberToen(
                                  +auction_price
                                )} MMK`}</>
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="result-winner">
                      <div className="container-result__img">
                        <img
                          src={iconWinner}
                          className="result-icon__winner"
                          alt=""
                        />
                        <img
                          src={item?.image || ""}
                          alt=""
                          onError={handleError}
                          className="result-img__profile"
                        />
                        <div className="result-title__win">
                          {+status !== 5
                            ? t("result_page.winner")
                            : t("result_page.no_winner")}
                        </div>
                      </div>
                      {+status !== 5 ? (
                        <div>
                          {name ? (
                            <div className="result-contact__name">{name}</div>
                          ) : null}
                          {isdn ? (
                            <div className="result-contact__isdn">{isdn}</div>
                          ) : null}
                        </div>
                      ) : null}
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
    </Div>
  );
};

export default ResultComponent;

const Div = styled.div`
  .count-down__minutes {
    color: #000000 !important;
  }
`;
