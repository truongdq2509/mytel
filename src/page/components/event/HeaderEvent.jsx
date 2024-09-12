import React, { memo } from "react";
import { TAB_EVENT } from "../../../helper/const";
import styled from "styled-components";
import { useNavigate } from "react-router";
import PATH from "../../../config/PATH";
import { mediaQueryPoint, useMediaQuery } from "../../../utils/hooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderEvent = ({ tabActive }) => {
  const navigate = useNavigate();
  const handleAction = (url) => {
    navigate(url);
  };
  const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.sm}px)`);
  const isMobileXs = useMediaQuery(`(max-width: ${mediaQueryPoint.xs}px)`);

  let initialSlide = 0;
  TAB_EVENT.forEach((item, index) => {
    if (item.id === tabActive) {
      initialSlide = index;
    }
  });

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobileXs ? 1 : 2,
    slidesToScroll: isMobileXs ? 1 : 2,
    centerMode: true,
    dots: false,
    initialSlide,
    arrows: true,
  };

  if (isMobile) {
    return (
      <MobileHeader style={{ color: "white" }}>
        <Slider {...settings}>
          {TAB_EVENT.map((item) => {
            return (
              <div
                key={item.id}
                className={`event-item-header ${
                  tabActive === item.id
                    ? "event-item-active"
                    : "hover-item-head"
                }`}
                onClick={() => handleAction(`${PATH.EVENT}/${item.id}`)}
              >
                {item.title}
              </div>
            );
          })}
        </Slider>
      </MobileHeader>
    );
  }

  return (
    <ContainerHeader>
      {TAB_EVENT.map((item) => {
        return (
          <div
            key={item.id}
            className={`event-item-header ${
              tabActive === item.id ? "event-item-active" : "hover-item-head"
            }`}
            onClick={() => handleAction(`${PATH.EVENT}/${item.id}`)}
          >
            {item.title}
          </div>
        );
      })}
    </ContainerHeader>
  );
};

const MobileHeader = styled.div`
  color: white;
  position: relative;
  z-index: 9;
  background-color: white;
  .event-item-header {
    text-align: center;
    background: rgba(217, 217, 217, 1);
    color: rgba(249, 122, 29, 1);
    font-size: 12px;
    line-height: 30.52px;
    padding: 8px 0;
    text-transform: uppercase;
    font-weight: 500;
    width: calc(100% - 6px) !important;
  }

  .event-item-active {
    background-color: rgba(249, 122, 29, 1);
    color: rgba(255, 255, 255, 1);
  }

  .slick-next {
    right: 5px;
    z-index: 10;
  }

  .slick-prev {
    left: 5px;
    z-index: 10;
  }

  @media (max-width: 500px){
    .event-item-header {
      font-size: 11px;
    }
  }

  @media (max-width: 400px) {
    .event-item-header {
      font-size: 13px;
    }
  }
`;

const ContainerHeader = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns:
    calc((100% - 3px) / 4) calc((100% - 3px) / 4) calc((100% - 3px) / 4)
    calc((100% - 3px) / 4);
  gap: 1px;

  .event-item-header {
    text-align: center;
    background: rgba(217, 217, 217, 1);
    color: rgba(249, 122, 29, 1);
    font-size: 20px;
    line-height: 30.52px;
    padding: 15px 0;
    text-transform: uppercase;
    font-weight: 500;
  }

  .event-item-active {
    background-color: rgba(249, 122, 29, 1);
    color: rgba(255, 255, 255, 1);
  }

  @media (max-width: 1400px) {
    .event-item-header {
      font-size: 14px;
    }
  }

  @media screen and (min-width: 576px) and (max-width: 670px) {
    .event-item-header {
      font-size: 12px;
    }
  }

  @media (max-width: 576px) {
    display: flex;
    overflow-y: auto;

    &::-webkit-scrollbar {
      height: 0px !important;
    }

    .event-item-header {
      min-width: 220px;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
    }
  }
`;

export default memo(HeaderEvent);
