import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TYPE_LOGIN } from "../helper/const";
import { Button, Input } from "antd";
import {
	loginWithOtp,
	loginWithPassword,
	requestOtp,
	verifyOtp,
} from "../Redux/futures/account/actions";
import OTPInput from "react-otp-input";
import ModalNotifycation from '../component/ModalNotifycation';
import PATH from '../config/PATH';
import { curStateAccount } from '../Redux/selector';

function LoginMobile() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [typeLogin, setTypeLogin] = useState(TYPE_LOGIN.loginPassword);
	const selectorAccount = useSelector(curStateAccount)
	const [showPassword, setShowPassword] = useState(false);
	const [openModalConfirm, setOpenModalConfirm] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [openModalNotification, setOpenModalNotification] = useState(false);
	const [statusInput, setStatusInput] = useState({
		phoneNumber: "",
		password: "",
	});
	const [messageError, setMessageError] = useState("");
	if (selectorAccount.userInfo) {
		window.location.href = PATH.HOME
	}
	useEffect(() => {
		if (!openModalConfirm) {
			setStatusInput({
				phoneNumber: "",
				password: "",
			});
			setPassword("");
			setPhoneNumber("");
			setOtp("");
			setShowPassword(false);
		}
		if (selectorAccount.userInfo) {
			window.location.href = PATH.HOME
		}
	}, []);

	const afterLoginPassword = (dataSuccess, isLoading, dataError = null) => {
		if (!isLoading) {
			if (dataError) {
				setMessageError(dataError.errorMessage);
				setOpenModalNotification(true);
				setOpenModalConfirm(false);
			} else {
				setStatusInput({
					phoneNumber: "",
					password: "",
				});
				setPassword("");
				setPhoneNumber("");
				setOtp("");
				setShowPassword(false);
				window.location.href = PATH.HOME
			}
		}
	};
	const afterLoginOtp = (dataSuccess, isLoading, dataError = null) => {
		if (!isLoading) {
			setStatusInput({
				phoneNumber: "",
				password: "",
			});
			setPassword("");
			setPhoneNumber("");
			setOtp("");
			setShowPassword(false);
			setOpenModalConfirm(false);
			window.location.href = PATH.HOME
		}
	};
	const afterRequestOtp = (data, isLoading) => {
		if (data) {
			setOpenModalConfirm(true);
		}
	};
	const afterverifyOtp = (data, isLoading, dataError) => {
		if (!isLoading) {
			if (dataError) {
				setMessageError(dataError.errorMessage);
				setOpenModalNotification(true);
			} else {
				const body = {
					isdnOtp: phoneNumber,
					callback: afterLoginOtp,
				};
				dispatch(loginWithOtp(body));
			}
		}
	}

	const handleOk = () => {
		if (typeLogin === TYPE_LOGIN.loginPassword) {
			if (
				(!phoneNumber || phoneNumber.trim() === "") &&
				(!password || password.trim() === "")
			) {
				setStatusInput({
					password: "error",
					phoneNumber: "error",
				});
				return;
			}

			if (!phoneNumber || phoneNumber.trim() === "") {
				setStatusInput({
					...statusInput,
					phoneNumber: "error",
				});
				return;
			}
			if (!password || password.trim() === "") {
				setStatusInput({
					...statusInput,
					password: "error",
				});
				return;
			}
			const body = {
				isdn: phoneNumber,
				password: password,
				callback: afterLoginPassword,
			};
			dispatch(loginWithPassword(body));
		}
		if (typeLogin === TYPE_LOGIN.loginOtp) {
			if (!phoneNumber || phoneNumber.trim() === "") {
				setStatusInput({
					phoneNumber: "error",
				});
				return;
			}
			const body = {
				isdn: phoneNumber,
				callback: afterRequestOtp,
			};
			dispatch(requestOtp(body));
		}
	};
	const handleConfirmOtp = () => {
		if (!otp || otp.trim() === "") {
			return;
		}
		const body = {
			isdnOtp: phoneNumber,
			otp: otp,
			callback: afterverifyOtp,
		};
		dispatch(verifyOtp(body));
	};
	const handleBack = () => {
		setOpenModalConfirm(false);
		setOtp("");
		setTypeLogin(TYPE_LOGIN.loginOtp);
	};
	const handleChangeLogin = () => {
		if (typeLogin === TYPE_LOGIN.loginPassword) {
			setTypeLogin(TYPE_LOGIN.loginOtp);
			setPhoneNumber("");
			setPassword("");
		} else if (typeLogin === TYPE_LOGIN.loginOtp) {
			setTypeLogin(TYPE_LOGIN.loginPassword);
			setPhoneNumber("");
			setPassword("");
		}
	};

	let titleWeb = t("modal.modal_login.title");
	if (typeLogin === TYPE_LOGIN.loginOtp) {
		titleWeb = t("modal.modal_login.title_otp");
	}
	if (typeLogin === TYPE_LOGIN.loginOtp && openModalConfirm) {
		titleWeb = t("modal.modal_login.title_confirm_otp");
	}

	return (
		<div className="box-login-mobile">
			<div className="box-login-mobile-title">{titleWeb}</div>
			<div className="box-login-mobile-body">
				{typeLogin === TYPE_LOGIN.loginPassword ? (
					<div className="box-login-mobile-body-banner" />
				) : null}

				{typeLogin === TYPE_LOGIN.loginPassword ? (
					<div className="box-login-mobile-body-pass">
						<div className="box-input">
							<div className="box-input-label">
								<span>{t("modal.modal_login.phone_number")}</span>
								<span>*</span>
							</div>
							<div className="box-input-input">
								<Input
									value={phoneNumber}
									status={statusInput.phoneNumber}
									onChange={(e) => {
										setStatusInput({ ...statusInput, phoneNumber: "" });
										setPhoneNumber(e.target.value);
									}}
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
									value={password}
									status={statusInput.password}
									onChange={(e) => {
										setStatusInput({ ...statusInput, password: "" });
										setPassword(e.target.value);
									}}
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
				) : typeLogin === TYPE_LOGIN.loginOtp && !openModalConfirm ? (
					<div className="box-login-mobile-body-otp">
						<Input
							value={phoneNumber}
							status={statusInput.phoneNumber}
							onChange={(e) => {
								setStatusInput({ ...statusInput, phoneNumber: "" });
								setPhoneNumber(e.target.value);
							}}
							placeholder={t("modal.modal_login.phone_number_placeholder")}
						/>
					</div>
				) : (
					<div className="box-login-mobile-body-otp-body">
						<div onClick={handleBack} className="button-back">
							<span />
						</div>
						<div className="box-login-mobile-body-otp-body-text-number">
							{t("modal.modal_login.text_confirm_otp").replace(
								"_PHONE_",
								phoneNumber
							)}
						</div>
						<div className="box-input">
							<div className="label-input">
								{t("modal.modal_login.enter_otp")}
							</div>
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
								{t("modal.modal_login.resend_otp")}{" "}
								<span>{t("modal.modal_login.resend")}</span>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="box-login-mobile-foot">
				{(typeLogin === TYPE_LOGIN.loginPassword || (typeLogin === TYPE_LOGIN.loginOtp && !openModalConfirm)) ? (
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
				) : (
					<div className="foot-login">
						<Button onClick={handleConfirmOtp} className="button-foot-modal">
							{t("modal.modal_login.confirm")}
						</Button>
					</div>
				)}
			</div>
			<ModalNotifycation
				open={openModalNotification}
				handleCancel={() => setOpenModalNotification(false)}
				message={messageError}
			/>
		</div>
	);
}

export default LoginMobile;
