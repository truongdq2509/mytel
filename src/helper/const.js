import PATH from "../config/PATH";

export { currentDate, TYPE_LOGIN };

const currentDate = new Date().getTime();

const TYPE_LOGIN = {
  loginPassword: 1,
  loginOtp: 2,
};

export const urlPageBid = {
  running: "running",
  upcoming: "upcoming",
  purchasing: "purchasing",
};

export const urlPageResult = {
  all: "previous-winners",
  the_winner: "my-win",
  no_winner: "no-winer",
};

export const ID_EVENT = {
  lantern_collection: "lantern-collection",
  lucky_moon: "lucky-moon",
  rank_table: "rank-table",
  instruction: "instruction",
};

export const TAB_EVENT = [
  {
    title: "lantern collection",
    id: ID_EVENT.lantern_collection,
  },
  {
    title: "lucky moon",
    id: ID_EVENT.lucky_moon,
  },
  {
    title: "rank table",
    id: ID_EVENT.rank_table,
  },
  {
    title: "instruction",
    id: ID_EVENT.instruction,
  },
];

export const urlPageHiddenEvents = [
  `${PATH.EVENT}/${ID_EVENT.lucky_moon}`,
  `${PATH.EVENT}/${ID_EVENT.lantern_collection}`,
  `${PATH.EVENT}/${ID_EVENT.instruction}`,
  `${PATH.EVENT}/${ID_EVENT.rank_table}`,
];

export const totalTableRankLimit = 10;

export const STATUS_ACTIVE_EVENT_LUCKY_MOON = 1