import React from "react";
import styled from "styled-components";
import BgEvent from "../../../../assets/images/Group 75.svg";
import HeaderEvent from "../HeaderEvent";

export default function Instruction({ tabActive }) {
  return (
    <Div>
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" className="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <HeaderEvent tabActive={tabActive} />
            <div className="instruction-main">
              <div className="instruction-container">
                <div className="instruction-title">Thadingyut festival</div>
                <div>Thời gian diễn ra: 01 tháng 10 - 04 tháng 11</div>
                <div>Giải thưởng:</div>
                <div>
                  Thadingyut Prizes: 3 giải thưởng đặc biệt cho 3 người chơi
                  xuất sắc nhất, bao gồm:
                </div>
                <div>Giải nhất: 1,500,000 MMK</div>
                <div>Giải nhì: Infinix Note 30 Pro (8/256GB)</div>
                <div>Giải ba: Infinix Smart 8 (3/64GB)</div>
                <div>Luckymoon Prizes:</div>
                <div>5 giải: 200,000 MMK</div>
                <div>Thể lệ:</div>
                <div>
                  Với cuộc đua thắp đèn lồng Thadingyut, Người chơi sẽ phải cạnh
                  tranh để xem ai thu thập được nhiều lồng đèn bay nhất. 3 người
                  chơi xuất sắc nhất sẽ nhận lần lượt 3 giải thưởng đã được đề
                  cập ở trên. Người chiến thắng sẽ được xác định sau 23:59:59
                  vào ngày 04 tháng 11 năm 2024. Trong trường hợp người dùng
                  tích lũy cùng một số lượng lồng đèn bay, thứ hạng sẽ được tính
                  dựa trên thời gian có được số lồng đèn đó. Trong trường hợp
                  con số này tiếp tục bằng nhau, thứ hạng sẽ được sếp dựa trên
                  số lồng đèn chưa được thắp sáng. Với vòng quay Luckymoon,
                  chúng tôi có 5 giải đặc biệt 200,000 MMK trên vòng quay may
                  mắn. Mỗi người chơi sẽ tự động có 3 lượt quay free mỗi ngày.
                  Người chiến thắng sẽ được xác định ngay khi quay trúng giải
                  thưởng. Khi 5 giải thưởng trị giá 200,000 MMK đã được trao
                  hết, chúng tôi sẽ thông báo rằng giải thưởng đã hết.
                </div>
                <div>
                  Sau khi kết thúc, hệ thống sẽ tự cập nhật và chốt lại 8 người
                  chiến thắng và sau đó Mytel sẽ liên lạc với người chiến thắng
                  để tiến hành việc trao thưởng theo quy định thông thường.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  ::-webkit-scrollbar {
    width: 0px !important;
  }
  .instruction-main {
    padding: 5%;
    width: 100%;
    height: calc(1079px - 60.5px);

    .instruction-container {
      border: 1px solid rgba(254, 253, 4, 1);
      width: 100%;
      height: 100%;
      background-color: rgba(51, 0, 0, 0.7);
      color: white;
      font-size: 20px;
      font-weight: 300;
      padding: 40px 50px;
      border-radius: 16px;
      overflow-y: auto;
    }
  }

  .instruction-container div {
    line-height: 38px;
    font-weight: 400;
  }

  .instruction-container .instruction-title {
    padding-bottom: 40px;
    line-height: 1;
  }

  position: relative;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 1); */
  border-radius: 12px;
  /* box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1); */

  .bg-event {
    /* min-height: 1079px; */
    position: absolute;
  }

  .event-body {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .envent-main-body {
    position: relative;
    height: 100%;
  }

  @media (max-width: 1600px) {
    .bg-event {
      height: 100%;
      object-fit: cover;
      border-radius: 0 0 12px 12px;
    }

    .position-relative {
      height: 100%;
    }

    .instruction-main {
      height: calc(100% - 60.5px);
    }
  }

  @media (max-width: 1400px) {
    .instruction-main .instruction-container {
      font-size: 16px;
    }
  }

  @media (max-width: 1200px) {
    .instruction-main {
      padding: 3%;
      height: auto;

      .instruction-container {
        padding: 25px 30px;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    margin-top: 12px;
    .event-body {
      margin-bottom: 300px;
    }
    .instruction-main .instruction-container{
      font-size: 14px;
    }

    .instruction-container div{
      line-height: 30px;
    }
  }

  @media (max-width: 768px) {
    .instruction-main .instruction-container {
      padding: 15px 15px;
      font-size: 14px;
    }

    .instruction-container .instruction-title {
      padding-bottom: 10px;
    }
  }

`;
