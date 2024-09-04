
const API_BASE_PATH = process.env.REACT_APP_DOMAIN_API
const API_ADMIN_PATH = `${API_BASE_PATH}front/`;

const API_PATH = {
	login: `${API_ADMIN_PATH}login/account`,
	loginWithSMS: `${API_ADMIN_PATH}login/account-with-sms`,
	logout: `${API_ADMIN_PATH}user/logout`,
	register: `${API_ADMIN_PATH}register/account`,
	verify: `${API_ADMIN_PATH}verify/account`,
	verifyChangePass: `${API_ADMIN_PATH}verify/account-change-pass`,
	getOTP: `${API_ADMIN_PATH}otp/account`,
	requestOtpPackage: `${API_ADMIN_PATH}otp/request-otp-package`,
	verifyOtpPackage: `${API_ADMIN_PATH}otp/verify-otp-package`,
	registerMytelPack: `${API_ADMIN_PATH}user/register-pack`,
	getUser: `${API_ADMIN_PATH}user/current`,
	getBidHistory: `${API_ADMIN_PATH}user/bid-history`,
	getPackageList: `${API_ADMIN_PATH}user/list-package`,
	getRemainTurn: `${API_ADMIN_PATH}user/remain-turn`,
	updatePassword: `${API_ADMIN_PATH}user/update-password`,
	updateInformation: `${API_ADMIN_PATH}user/update-information`,
	viewInfoWinner: `${API_ADMIN_PATH}user/view-info-winner`,

	bidProduct: `${API_ADMIN_PATH}product/bid`,
	upNextProduct: `${API_ADMIN_PATH}product/up-next`,
	finishedProduct: `${API_ADMIN_PATH}product/finished`,
	resultsProduct: `${API_ADMIN_PATH}product/results`,
	viewPotentialWinner: `${API_ADMIN_PATH}product/view-potential-winner`,
	bestSeller: `${API_ADMIN_PATH}product/best-seller`,
	banner: `${API_ADMIN_PATH}product/banner`,

	bid: `${API_ADMIN_PATH}bid`,
	bidHistory: `${API_ADMIN_PATH}bid/history`,
	bidHistoryAll: `${API_ADMIN_PATH}bid/history-all`,
	packs: `${API_ADMIN_PATH}bid/packs`,
	registerPack: `${API_ADMIN_PATH}bid/register`,

	upload: `${API_BASE_PATH}upload`,

	getGameInfo: `${API_ADMIN_PATH}game/lucky-spin/info`,
	getMonthWinner: `${API_ADMIN_PATH}product/month-winner`,
}


export default API_PATH