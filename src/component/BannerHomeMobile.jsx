import { Carousel } from 'antd';

function BannerHomeMobile() {
	return (<div className='banner-mobile'>
		<div className='banner-mobile-box-slide'>
			<Carousel autoplay={true} infinite={true}>
				<div className="banner-mobile-box-slide-item" />
				<div className="banner-mobile-box-slide-item" />
				<div className="banner-mobile-box-slide-item" />
			</Carousel>
		</div>
	</div>);
}

export default BannerHomeMobile;