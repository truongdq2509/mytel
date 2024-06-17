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

export default function Result() {
  const { t } = useTranslation();
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
    if (idResult) {
      dispatch(getResultDetailProduct({}, idResult));
    }
  }, [idResult]);

  const handleChangeTabs = (tabId) => {
    navigate(`${PATH.RESULT}/${tabId}`);
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
      <ResultComponent
        currentProduct={formatDataResult || []}
        dataDetailResult={selectorDetailResult || null}
        idTab={id}
        idResult={idResult}
      />
      <div style={{ height: "20px" }} />
    </div>
  );
}
