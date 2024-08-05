import React, { useEffect, useState } from "react";
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
import { curStateAccount, curStateResult } from "../Redux/selector";
import Tab from "../layout/components/Tab";
import errorImage from "../assets/images/Ellipse 20.svg";
import ModalLogin from "../component/ModalLogin";

export default function Result() {
  const { t } = useTranslation();
  const { id, idResult = null } = useParams();

  const dispatch = useDispatch();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const selectorResult = useSelector(curStateResult).data;
  const selectorDetailResult = useSelector(curStateResult).detail;
  const { userInfo } = useSelector(curStateAccount) || {};
console.log("userInfo", userInfo);
  const navigate = useNavigate();

  const tabResult = [
    {
      id: urlPageResult.all,
      content: t("result_page.Previous Winners"),
    },
    {
      id: urlPageResult.the_winner,
      content: t("result_page.My Win"),
    },
    // {
    //   id: urlPageResult.no_winner,
    //   content: t("result_page.no_winner"),
    // },
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
    if (tabId === urlPageResult.the_winner && !userInfo) {
    return  setOpenModalLogin(true);
    }
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
      const userId = userInfo?.id;
      const data = selectorResult.filter((item = {}) => {
        if (+item.status !== 5 && +item.id === +userId) {
          return item;
        }
      });
      return data;
    }

    if (id === urlPageResult.no_winner) {
      return selectorResult.filter((item) => +item.status === 5);
    }
  }, [id, selectorResult, userInfo]);

  return (
    <div className="bid-container" id="page-result">
      {!idResult ? (
        <div className="header-tab__container header-result">{handleTab}</div>
      ) : null}

      {id === urlPageResult.the_winner && _.isEmpty(formatDataResult) ? (
        <div className="d-flex bg-white no-data position-relative">
          <div className="content-no-data content-no-data__mywin">
            <div>
              <img src={errorImage} alt="" />
            </div>
            <div className="content-error__mywin">
              {t("result_page.You still have not won any auction yet.")}
            </div>
            <div>
              {t(
                "result_page.Let’s bid more to get more winning chance, many attractive awards are watiing you!"
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
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
                <div>
                  {t("result_page.All previous auctions have had winners")}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ModalLogin open={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
      <div style={{ height: "20px" }} />
    </div>
  );
}
