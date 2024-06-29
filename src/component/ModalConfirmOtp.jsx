import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';

function ModalConfirmOtp({ openModalConfirm, setOpenModalConfirm, handleConfirmOtp, phoneNumber, handleResend }) {
	const { t } = useTranslation()
	const [otp, setOtp] = useState('')
	useEffect(() => {
		setOtp('')
	}, [openModalConfirm])
	return (
		<Modal
			title={t("modal.modal_login.title_confirm_otp")}
			open={openModalConfirm}
			onCancel={() => setOpenModalConfirm(false)}
			className="modal-confirm-otp"
			width={682}
			centered
			footer={
				<div className="foot-login">
					<Button onClick={() => handleConfirmOtp(otp)} className="button-foot-modal">
						{t("modal.modal_login.confirm")}
					</Button>
				</div>
			}
		>
			<div className="modal-confirm-otp-body">
				{/* <div onClick={handleBack} className="button-back">
          <span />
        </div> */}
				<div className="modal-confirm-otp-body-text-number">
					{t("modal.modal_login.text_confirm_otp").replace(
						"_PHONE_",
						phoneNumber
					)}
				</div>
				<div className="box-input">
					<div className="label-input">{t("modal.modal_login.enter_otp")}</div>
					<div className="box-input-input">
						<OTPInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							// renderSeparator={<span>-</span>}
							renderInput={(props) => <input {...props} />}
						/>
					</div>
					<div className="label-input">
						{t("modal.modal_login.resend_otp")}
						<span onClick={() => handleResend()}>{t("modal.modal_login.resend")}</span>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ModalConfirmOtp;
