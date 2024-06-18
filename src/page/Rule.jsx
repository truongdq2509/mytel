import React, { useMemo, useState } from "react";
import { urlPageResult } from "../helper/const";
import Tab from "../layout/components/Tab";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

const Rule = () => {
  const [tabActive, setTabActive] = useState(1);
  const [tabActiveDetail, setTabActiveDetail] = useState(3)

  const { t } = useTranslation();
  const tabRule = [
    {
      id: 1,
      content: t("rule_page.rule"),
    },
    {
      id: 2,
      content: t("rule_page.T&C"),
    },
  ];

  const tabDetail = [
    {
      id: 3,
      content: t("rule_page.rules"),
    },
    {
      id: 4,
      content: t("rule_page.how_to _bid"),
    },
    {
      id: 5,
      content: t("rule_page.frequently_asked_questions"),
    },
  ];

  const handleChangeTabs = (tabId) => {
    setTabActive(tabId);
  };

  const handleTab = useMemo(() => {
    return (
      <Tab tabs={tabRule} handleChangeTabs={handleChangeTabs} id={tabActive} />
    );
  }, [tabActive]);

  return (
    <div id="rule-page">
      <div className="bid-container">
        <div className="header-tab__container">{handleTab}</div>
      </div>
      {tabActive === 1 ? (
        <Row offset={4} gutter={4} className="rule-container__tab">
          {tabDetail.map((item) => {
            const isActive = tabActiveDetail === item.id
            return (
              <Col span={7} key={item.id} onClick={() => setTabActiveDetail(item.id)}>
                <div className={`rule-tab__detail ${isActive ? "rule-active" : ""}`}>{item.content}</div>
              </Col>
            );
          })}
        </Row>
      ) : null}
    </div>
  );
};

export default Rule;
