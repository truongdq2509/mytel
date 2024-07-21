import React from "react";
import moment from "moment";
import Countdown from "react-countdown";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CountdownComponents = ({
  targetDate,
  isTabRunning,
  isTabUpcoming,
  isResult,
}) => {
  const { t } = useTranslation();
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const formatTime = moment(targetDate).format("DD-MM-YYYY");
    const formatHouse = moment(targetDate).format("HH:mm:ss");
    const formatValue = (value) => {
      return value < 10 ? "0" + value : value;
    };

    if (completed) {
      return (
        <div className="count-down__date">
          <span className="count-down__date">{formatTime}</span>
          <span className="count-down__minutes">
            {isResult ? "" : "00:00:00"}
          </span>
        </div>
      );
    } else {
      let textDay = t("home_page.day").toUpperCase();
      if (days > 1) {
        textDay = t("home_page.days").toUpperCase();
      }

      return (
        <div
          className={`container__coundown ${
            days > 1 ? "coundown_green" : "coundown_red"
          }`}
        >
          {isTabRunning ? (
            <></>
          ) : (
            <span className="count-down__date  count-down__date-upcoming">
              {formatTime}
            </span>
          )}
          <span
            className={`${isTabUpcoming ? "" : "count-down__minutes"}  ${
              isTabRunning ? "d-flex__countDown" : ""
            } `}
          >
            {isTabRunning ? (
              <>
                {days ? formatValue(+days) : null} {days ? textDay : null}{" "}
                {formatValue(+hours)}:{formatValue(+minutes)}:
                {formatValue(+seconds)}
              </>
            ) : (
              <>
                {isTabUpcoming ? (
                  <></>
                ) : (
                  <>
                    {formatValue(+days)}:{formatValue(+hours)}:
                    {formatValue(+minutes)}:{formatValue(+seconds)}
                  </>
                )}
              </>
            )}
          </span>
        </div>
      );
    }
  };

  return (
    <Container>
      <Countdown
        date={Date.now() + (targetDate - Date.now())}
        renderer={renderer}
      />
    </Container>
  );
};

const Container = styled.div`
  .count-down__date,
  .count-down__minutes {
    font-size: 25px;
    color: #000000;
    line-height: 30px;
    font-weight: 500;
  }

  .count-down__minutes {
    color: #f41515;
    padding-left: 24px;
    width: 165px;
    display: inline-block;
  }

  .d-flex__countDown {
    display: flex;
    width: max-content;
    padding-left: 0px;
  }

  .coundown_green .count-down__minutes {
    color: #2ba001;
  }

  @media screen and (max-width: 1450px) and (min-width: 992px) {
    .count-down__minutes {
      display: block;
    }
  }
`;

export default CountdownComponents;
