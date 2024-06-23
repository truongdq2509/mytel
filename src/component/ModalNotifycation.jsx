import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

function ModalNotifycation({ open, title = "", handleCancel, handleOk = null, message }) {
	const { t } = useTranslation()
	return (<Modal
		title={title}
		open={open}
		onCancel={handleCancel}
		className="modal-notifycation"
		width={684}
		footer={
			<div className="foot-login">
				<Button onClick={handleOk ? handleOk : handleCancel} className="button-foot-modal">
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