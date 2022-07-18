import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    children: JSX.Element | JSX.Element[] | string[],
    getSlide?: any
}

export const Carousel = ({ children, getSlide }: Props) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    return (
        <Slider {...settings} afterChange={getSlide}>
            {children}
        </Slider>
    )
}
