import React from "react";

const Tab = ({ tabs, handleChangeTabs, id }) => {
  return tabs.map((tab) => {
    return (
      <div
        key={tab.id}
        onClick={() => handleChangeTabs(tab.id)}
        className={`header-tab ${id === tab.id ? "active-tab" : "tab-hover"}`}
      >
        {tab.content}
      </div>
    );
  });
};

export default Tab;
