import { Carousel } from "antd";

function BannerHomeMobile({ data = [] }) {
	return (
		<div className="banner-mobile">
			<div className="banner-mobile-box-slide">
				<Carousel autoplaySpeed={5000} autoplay={true} infinite={true}>
					{data.map((it, index) => {
						return (
							<div>
								<div
									key={`banner_item_${it.id}_${index}`}
									className="banner-mobile-box-slide-item"
									style={{ backgroundImage: `url(${it.path})` }}
								/>
							</div>
						);
					})}
				</Carousel>
			</div>
		</div>
	);
}

export default BannerHomeMobile;
