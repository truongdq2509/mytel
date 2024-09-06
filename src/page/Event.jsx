import React, { useEffect } from "react";
import LanternCollection from "./components/event/LanternCollection";
import LuckyMoon from "./components/event/LuckyMoon";
import { useDispatch, useSelector } from "react-redux";
import { getConfigEvent } from "../Redux/futures/event/action";
import { useParams } from "react-router";
import { ID_EVENT } from "../helper/const";
import RankTable from "./components/event/RankTable";
import Instruction from "./components/event/Instruction";
import { curStateEvent } from "../Redux/selector";
import _ from "lodash";

const idActiveEvent = [1, 0];
export default function Event() {
  const dispatch = useDispatch();
  const data = useSelector(curStateEvent) || {};
  const { id } = useParams();

  useEffect(() => {
    dispatch(getConfigEvent());
  }, []);

  if (_.includes(idActiveEvent, data?.configEventLuckyMoon?.is_show)) {
    switch (id) {
      case ID_EVENT.lantern_collection:
        return <LanternCollection tabActive={id} />;
      case ID_EVENT.lucky_moon:
        return <LuckyMoon tabActive={id} />;
      case ID_EVENT.rank_table:
        return <RankTable tabActive={id} />;
      case ID_EVENT.instruction:
        return <Instruction tabActive={id} />;
      default:
        break;
    }
  }
}
