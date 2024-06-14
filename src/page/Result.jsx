import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import TabRunning from "./components/Bid/TabRunning";
import TabUpcoming from "./components/Bid/TabUpcoming";
import { useDispatch, useSelector } from "react-redux";
import {
  getBidProduct,
  getUpNextProduct,
} from "../Redux/futures/home/actions";
import { currentDate, urlPageResult } from "../helper/const";
import { curStateHome } from "../Redux/selector";
import { setIdCurrentProduct } from "../Redux/futures/rightWeb/actions";
import { urlPageBid } from "../helper/const";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useTranslation } from "react-i18next";
import { getResultProduct } from "../Redux/futures/result/action";

export default function Result() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [upNextProduct, setUpNextProduct] = useState([]);
  const [banner, setBanner] = useState([]);
  const dispatch = useDispatch();
  const selectorHome = useSelector(curStateHome);
  const [dataResult, setDataResult] = useState([]);
console.log(12345);
  const navigate = useNavigate();

  const tabResult = [
    {
      id: urlPageResult.all,
      content: t("result_page.all"),
    },
    {
      id: urlPageResult.the_winner,
      content: t("result_page.the_winner"),
    },
    {
      id: urlPageResult.no_winner,
      content: t("result_page.no_winner"),
    },
  ];

  useEffect(() => {
      dispatch(getResultProduct({}));
    // dispatch(getBidProduct({}));
    // dispatch(getUpNextProduct({}));
  }, []);

  useEffect(() => {
    if (selectorHome?.bidProduct?.length > 0) {
      let currentProduct = selectorHome.bidProduct.filter(
        (product) => new Date(product?.start_time).getTime() < currentDate
      );
      dispatch(setIdCurrentProduct(currentProduct[0]?.cp_id));
      setCurrentProduct(currentProduct);
    } else {
      dispatch(setIdCurrentProduct(null));
      setCurrentProduct([]);
    }
    if (selectorHome?.upNextProduct?.length > 0) {
      let newUpNextProduct = selectorHome.upNextProduct?.sort(
        (a, b) => Date.parse(a?.start_time) - Date.parse(b?.start_time)
      );
      setUpNextProduct(newUpNextProduct);
    } else {
      setUpNextProduct([]);
    }
    if (selectorHome?.banner?.length > 0) {
      let banner = selectorHome.banner?.sort(
        (a, b) => a?.position - b?.position
      );
      setBanner(banner);
    } else {
      setBanner([]);
    }
  }, [selectorHome]);

  const handleChangeTabs = (tabId) => {
    navigate(`${PATH.BID}/${tabId}`);
  };

  const handleTab = useMemo(() => {
    return tabResult.map((tab) => {
      return (
        <div
          key={tab.id}
          onClick={() => handleChangeTabs(tab.id)}
          className={`header-tab ${id === tab.id ? "active-tab" : "tab-hover"}`}
        >
          {tab.content}
        </div>
      );
    });
  }, [id]);

  return (
    <div className="bid-container">
      <div className="header-tab__container">{handleTab}</div>
      {id === urlPageBid.running ? (
        <TabRunning currentProduct={currentProduct} />
      ) : (
        <TabUpcoming upNextProduct={upNextProduct} />
      )}
      <div style={{ height: "20px" }} />
    </div>
  );
}
