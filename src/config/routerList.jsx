import LayoutApp from '../layout/LayoutApp';
import HomePage from '../page/HomePage';
import PATH from './PATH';
import BidPage from '../page/BidPage';

export const routerList = [
	{
		path: PATH.HOME,
		component: HomePage,
		layout: LayoutApp
	},
	{
		path: PATH.BID,
		component: BidPage,
		layout: LayoutApp
	},
]