import React from "react";
import moment from "moment";
import Countdown from "react-countdown";
import styled from "styled-components";

const CountdownComponents = ({ targetDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const formatTime = moment(targetDate).format("DD-MM-YYYY");
    const formatValue = (value) => {
      return value < 10 ? "0" + value : value;
    };

    if (completed) {
      return (
        <div className="count-down__date">
          <span className="count-down__date">{formatTime}</span>
          <span className="count-down__minutes">00:00:00</span>
        </div>
      );
    } else {
      const formattedTime = moment
        .utc(targetDate - Date.now())
        .format("DD-MM-YYYY HH:mm:ss");
      return (
        <div className="container__coundown">
          <span className="count-down__date">{formatTime}</span>
          <span className="count-down__minutes">
            {formatValue(+days)}:{formatValue(+hours)}:{formatValue(+minutes)}:
            {formatValue(+seconds)}
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

  @media screen and (max-width: 1450px) and (min-width: 992px){
    .count-down__minutes {
   
    display: block;
  }
  }
`;

export default CountdownComponents;
