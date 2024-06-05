import { Link, useLocation } from "react-router-dom";
import PATH from "../../config/PATH";

function FooterMobile() {
	const location = useLocation()
	const listFooter = [
		{
			link: PATH.BID,
			classItem: "icon-bid",
		},
		{
			link: PATH.RESULT,
			classItem: "icon-result",
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
	return (
		<div className="footer-mobile">
			{listFooter.map((item, index) => {
				return (
					<Link
						to={item.link}
						key={`footer_item_${index}`}
						className={`footer-mobile-item ${item.classItem} ${location.pathname === item.link ? 'active' : ''}`}
					/>
				);
			})}
		</div>
	);
}

export default FooterMobile;
