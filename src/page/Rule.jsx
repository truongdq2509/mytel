import React, { useMemo, useState } from "react";
import { urlPageResult } from "../helper/const";
import Tab from "../layout/components/Tab";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import TablePrice from "./components/Rule/TablePrice";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Rule = () => {
  const [tabActive, setTabActive] = useState(1);
  const [tabActiveDetail, setTabActiveDetail] = useState(3);
  const panelStyle = {
    // marginBottom: 24,
    background: "white",
    border: "none",
    fontSize: "16px",
  };
  const getItems = (panelStyle) => [
    {
      key: "t&c1",
      label: t("rule_page.body_T&C.introduction.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.introduction.content"), "introduction.title__3tc")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c2",
      label: t("rule_page.body_T&C.participant.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.participant.content"), "participant.tit2le__tc")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c3",
      label: t("rule_page.body_T&C.description_service.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.description_service.content"), "description_se4rvice.title__tc")}</p>,
      style: panelStyle,
    },

    {
      key: "t&c4",
      label: t("rule_page.body_T&C.instructions_auction.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.instructions_auction.content"), "instructions_a2uction.title__tc")}</p>,
      style: panelStyle,
    },

    {
      key: "t&c5",
      label: t("rule_page.body_T&C.rates.title"),
      children: <p><div><TablePrice isShowTitle/></div>{handGetContent(t("rule_page.body_T&C.rates.content"), "instructions_auction.rates1")}</p>,
      style: panelStyle,
    },

    {
      key: "t&c6",
      label: t("rule_page.body_T&C.bid_winner.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.bid_winner.content"), "instructions_auction.bid_winnerrate2s")}</p>,
      style: panelStyle,
    },
    // 


    {
      key: "t&c7",
      label: t("rule_page.body_T&C.prize_award.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.prize_award.content"), "instructions_auction.prize_awardrate2s")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c8",
      label: t("rule_page.body_T&C.important_point.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.important_point.content"), "instructions_auction.important_pointrate2s")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c9",
      label: t("rule_page.body_T&C.privacy_data.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.privacy_data.content"), "instructions_auction.privacy_datarate2s")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c10",
      label: t("rule_page.body_T&C.personal_rights.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.personal_rights.content"), "instructions_auction.personal_rightsrate2s")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c11",
      label: t("rule_page.body_T&C.exemption_auctions.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.exemption_auctions.content"), "instructions_auction.exemption_auctionsrate2s")}</p>,
      style: panelStyle,
    },
    {
      key: "t&c12",
      label: t("rule_page.body_T&C.law_professionalism.title"),
      children: <p>{handGetContent(t("rule_page.body_T&C.law_professionalism.content"), "instructions_auction.law_professionalismrate2s")}</p>,
      style: panelStyle,
    },
  ];

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

  const handleGetDataBody = (data = "") => {
    return data.split("/&n");
  };

  const handGetContent = (data = "", key) => {
    const dataFomat = handleGetDataBody(data);
    return (
      <>
        {dataFomat.map((content = "", index) => {
          return (
            <div
              key={`${key}_${index}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          );
        })}
      </>
    );
  };

  const getDataTabRules = () => {
    const dataBody = handleGetDataBody(t("rule_page.body_rules.content_rules"));
    const dataNew = dataBody.slice("abcd1234")
    console.log("dataNew", dataNew);
    return (
      <>
        <div className="body-title">
          {t("rule_page.body_rules.content_rules_title")}
        </div>
        <div className="body-title__condition">
          {t("rule_page.body_rules.content_rules_conditions")}
        </div>
        <div className="body-content">
          {dataBody.map((content = "", index) => {
            return (
              <div key={`getDataTabRules${index}`} className="content-detail" dangerouslySetInnerHTML={{ __html: content }}>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const getDataHowtoBid = () => {
    const contentIntrol = handleGetDataBody(
      t("rule_page.body_how_to_bid.content_instruc")
    );
    const contentTit = handleGetDataBody(
      t("rule_page.body_how_to_bid.content_tips")
    );

    return (
      <>
        <div className="body-title">
          {t("rule_page.body_how_to_bid.content_bid_how_to_bid")}
        </div>
        <div className="body-introl body-introl__how-bid">
          {t("rule_page.body_how_to_bid.content_bid_instruc")}
        </div>
        <div className="content-introl">
          {contentIntrol.map((content = "", index) => {
            return (
              <div
                className="content-detail how-bid__content"
                key={`contentIntrol${index}`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          })}
        </div>

        {/* <div className="body-introl body-introl__how-bid">
          {t("rule_page.body_how_to_bid.content_bid_tips")}
        </div>
        <div className="content-introl">
          {contentTit.map((content = "", index) => {
            return (
              <div
                className="content-detail how-bid__content"
                key={`contentTit${index}`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          })}
        </div> */}
      </>
    );
  };

  const getDataFAQ = () => {
    const getItemsFAQ = (panelStyle) => [
      {
        key: "1",
        label: t("rule_page.body_FQA.what_aution.title"),
        children: (
          <p>
            {handGetContent(
              t("rule_page.body_FQA.what_aution.content"),
              "what_aution_title"
            )}
          </p>
        ),
        style: panelStyle,
      },
      {
        key: "2",
        label: t("rule_page.body_FQA.how_register.title"),
        children: (
          <p>
            {handGetContent(
              t("rule_page.body_FQA.how_register.content"),
              "how_register.title"
            )}
          </p>
        ),
        style: panelStyle,
      },
      {
        key: "3",
        label: t("rule_page.body_FQA.what_price.title"),
        children: (
          <p>
            <TablePrice />
            <div style={{paddingTop: "20px"}}>ဤ အထက်ပါတန်ဖိုးများကို သုံးစွဲသူ၏ အခြေခံလက်ကျန် ဖုန်းငွေ မှ နုတ်ယူမည်ဖြစ်သည်။</div>
          </p>
        ),
        style: panelStyle,
      },
      {
        key: "4",
        label: t("rule_page.body_FQA.how_play.title"),
        children: <p>{t("rule_page.body_FQA.how_play.content")}</p>,
        style: panelStyle,
      },
      {
        key: "5",
        label: t("rule_page.body_FQA.what_prize.title"),
        children: <p>{t("rule_page.body_FQA.what_prize.content")}</p>,
        style: panelStyle,
      },
      {
        key: "6",
        label: t("rule_page.body_FQA.how_won.title"),
        children: <p>{t("rule_page.body_FQA.how_won.content")}</p>,
        style: panelStyle,
      },
      {
        key: "7",
        label: t("rule_page.body_FQA.if_prize.title"),
        children: <p>{t("rule_page.body_FQA.if_prize.content")}</p>,
        style: panelStyle,
      },
    ];

    return (
      <div className="container-faq">
        <div className="body-title body-title__faq">FAQ</div>
        <Collapse
          bordered={false}
          defaultActiveKey={[""]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={
            {
              // background: token.colorBgContainer,
            }
          }
          items={getItemsFAQ(panelStyle)}
        />
      </div>
    );
  };

  return (
    <div id="rule-page">
      <div className="bid-container">
        <div className="header-tab__container">{handleTab}</div>
      </div>
      {tabActive === 1 ? (
        <Row offset={4} gutter={4} className="rule-container__tab">
          {tabDetail.map((item, index) => {
            const isActive = tabActiveDetail === item.id;
            console.log(item);
            return (
              <Col
                // span={7}
                xl={7}
                lg={8}
                md={8}
                sm={item.id === 3 ? 5 : item.id === 4 ? 5 : 14}
                xs={item.id === 3 ? 5 : item.id === 4 ? 5 : 14}
                key={item.id}
                onClick={() => setTabActiveDetail(item.id)}
              >
                <div
                  className={`rule-tab__detail ${
                    isActive ? "rule-active" : ""
                  }`}
                >
                  {item.content}
                </div>
              </Col>
            );
          })}
          <Col span={24}>
            <div className="rule-body">
              {tabActiveDetail === 3
                ? getDataTabRules()
                : tabActiveDetail === 4
                ? getDataHowtoBid()
                : getDataFAQ()}
            </div>
          </Col>
        </Row>
      ) : (
        <div className="tc_container">
          <Collapse
            bordered={false}
            defaultActiveKey={[""]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            items={getItems(panelStyle)}
          />
        </div>
      )}
    </div>
  );
};

export default Rule;
