import React, { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urlPageResult } from "../helper/const";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useTranslation } from "react-i18next";
import {
  getResultDetailProduct,
  getResultProduct,
} from "../Redux/futures/result/action";
import ResultComponent from "./components/Result/ResultComponent";
import _ from "lodash";
import { curStateResult } from "../Redux/selector";
import Tab from "../layout/components/Tab";

export default function Result() {
  const { t } = useTranslation();
  // a
  const { id, idResult = null } = useParams();

  const dispatch = useDispatch();
  const selectorResult = useSelector(curStateResult).data;
  const selectorDetailResult = useSelector(curStateResult).detail;

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
  }, []);

  useEffect(() => {
    // if (idResult) {
    //   dispatch(getResultDetailProduct({}, idResult));
    // }
  }, [idResult]);

  const handleChangeTabs = (tabId) => {
    navigate(`${PATH.RESULT}/${tabId}`);
  };

  const handleTab = useMemo(() => {
    return <Tab tabs={tabResult} handleChangeTabs={handleChangeTabs} id={id} />;
  }, [id]);

  const formatDataResult = useMemo(() => {
    if (id === urlPageResult.all) {
      return selectorResult || [];
    }

    if (id === urlPageResult.the_winner) {
      return selectorResult.filter((item) => +item.status !== 5);
    }

    if (id === urlPageResult.no_winner) {
      return selectorResult.filter((item) => +item.status === 5);
    }
  }, [id, selectorResult]);

  return (
    <div className="bid-container" id="page-result">
      {!idResult ? (
        <div className="header-tab__container">{handleTab}</div>
      ) : null}
      {!_.isEmpty(formatDataResult) ? (
        <ResultComponent
          currentProduct={formatDataResult || []}
          // dataDetailResult={selectorDetailResult || null}
          idTab={id}
          // idResult={idResult}
        />
      ) : (
        <div className="d-flex bg-white no-data">
          <div className="content-no-data">
            <div>{t("result_page.No data available")}</div>
            <div>{t("result_page.All previous auctions have had winners")}</div>
          </div>
        </div>
      )}
      <div style={{ height: "20px" }} />
    </div>
  );
}
