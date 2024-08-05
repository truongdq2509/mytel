import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import TabRunning from "./components/Bid/TabRunning";
import TabUpcoming from "./components/Bid/TabUpcoming";
import { useDispatch, useSelector } from "react-redux";
import {
  getBannerHome,
  getBidProduct,
  getUpNextProduct,
} from "../Redux/futures/home/actions";
import { currentDate } from "../helper/const";
import { curStateAccount, curStateHome } from "../Redux/selector";
import { setIdCurrentProduct } from "../Redux/futures/rightWeb/actions";
import { urlPageBid } from "../helper/const";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useTranslation } from "react-i18next";
import ModalLogin from "../component/ModalLogin";
import PackagePage from "./PackagePage";
import styled from "styled-components";

export default function BidPage() {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [upNextProduct, setUpNextProduct] = useState([]);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const dispatch = useDispatch();
  const selectorHome = useSelector(curStateHome);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const selectorAccount = useSelector(curStateAccount);

  let tabBid = [
    {
      id: urlPageBid.running,
      content: t("bid_page.running"),
    },
    {
      id: urlPageBid.upcoming,
      content: t("bid_page.upcoming"),
    },
    {
      id: urlPageBid.purchasing,
      content: t("account_page.package.package")
    }
  ];

  if(selectorAccount.userInfo){

  }

  useEffect(() => {
    dispatch(getBidProduct({}));
    dispatch(getUpNextProduct({}));
    dispatch(getBannerHome({}));
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
  }, [selectorHome]);

  const handleChangeTabs = (tabId) => {
    if(!selectorAccount.userInfo && tabId === urlPageBid.purchasing){
      return setOpenModalLogin(true)
    }
    navigate(`${PATH.BID}/${tabId}`);
  };

  const handleTab = useMemo(() => {
    return tabBid.map((tab) => {
      return (
        <div
          key={tab.id}
          onClick={() => handleChangeTabs(tab.id)}
          className={`header-tab header-tab__bid ${
            id === tab.id ? "active-tab" : "tab-hover"
          }`}
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
        <TabRunning
          currentProduct={currentProduct || []}
          setOpenModalLogin={setOpenModalLogin}
        />
      ) : id === urlPageBid.purchasing ? (
        <Container>
          <PackagePage isPageBid/>
        </Container>
      ) : (
        <TabUpcoming upNextProduct={upNextProduct} />
      )}
      <div className="mobile_pb__20" />
      <ModalLogin open={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
    </div>
  );
}

const Container = styled.div`
  .container-child-account-header, .ant-select-item-option-content{
    display: none;
  }

  .select-package{
    .ant-select-selection-item, .option-package{
      font-size: 12px !important;
    }
  }

  @media(max-width: 768px){
    .page-bid-action{
      display: block !important;
    }

    .box-package-tab{
      display: none;
    }

    .container-child-account{
      background-color: inherit !important;
    }

    .box-item-package {
      box-shadow: 0px 4px 5px 0px #08134A1A;
      border: 0px !important;
      background: #FFFFFF;

    }
  }
`