import LayoutApp from '../layout/LayoutApp';
import HomePage from '../page/HomePage';
import PATH from './PATH';

export const routerList = [
	{
		path: PATH.HOME,
		component: HomePage,
		layout: LayoutApp
	},
]