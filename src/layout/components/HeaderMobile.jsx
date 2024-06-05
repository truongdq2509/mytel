
import PATH from '../../config/PATH';
import { useTranslation } from 'react-i18next';


function HeaderMobile() {
	const { t } = useTranslation()
	return (<div className='header-mobile-page'>
		<a href={PATH.HOME} className='logo-mobile' />
		<button className='button-login'>{t("header.login")}</button>
	</div>);
}

export default HeaderMobile;