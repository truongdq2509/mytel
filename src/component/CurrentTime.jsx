import moment from "moment";
import { useEffect, useState } from "react";
import "moment/locale/my";
import { mediaQueryPoint, useMediaQuery } from "../utils/hooks";

function CurrentTime() {
	const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
	const [currentDate, setCurrentDate] = useState(moment().format("LTS"));
	const [currentWeek, setCurrentWeek] = useState(moment().format("LTS"));
	const isMobile = useMediaQuery(`(max-width: ${mediaQueryPoint.lg}px)`);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(moment().format("HH:mm:ss"));
			setCurrentWeek(moment().locale("my").format("dddd"))
			setCurrentDate(moment().format("DD/MM/YYYY"));
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
					<span>{`${currentWeek}, ${currentDate}`}</span>
				</div>
			)}
		</>
	);
}

export default CurrentTime;
