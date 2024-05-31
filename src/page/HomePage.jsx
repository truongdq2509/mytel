import { Button, Carousel } from "antd";
import React from "react";

function HomePage() {
	return (
		<div className="container-home">
			<div className="container-home-banner">
				<div>
					<Carousel infinite={false}>
						<div className="container-home-banner-item" />
						<div className="container-home-banner-item" />
						<div className="container-home-banner-item" />
					</Carousel>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
