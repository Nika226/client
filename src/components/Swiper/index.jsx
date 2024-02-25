import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function SwiperComponent() {
  const list = [
    "http://localhost:3333/product_img/1.jpeg",
    "http://localhost:3333/product_img/2.jpeg",
    "http://localhost:3333/product_img/3.jpeg",
    "http://localhost:3333/product_img/4.jpeg",
    "http://localhost:3333/product_img/5.jpeg",
  ];

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={7}
        grabCursor={true}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {list.map((img, ind) => (
          <SwiperSlide key={ind}>
            <img src={img} alt={img}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
