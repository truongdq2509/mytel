import { Link, useLocation, useParams } from "react-router-dom";
import PATH from "../../config/PATH";
import { urlPageBid, urlPageResult } from "../../helper/const";
import _ from "lodash";

function FooterMobile() {
	const location = useLocation()
	const { id = null, idResult = null } = useParams();
	const listFooter = [
		{
			link: `${PATH.BID}/${urlPageBid.running}`,
			classItem: "icon-bid",
			linkActive: [`${PATH.BID}/${urlPageBid.running}`, `${PATH.BID}/${urlPageBid.upcoming}`,]
		},
		{
			link: `${PATH.RESULT}/${urlPageResult.all}`,
			classItem: "icon-result",
			linkActive: [`${PATH.RESULT}/${urlPageResult.all}`, `${PATH.RESULT}/${urlPageResult.the_winner}`, `${PATH.RESULT}/${urlPageResult.no_winner}`]
		},
		{
			link: PATH.HOME,
			classItem: "icon-home",
		},
		{
			link: PATH.RULE,
			classItem: "icon-rule",
		},
		{
			link: PATH.ACCOUNT,
			classItem: "icon-account",
		},
	];

	const getClassActive = (data) => {
		let activeClass = '';
		let isCheckPageResult = false
		if(data.link === `${PATH.RESULT}/${urlPageResult.all}` && id && idResult){
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
				return (
					<Link
						to={item.link}
						key={`footer_item_${index}`}
						className={`footer-mobile-item ${item.classItem} ${getClassActive(item) ? 'active' : ''}`}
					/>
				);
			})}
		</div>
	);
}

export default FooterMobile;
