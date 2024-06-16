export { currentDate, TYPE_LOGIN }

const currentDate = new Date().getTime()

const TYPE_LOGIN = {
    loginPassword: 1,
    loginOtp: 2
}

export const urlPageBid = {
    running: "running",
    upcoming: "upcoming"
}

export const urlPageResult = {
    all: "all",
    the_winner: "the-winner",
    no_winner: "no-winer"
}