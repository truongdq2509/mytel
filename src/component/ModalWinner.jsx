import { Button, Modal } from "antd";
import { getWinnerPopup, setWinnerPopup } from "../utils/cookie";
import PATH from "../config/PATH";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import avatarDefault from "../assets/images/avatarDefault.svg"
import { checkImage } from '../helper/helper';

function ModalWinner({ result, isWinner }) {
	const { t } = useTranslation();
	const [urlAvarta, setUrlAvarta] = useState(avatarDefault)
	const [isModalVisible, setIsModalVisible] = useState(() =>
		JSON.parse(window.localStorage.getItem("winner-popup") || true)
	);
	if (getWinnerPopup() == null) {
		setWinnerPopup(true);
	}
	const handleOk = () => {
		setWinnerPopup(false);
		window.location.href = `${PATH.BID}/running`
	};

	const handleCancel = () => {
		setWinnerPopup(false);
		setIsModalVisible(false);
	};
	if (result && result?.image) {
		const myPromise = new Promise((resolve, reject) => {
			resolve(checkImage(result?.image))
		});
		myPromise.then((res) => {
			if (res) {
				setUrlAvarta(result?.image)
			}
		})
	}
	let listImageProduct = result?.product_image?.split(',')
	return (
		<Modal
			centered
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			width="822px"
			className="modal-winner-popup"
			footer={[
				<Button className='modal-btn-winner' key="submit" type="primary" onClick={handleOk}>
					{t("home_page.bid_now")}
				</Button>,
			]}
		>
			<div className="box-modal-winner">
				<div className="box-modal-winner-bgr" />
				<div className="box-modal-winner-content">
					<div className="box-modal-winner-content-detail">
						<div className="product-price">
							<span className="title">{t("result_page.win_price")}</span>
							<span className="price">{`${result?.product_price.toLocaleString('en-US')} MMK`}</span>
						</div>
						<div className="line" />
						<div className="info-user">
							<div className="info-user-avt" style={{ backgroundImage: `url(${urlAvarta})` }} />
							<div className='info-user-phone'>
								<span>{result?.isdn}</span>
								<span>{result?.isdn}</span>
							</div>
						</div>
					</div>
					<div className="box-modal-winner-content-gift">
						<div className="img-gift" style={{ backgroundImage: `url(${listImageProduct[0]})` }} />
						<div className="name-gift one-line">{result?.product_name}</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ModalWinner;
