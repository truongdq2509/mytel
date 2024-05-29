import { useTranslation } from 'react-i18next';

function RightWeb() {
	const { t } = useTranslation()
	const dataTable = [

	]
	return (
		<div className='right-page'>
			<div className='right-page-head'>
				<div className='number-people'>
					<span>243</span>
					<span>{t("right_page.number_people")}</span>
				</div>
				<div className='icon-head' />
				<div className='box-text'>
					<div>{t("right_page.text_foot1")}</div>
					<div>{t("right_page.text_foot2")}</div>
				</div>

			</div>
			<div className='right-page-content'>

			</div>
		</div>);
}

export default RightWeb;