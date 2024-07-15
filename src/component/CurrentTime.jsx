import moment from "moment";
import { useEffect, useState } from "react";
// import "moment/locale/vi";
import { mediaQueryPoint, useMediaQuery } from "../utils/hooks";

function CurrentTime() {
	const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
	const [currentDate, setCurrentDate] = useState(moment().format("LTS"));
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(moment().locale("vi").format("HH:mm:ss"));
			setCurrentDate(moment().locale("vi").format("dddd, DD/MM/YYYY"));
		}, 1000);

		return () => clearInterval(timer);
	}, []);
	return (
		<>
			{isMobile ? (
				<div className="box-user-date-mobile">
					<span>{currentTime}</span>
					<span>{currentDate}</span>
				</div>
			) : (
				<div className="box-user-date">
					<span>{currentTime}</span>
					<span className="line"></span>
					<span>{currentDate}</span>
				</div>
			)}
		</>
	);
}

export default CurrentTime;
