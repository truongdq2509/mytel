import LayoutApp from '../layout/LayoutApp';
import HomePage from '../page/HomePage';
import PATH from './PATH';
import BidPage from '../page/BidPage';
import Result from '../page/Result';
import Rule from '../page/Rule';
import LoginMobile from '../page/LoginMobile';
import AccountPage from '../page/AccountPage';
import PackagePage from '../page/PackagePage';
import PackageHistory from '../page/PackageHistory';
import AuctionRecord from '../page/AuctionRecord';
import ChangePassword from '../page/ChangePassword';
import Event from '../page/Event';

export const routerList = [
	{
		path: `${PATH.RESULT}/:id`,
		component: Result,
		layout: LayoutApp
	},
	{
		path: `${PATH.RESULT}/:id/:idResult`,
		component: Result,
		layout: LayoutApp
	},
	{
		path: PATH.HOME,
		component: HomePage,
		layout: LayoutApp
	},
	{
		path: `${PATH.BID}/:id`,
		component: BidPage,
		layout: LayoutApp
	},
	{
		path: PATH.RULE,
		component: Rule,
		layout: LayoutApp
	},
	{
		path: PATH.LOGIN,
		component: LoginMobile,
		layout: LayoutApp
	},
	{
		path: PATH.ACCOUNT,
		component: AccountPage,
		layout: LayoutApp
	},
	{
		path: PATH.PACKAGE,
		component: PackagePage,
		layout: LayoutApp
	},
	{
		path: PATH.PACKAGE_HISTORY,
		component: PackageHistory,
		layout: LayoutApp
	},
	{
		path: PATH.AUCTION_RECORD,
		component: AuctionRecord,
		layout: LayoutApp
	},
	{
		path: PATH.CHANGE_PASSWORD,
		component: ChangePassword,
		layout: LayoutApp
	},
	{
		path: `${PATH.EVENT}/:id`,
		component: Event,
		layout: LayoutApp
	},
]