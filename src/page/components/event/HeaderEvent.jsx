import React from "react";
import { TAB_EVENT } from "../../../helper/const";
import styled from "styled-components";
import { useNavigate } from "react-router";
import PATH from "../../../config/PATH";

export default function HeaderEvent({ tabActive }) {
  const navigate = useNavigate();
  const handleAction = (url) => {
    navigate(url);
  };
  
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
}

const ContainerHeader = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: calc((100% - 3px) / 4 ) calc((100% - 3px) / 4 ) calc((100% - 3px) / 4 ) calc((100% - 3px) / 4 );
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
`;
