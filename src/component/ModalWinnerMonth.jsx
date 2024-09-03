import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import Cookies from 'universal-cookie';
import PATH from '../config/PATH';
import { useNavigate } from 'react-router';

const ModalWinnerMonth = ({ monthWinner }) => {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(false);
	const [heightImg, setHeightImg] = useState(0);
	const ref = useRef(null)

	const handleCancel = useCallback(() => {
		setOpenModal(false);
	});
	const cookies = new Cookies();
	useEffect(() => {
		const checkShow = cookies.get('isShowModalWinnerWeek') || null
		if (!checkShow) {
			setOpenModal(true)
			cookies.set("isShowModalWinnerWeek", 1, {
				path: "/",
				maxAge: 14400,
			})
		}

	}, [cookies])
	useEffect(() => {
		const handleGetHeight = () => {
			const height = document.getElementById("modal-winner-week").offsetWidth * 1.26
			setHeightImg(height)
		}
		window.addEventListener("resize", handleGetHeight)
		return () => window.removeEventListener("resize", handleGetHeight)
	}, [])
	const navigate = useNavigate()
	return (
		<Modal
			centered
			visible={openModal}
			onCancel={handleCancel}
			className={`modal-winner modal-winner-week`}
			width="500px"
			footer={[]}
		>
			<div
				// style={{ backgroundImage: imgPopup}} 
				id="modal-winner-week"
				ref={ref}
				className="winning winning-week" style={{ width: "100%", height: `${heightImg}px` }}>
				<img src={monthWinner?.path} onLoad={(e) => {
					setHeightImg(e.target.height)
				}} id="img-winner-week" alt='img-popup' className='img-winner-week' />
				<div className="winning-foot foot-week">
					<Button key="submit" type="primary" onClick={() => {
						navigate(`${PATH.BID}/running`)
						setOpenModal(false);
					}}>
						အခုလေလံဆွဲပါ
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalWinnerMonth;
