import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import PATH from '../config/PATH';

function ModalChangePassword({ changePage }) {
	const { t } = useTranslation();
	const [isModalVisible, setIsModalVisible] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {

		if (location.pathname === PATH.CHANGE_PASSWORD) {
			setIsModalVisible(false)
		} else setIsModalVisible(true);
	}, [changePage])
	const handleCancel = () => {
		setIsModalVisible(false);
	}
	const handleOk = () => {
		navigate(PATH.CHANGE_PASSWORD)
	}

	return (
		<Modal
			centered
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			width="800px"
			className="modal-update-password"
			footer={[
				<Button className='modal-btn-update-pass' key="submit" type="primary" onClick={handleOk}>
					စကားဝှက် သတ်မှတ်မည်။
				</Button>,
			]}>
			<div className='modal-update-password-title'>
				<div className='icon' />
				<div className='title'>အရေးပေါ် သတိပေးချက်</div>
			</div>
			<div className='modal-update-password-body'>
				Mytelbid အသုံးပြုသူအချက်အလက်အပြင် MyID ၏ ကိုယ်ရေးကိုယ်တာ ဘေးကင်းလုံခြုံမှုကို သေချာစေရန်၊ အသုံးပြုသူများအား ပိုမိုအားကောင်းသည့် စကားဝှက်အသစ်တစ်ခု သတ်မှတ်ပေးရန် လိုအပ်ပါသည်။ ကျေးဇူးပြု၍ Mytelbid အကောင့် စကားဝှက်အသစ်သတ်မှတ်ပေးခြင်းဖြင့် ပူးပေါင်းဆောင်ရွက်ပါ။
			</div>

		</Modal>);
}

export default ModalChangePassword;