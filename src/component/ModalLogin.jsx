import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TYPE_LOGIN } from "../helper/const";

function ModalLogin({ open, setOpenModalLogin }) {
	const { t } = useTranslation();
	const [typeLogin, setTypeLogin] = useState(TYPE_LOGIN.loginPassword);
	const [showPassword, setShowPassword] = useState(false);
	const handleOk = () => { };
	const handleCancel = () => {
		setOpenModalLogin(false);
	};
	const handleChangeLogin = () => {
		if (typeLogin === TYPE_LOGIN.loginPassword) {
			setTypeLogin(TYPE_LOGIN.loginOtp);
		} else if (typeLogin === TYPE_LOGIN.loginOtp) {
			setTypeLogin(TYPE_LOGIN.loginPassword);
		}
	};
	return (
		<Modal
			title={
				typeLogin === TYPE_LOGIN.loginPassword
					? t("modal.modal_login.title")
					: t("modal.modal_login.title_otp")
			}
			open={open}
			onCancel={handleCancel}
			className="modal-login"
			width={800}
			footer={
				<div className="foot-login">
					<Button onClick={handleOk} className="button-foot-modal">
						{typeLogin === TYPE_LOGIN.loginPassword
							? t("header.login")
							: t("modal.modal_login.login_otp")}
					</Button>
					<div onClick={handleChangeLogin} className="text-login">
						{typeLogin === TYPE_LOGIN.loginPassword
							? t("modal.modal_login.login_with_otp")
							: t("modal.modal_login.login_with_password")}
					</div>
				</div>
			}
		>
			<div className="modal-login-body">
				{typeLogin === TYPE_LOGIN.loginPassword ? (
					<div className="modal-login-body-banner" />
				) : null}

				{typeLogin === TYPE_LOGIN.loginPassword ? (
					<div className="modal-login-body-pass">
						<div className="box-input">
							<div className="box-input-label">
								<span>{t("modal.modal_login.phone_number")}</span>
								<span>*</span>
							</div>
							<div className="box-input-input">
								<Input
									placeholder={t("modal.modal_login.phone_number_placeholder")}
								/>
							</div>
						</div>

						<div className="box-input">
							<div className="box-input-label">
								<span>{t("modal.modal_login.password")}</span>
								<span>*</span>
							</div>
							<div className="box-input-input pass">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder={t("modal.modal_login.password_placeholder")}
								/>
								<div
									onClick={() => setShowPassword(!showPassword)}
									className={`icon-eye  ${showPassword ? "show" : ""}`}
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="modal-login-body-otp">
						<Input
							placeholder={t("modal.modal_login.phone_number_placeholder")}
						/>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default ModalLogin;
