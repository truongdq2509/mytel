import LayoutApp from '../layout/LayoutApp';
import HomePage from '../page/HomePage';
import PATH from './PATH';
import BidPage from '../page/BidPage';
import Result from '../page/Result';
import Rule from '../page/Rule';
import LoginMobile from '../page/LoginMobile';

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
]