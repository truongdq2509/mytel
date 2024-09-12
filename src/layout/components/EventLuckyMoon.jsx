import React from "react";
import { memo, useState, useEffect } from "react";
import iconLuckySpin from "../../assets/images/icon-lucky-spin.svg";
import iconThadingYut from "../../assets/images/icon-thading-yut.svg";
import { useNavigate } from "react-router";
import PATH from "../../config/PATH";
import { ID_EVENT, urlPageHiddenEvents } from "../../helper/const";
import _ from "lodash";
import { useLocation } from "react-router";
import Draggable from "react-draggable";
import { mediaQueryPoint, useMediaQuery } from "../../utils/hooks";

const EventLuckyMoon = () => {
  const [hiddenItems, setHiddenItems] = useState({
    lucky_moon: false,
    lantern: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileMd = useMediaQuery(`(max-width: ${mediaQueryPoint.md}px)`);

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

  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = (event, callBack = () => {}) => {
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    if (distance < 5) {
      callBack();
    }
  };

  if (_.includes(urlPageHiddenEvents, location.pathname)) {
    return null;
  }

  return (
    <Draggable disabled={isMobileMd ? false : true}>
      <div className="icon-router-event-lucky-moon">
        {hiddenItems.lucky_moon ? null : (
          <div
            onClick={() =>
              _onPressEvent(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
            }
            className="icon-router-event-lucky-moon-item icon-router-event-lucky-moon-item-spin"
            onTouchStart={handleTouchStart}
            onTouchEnd={(event) =>
              handleTouchEnd(event, () =>
                _onPressEvent(`${PATH.EVENT}/${ID_EVENT.lucky_moon}`)
              )
            }
          >
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={(e) => handleClose("lucky_moon", e)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(event) =>
                handleTouchEnd(event, handleClose("lucky_moon", event))
              }
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
            onTouchStart={handleTouchStart}
            onTouchEnd={(event) =>
              handleTouchEnd(event, () =>
                _onPressEvent(`${PATH.EVENT}/${ID_EVENT.lantern_collection}`)
              )
            }
          >
            <i
              className="fa fa-times icon-close-event-thading"
              aria-hidden="true"
              onClick={(e) => handleClose("lantern", e)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(event) =>
                handleTouchEnd(event, handleClose("lantern", event))
              }
            />
            <img src={iconThadingYut} alt="" className="router-event-thading" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default memo(EventLuckyMoon);
