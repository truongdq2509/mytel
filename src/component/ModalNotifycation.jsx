import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

function ModalNotifycation({ open, handleCancel, message }) {
	const { t } = useTranslation()
	return (<Modal
		title=""
		open={open}
		onCancel={handleCancel}
		className="modal-notifycation"
		width={684}
		footer={
			<div className="foot-login">
				<Button onClick={handleCancel} className="button-foot-modal">
					{t("modal.modal_login.ok")}
				</Button>
			</div>
		}
	>
		<div className="modal-notifycation-body">
			{message}
		</div>

	</Modal>);
}

export default ModalNotifycation;