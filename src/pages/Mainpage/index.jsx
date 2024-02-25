import React from "react";
import Slayder from "../../components/Slayder/index.jsx";
import SwiperComponent from "../../components/Swiper/index.jsx";
import { Offer } from "../../components/Offer/index.jsx";

const Mainpage = () => {
  return (
    <div>
      <Slayder />
      <SwiperComponent />
      <Offer />
    </div>
  );
};

export default Mainpage;
