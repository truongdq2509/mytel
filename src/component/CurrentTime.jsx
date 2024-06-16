import moment from 'moment';
import { useEffect, useState } from 'react';
import 'moment/locale/vi';

function CurrentTime() {
	const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));
	const [currentDate, setCurrentDate] = useState(moment().format('LTS'));

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(moment().locale('vi').format('HH:mm:ss'));
			setCurrentDate(moment().locale('vi').format('dddd, DD/MM/YYYY'))
		}, 1000);

		return () => clearInterval(timer);
	}, []);
	return (
		<div className='box-user-date'>
			<span>{currentTime}</span>
			<span className='line'></span>
			<span>{currentDate}</span>
		</div>
	);
}

export default CurrentTime;
