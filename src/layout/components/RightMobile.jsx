import { useTranslation } from "react-i18next";
import avtDefaults from "../../assets/images/avtRight.png";
import { Pagination, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { curStateAccount, curStateHome, curStateRightWeb } from "../../Redux/selector";
import { useEffect, useState } from "react";
import {
  getHistoryBid,
  getHistoryBidAll,
} from "../../Redux/futures/rightWeb/actions";
import moment from "moment";
import avatarDefault from "../../assets/images/avatarDefault.svg"
import { currentDate } from '../../helper/const';
import { checkImage } from '../../helper/helper';

function RightWebMobile() {
  const { t } = useTranslation();
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [listBidHistory, setListBidHistory] = useState([]);
  const selectorRightWeb = useSelector(curStateRightWeb);
  const selectorAccount = useSelector(curStateAccount)
  const selectorHome = useSelector(curStateHome);
  const [currentProduct, setCurrentProduct] = useState([])
  const dispatch = useDispatch();
  const [objTextHeader, setObjectTextHeader] = useState({
    text1: t("right_page.text_foot1"),
    text2: t("right_page.text_foot2"),
    text3: null
  })
  useEffect(() => {
    if (selectorHome?.bidProduct?.length > 0) {
      let currentProduct = selectorHome.bidProduct.filter(
        (product) => new Date(product?.start_time).getTime() < currentDate
      );
      setCurrentProduct(currentProduct);
    } else {
      setCurrentProduct([]);
    }

  }, [selectorHome.bidProduct]);
  useEffect(() => {
    let query = {
      current: page,
      pageSize: 7,
      sort: sort,
    };
    if (selectorRightWeb.idCurrentProduct) {
      query.cp_ids = selectorRightWeb.idCurrentProduct;
      dispatch(getHistoryBid({ query }));
    } else {
      delete query.cp_ids;
      dispatch(getHistoryBidAll({ query }));
    }
  }, [selectorRightWeb.idCurrentProduct, sort, page]);
  useEffect(() => {
    if (selectorAccount.userInfo) {
      if (selectorAccount.userInfo.isAdvantage) {
        setObjectTextHeader({
          text1: t("right_page.text_foot1"),
          text2: t("right_page.text_foot2"),
          text3: t("right_page.text_foot8")
        })
      } else {
        if (selectorAccount.userInfo.minPriceOfCurrentUser > 0) {
          setObjectTextHeader({
            text1: t("right_page.text_foot5"),
            text2: t("right_page.text_foot6").replace("_NUMBER_", selectorAccount.userInfo.countSamePrice),
            text3: t("right_page.text_foot7").replace("_NUMBER_", selectorAccount.userInfo.countLowerPrice)
          })
        } else {
          setObjectTextHeader({
            text1: t("right_page.text_foot3"),
            text2: t("right_page.text_foot4"),
            text3: null
          })
        }
      }
    } else {
      setObjectTextHeader({
        text1: t("right_page.text_foot3"),
        text2: t("right_page.text_foot4"),
        text3: null
      })
    }
  }, [selectorAccount.userInfo]);
  useEffect(() => {
    if (selectorRightWeb.idCurrentProduct) {
      if (selectorRightWeb?.bidHistory?.data?.length > 0) {
        setPage(+selectorRightWeb?.bidHistory?.current);
        setTotal(+selectorRightWeb?.bidHistory?.total);
        setListBidHistory(selectorRightWeb?.bidHistory?.data);
      } else {
        setPage(1);
        setTotal(0);
        setListBidHistory([]);
      }
    } else {
      if (selectorRightWeb?.bidHistoryAll?.data?.length > 0) {
        setPage(+selectorRightWeb?.bidHistoryAll?.current);
        setTotal(+selectorRightWeb?.bidHistoryAll?.total);
        setListBidHistory(selectorRightWeb?.bidHistoryAll.data);
      } else {
        setPage(1);
        setTotal(0);
        setListBidHistory([]);
      }
    }
  }, [
    selectorRightWeb.bidHistory,
    selectorRightWeb.bidHistoryAll,
    selectorRightWeb.idCurrentProduct,
  ]);
  return (
    <div className="right-page right-page__bid">
      <div className="right-page-content">
        <div className="right-page-content-head">
          <div className="right-page-content-head-title">
            {t("right_page.bid_report")}
          </div>
          <Select
            defaultValue={t("right_page.the_last")}
            style={{ width: 125, height: 36 }}
            onChange={(value) => {
              setSort(value);
            }}
            options={[
              { value: "desc", label: t("right_page.the_last") },
              { value: "asc", label: t("right_page.the_first") },
            ]}
          />
        </div>

        <div className="right-page-content-body">
          {listBidHistory.length > 0
            ? listBidHistory.map((it, index) => {
              let dateFomat = moment(it.auction_time).format(
                "MMM D, YYYY, h:mm A"
              );
              let url = avatarDefault
              if (it?.image && !it.image.includes("/static")) {
                if (checkImage(it.image)) {
                  url = it?.image
                }
              }
              return (
                <div
                  key={`item_right_${it.key}_${index}`}
                  className="item-body"
                >
                  <div className="box-user">
                    <div
                      style={{ backgroundImage: `url(${url})` }}
                      className="avatar"
                    />
                    <div className="box-info">
                      <div className="name one-line">
                        {it.isdn}
                      </div>
                      <div className="phone-number">{it.isdn}</div>
                      <div className="date">{dateFomat}</div>
                    </div>
                  </div>
                  <div className="box-price">
                    <div className="text">{t("right_page.bid_price")}</div>
                    <div className="price">{it.price}</div>
                  </div>
                </div>
              );
            })
            : null}
        </div>
        <div className="box-pagination">
          <Pagination
            responsive={true}
            hideOnSinglePage={true}
            showSizeChanger={false}
            showTitle={false}
            style={{ maxWidth: "100%" }}
            onChange={(page, pageSize) => {
              setPage(page);
            }}
            current={page}
            pageSize={7}
            defaultCurrent={1}
            showLessItems
            total={total}
          />
        </div>
      </div>

      <div className="right-page-head">
        <div className="number-people">
          <span>{currentProduct[0]?.count_user || 0}</span>
          <span>{t("right_page.number_people")}</span>
        </div>
        <div className="hr-mobile" />

        <div className={`icon-head ${selectorAccount.userInfo && !selectorAccount.userInfo.isAdvantage && selectorAccount.userInfo.minPriceOfCurrentUser > 0 ? 'icon-lose' : ''}`} />
        <div className="box-text">
          <div>{objTextHeader.text1}</div>
          <div>{objTextHeader.text2}</div>
          {objTextHeader.text3 ? <div>{objTextHeader.text3}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default RightWebMobile;
