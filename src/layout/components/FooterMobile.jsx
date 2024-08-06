import { Link, useLocation, useParams } from "react-router-dom";
import PATH from "../../config/PATH";
import { urlPageBid, urlPageResult } from "../../helper/const";
import _ from "lodash";
import avatarDefault from "../../assets/images/avatarDefault.svg"
import { checkImage } from '../../helper/helper';
import { useTranslation } from 'react-i18next';

function FooterMobile({ user }) {
	const location = useLocation()
	const { t } = useTranslation()
	const { id = null, idResult = null } = useParams();
	const listFooter = [
		{
			link: `${PATH.BID}/${urlPageBid.running}`,
			classItem: "icon-bid",
			linkActive: [`${PATH.BID}/${urlPageBid.running}`, `${PATH.BID}/${urlPageBid.upcoming}`, `${PATH.BID}/${urlPageBid.purchasing}`],
			title: t("header.bid")
		},
		{
			link: `${PATH.RESULT}/${urlPageResult.all}`,
			classItem: "icon-result",
			linkActive: [`${PATH.RESULT}/${urlPageResult.all}`, `${PATH.RESULT}/${urlPageResult.the_winner}`, `${PATH.RESULT}/${urlPageResult.no_winner}`],
			title: t("header.result")
		},
		{
			link: PATH.HOME,
			classItem: "icon-home",
			title: t("header.home")
		},
		{
			link: PATH.RULE,
			classItem: "icon-rule",
			title: t("header.rule")
		},
		{
			link: user ? PATH.ACCOUNT : PATH.LOGIN,
			classItem: "icon-account",
			title: t("header.account")
		},
	];

	const getClassActive = (data) => {
		let activeClass = '';
		let isCheckPageResult = false
		if (data.link === `${PATH.RESULT}/${urlPageResult.all}` && id && idResult) {
			isCheckPageResult = true;
		}
		if (data.link === location.pathname || _.includes(data.linkActive, location.pathname) || isCheckPageResult) {
			activeClass = 'active'
		}

		return activeClass
	}

	return (
		<div className="footer-mobile">
			{listFooter.map((item, index) => {
				if (item.classItem === "icon-account") {
					let url = avatarDefault
					if (user && user?.image) {
						if (checkImage(user?.image)) {
							url = user?.image
						}
					}
					return (<Link
						to={item.link}
						key={`footer_item_${index}`}
						className={`footer-mobile-item  ${getClassActive(item) ? 'active' : ''}`}
					>
						<div className={`icon-footer ${item.classItem} ${getClassActive(item) ? 'active' : ''}`} style={{ backgroundImage: user && `url(${url})` }} />
						<span className='text-footer'>{item.title}</span>
					</Link>)
				}
				return (
					<Link
						to={item.link}
						key={`footer_item_${index}`}
						className={`footer-mobile-item  ${getClassActive(item) ? 'active' : ''}`}
					>
						<div className={`icon-footer ${item.classItem} ${getClassActive(item) ? 'active' : ''}`} />
						<span className='text-footer'>{item.title}</span>
					</Link>
				);
			})}
		</div>
	);
}

export default FooterMobile;
