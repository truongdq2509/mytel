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
