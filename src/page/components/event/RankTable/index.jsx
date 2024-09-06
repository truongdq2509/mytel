import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRankTable } from "../../../../Redux/futures/event/action";
import BgEvent from "../../../../assets/images/Group 75.svg";
import styled from "styled-components";
import HeaderEvent from "../HeaderEvent";

const ID_RANK = {
  myRank: 1,
  user: 0,
};
export default function RankTable({ tabActive }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);

  useEffect(() => {
    dispatch(getRankTable({ my_rank: ID_RANK.user, page, limit: 2 }));
  }, []);

  return (
    <Div>
      <div className="position-relative">
        <img src={BgEvent} alt="bg-event" className="bg-event" />
        <div className="event-body">
          <div className="envent-main-body">
            <HeaderEvent tabActive={tabActive} />
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(8, 19, 74, 0.1);

  .bg-event {
    min-height: 1079px;
  }

  .event-body {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .envent-main-body {
    position: relative;
    height: 100%;
  }
`;
