import React from "react";
import { memo, useState, useEffect } from "react";
import iconLuckySpin from "../../assets/images/icon-lucky-spin.svg";
import iconThadingYut from "../../assets/images/icon-thading-yut.svg";
import { useNavigate } from "react-router";
import PATH from "../../config/PATH";
import { ID_EVENT, urlPageHiddenEvents } from "../../helper/const";
import _ from "lodash";
import { useLocation } from "react-router";
import Draggable from 'react-draggable';

const EventLuckyMoon = () => {
  const [hiddenItems, setHiddenItems] = useState({
    lucky_moon: false,
    lantern: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setHiddenItems({
      lucky_moon: false,
      lantern: false,
    });
  }, [location.pathname]);

  const _onPressEvent = (url) => {
    navigate(url);
  };

  const handleClose = (id, e) => {
    e.stopPropagation();
    const newData = { ...hiddenItems };
    newData[id] = true;
    setHiddenItems(newData);
  };

  if (_.includes(urlPageHiddenEvents, location.pathname)) {
    return null;
  }

  return (
    <Draggable>
      <div className="icon-router-event-lucky-moon">
        {hiddenItems.lucky_moon ? null : (
          <div
            onClick={() =>
              _onPressEvent(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
            }
            className="icon-router-event-lucky-moon-item icon-router-event-lucky-moon-item-spin"
          >
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={(e) => handleClose("lucky_moon", e)}
            />
            <img
              src={iconLuckySpin}
              alt=""
              className="router-event-lucky-spin"
            />
          </div>
        )}
        {hiddenItems.lantern ? null : (
          <div
            onClick={() =>
              _onPressEvent(`${PATH.EVENT}/${ID_EVENT.lantern_collection}`)
            }
            className="icon-router-event-lucky-moon-item icon-router-event-lucky-moon-item-thading"
          >
            <i
              className="fa fa-times icon-close-event-thading"
              aria-hidden="true"
              onClick={(e) => handleClose("lantern", e)}
            />
            <img src={iconThadingYut} alt="" className="router-event-thading" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default memo(EventLuckyMoon);
