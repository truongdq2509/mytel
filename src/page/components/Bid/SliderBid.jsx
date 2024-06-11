import { Carousel } from "antd";
import React from "react";
import styled from "styled-components";

const SliderBid = ({ listImageProduct = [] }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Container>
      <Carousel
        afterChange={onChange}
        dotPosition={5000}
        autoplaySpeed={5000}
        autoplay={true}
        infinite={true}
      >
        {listImageProduct.map((img, index) => {
          return (
            <div className="text-center abc" key={`slider_${index}`}>
              <img src={img} alt="" className="img-gift" />
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  .img-gift {
    border-radius: 28px;
    width: 592px;
  }
  .ant-carousel .slick-dots li button,
  .ant-carousel .slick-dots li {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }

  .ant-carousel .slick-dots .slick-active button,
  .ant-carousel .slick-dots .slick-active {
    height: 9px;
    width: 29px;
    border-radius: 4.5px;
    background-color: #afafaf;
  }

  ul.slick-dots {
    bottom: -15px !important;
  }

  .detail-body__bid {
    padding: 15px 45px;
    padding-bottom: 45px;
    background-color: white;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-content {
    padding: 0;
    border-radius: 15px 15px 15px 15px;
    overflow: hidden;
  }

  .ant-modal-close {
    top: 0;
    right: 0;

    svg {
      color: white;
    }
  }

  .detail-bid {
    height: 78px;
    background-color: #f97a1c;
    line-height: 36.31px;
    font-size: 30px;
    font-weight: 600;
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

export default SliderBid;
