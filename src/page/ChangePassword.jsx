import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PATH from "../config/PATH";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { curStateAccount } from "../Redux/selector";
import {
	getCurrentUser,
	requestOtp,
	updatePassword,
	verifyOtpPassword,
} from "../Redux/futures/account/actions";
import ModalNotifycation from "../component/ModalNotifycation";
import ModalConfirmOtp from "../component/ModalConfirmOtp";

function ChangePassword() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const selectorAccount = useSelector(curStateAccount);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [stateNotifycation, setStateNotifycation] = useState({
		open: false,
		title: "",
		content: "",
	});
	const [openModalConfirm, setOpenModalConfirm] = useState(false);
	const [showPassword, setShowPassword] = useState({
		confirmPassword: false,
		password: false,
	});
	const [statusInput, setStatusInput] = useState({
		confirmPassword: "",
		password: "",
	});
	const afterGetUserInfo = (data, isLoading) => {
		if (!isLoading) {
			if (!data) {
				navigate(PATH.HOME);
			}
		}
	};
	const afterRequestOtp = (data, isLoading) => {
		if (data) {
			setOpenModalConfirm(true);
		}
	};
	const afterUpdatePassword = (data, isLoading) => {
		if (data) {
			setStateNotifycation({
				open: true,
				title: t("success"),
				content: data.message,
			});
			setOpenModalConfirm(false);
			setPassword('')
			setConfirmPassword('')
		}
	}
	const afterVerifyOtp = (data, isLoading, dataError) => {
		if (!isLoading) {
			if (data) {
				const body = {
					newPassword: password,
					confirmNewPassword: confirmPassword,
					callback: afterUpdatePassword,
				};
				dispatch(updatePassword(body))
			} else {
				setStateNotifycation({
					open: true,
					title: t("error"),
					content: dataError.errorMessage,
				});
				setOpenModalConfirm(false);

			}
		}
	};
	useEffect(() => {
		if (!selectorAccount.userInfo) {
			dispatch(getCurrentUser({ callback: afterGetUserInfo }));
		}
	}, []);
	const handleChangePassword = () => {
		if (
			(!confirmPassword || confirmPassword.trim() === "") &&
			(!password || password.trim() === "")
		) {
			setStatusInput({
				password: "error",
				confirmPassword: "error",
			});
			return;
		}

		if (!confirmPassword || confirmPassword.trim() === "") {
			setStatusInput({
				...statusInput,
				confirmPassword: "error",
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
		if (password !== confirmPassword) {
			setStateNotifycation({
				open: true,
				title: t("error"),
				content: t("account_page.change_password_page.passwordError"),
			});
			return;
		}
		let regex = new RegExp(
			"^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%#?&])[A-Za-z\\d@$!%*#?&]{12,}$"
		);
		let found = regex.test(password);
		if (!found) {
			setStateNotifycation({
				open: true,
				title: t("error"),
				content:
					"သင်၏စကားဝှက်သည် သတ်မှတ်ထားသည့်အချက်များနှင့် မကိုက်ညီပါ။ ထပ်မံ သတ်မှတ်ပေးပါ။",
			});
			return;
		}
		const body = {
			newPassword: password,
			confirmNewPassword: confirmPassword,
			isdn: selectorAccount.userInfo.isdn,
			callback: afterRequestOtp,
		};
		dispatch(requestOtp(body));
	};
	const handleConfirmOtp = (otp) => {
		const body = {
			isdnOtp: selectorAccount.userInfo.isdn,
			otp,
			callback: afterVerifyOtp,
		};
		dispatch(verifyOtpPassword(body));
	};
	return (
		<div className="container-child-account">
			<div className="container-child-account-header">
				<div onClick={() => navigate(PATH.ACCOUNT)} className="box-title">
					<div className="icon-back" />
					<div className="box-title-text">
						{t("account_page.change_password")}
					</div>
				</div>
			</div>
			<div className="container-child-account-body">
				<div className="box-change-pass">
					<div className="box-input">
						<div className="box-input-label">
							<span>{t("account_page.change_password_page.new_password")}</span>
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
								type={showPassword.password ? "text" : "password"}
								placeholder={t(
									"account_page.change_password_page.placeholder_new_password"
								)}
							/>
							<div
								onClick={() =>
									setShowPassword({
										...showPassword,
										password: !showPassword.password,
									})
								}
								className={`icon-eye  ${showPassword.password ? "show" : ""}`}
							/>
						</div>
					</div>
					<div className="box-input">
						<div className="box-input-label">
							<span>
								{t("account_page.change_password_page.confirm_new_password")}
							</span>
							<span>*</span>
						</div>
						<div className="box-input-input pass">
							<Input
								value={confirmPassword}
								status={statusInput.confirmPassword}
								onChange={(e) => {
									setStatusInput({ ...statusInput, confirmPassword: "" });
									setConfirmPassword(e.target.value);
								}}
								type={showPassword.confirmPassword ? "text" : "password"}
								placeholder={t(
									"account_page.change_password_page.placeholder_confirm_new_password"
								)}
							/>
							<div
								onClick={() =>
									setShowPassword({
										...showPassword,
										confirmPassword: !showPassword.confirmPassword,
									})
								}
								className={`icon-eye  ${showPassword.confirmPassword ? "show" : ""
									}`}
							/>
						</div>
					</div>
					<div className="note">
						<span>{t("account_page.change_password_page.note")}: </span>
						{t("account_page.change_password_page.text_note")}
					</div>
					<div className="button-foot">
						<div className="button-foot-btn">
							{t("account_page.change_password_page.cancel")}
						</div>
						<div
							onClick={handleChangePassword}
							className="button-foot-btn button-change"
						>
							{t("account_page.change_password")}
						</div>
					</div>
				</div>
			</div>
			<ModalNotifycation
				open={stateNotifycation.open}
				handleCancel={() => {
					setStateNotifycation({
						open: false,
						title: "",
						content: "",
					});
				}}
				title={stateNotifycation.title}
				message={stateNotifycation.content}
			/>
			<ModalConfirmOtp
				openModalConfirm={openModalConfirm}
				setOpenModalConfirm={setOpenModalConfirm}
				handleConfirmOtp={handleConfirmOtp}
				phoneNumber={selectorAccount?.userInfo?.isdn}
				handleResend={handleChangePassword}
			/>
		</div>
	);
}

export default ChangePassword;
