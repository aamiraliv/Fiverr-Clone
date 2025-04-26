import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import webdev from "../assets/website-development.webp";
import logodes from "../assets/logo-design.webp";
import SEO from "../assets/seo.webp";
import architecture from "../assets/architecture-design.webp";
import voice from "../assets/voice-over.webp";
import social from "../assets/social-media-marketing.webp";
import ugc from "../assets/UGC Video img.webp";
import software from "../assets/software-development.webp";
import science from "../assets/data-science.webp";
import product from "../assets/product-photography.webp";
import ecommerce from "../assets/e-commerce.webp";
import videoedit from "../assets/video-editing.webp";
import { Navigation } from "swiper/modules";

const PopularService = ({ nextBtn, prevBtn }) => {
  const data = [
    {
      title: "Web Development",
      icon: <img src={webdev} className="rounded-lg" alt="" />,
    },
    {
      title: "Logo Design",
      icon: <img src={logodes} className="rounded-lg" alt="" />,
    },
    {
      title: "SEO",
      icon: <img src={SEO} alt="" />,
    },
    {
      title: "Architecture & Interior Design",
      icon: <img src={architecture} alt="" />,
    },
    { title: "Voice Over", icon: <img src={voice} alt="" /> },
    {
      title: "Social media Marketing",
      icon: <img src={social} alt="" />,
    },
    { title: "UGC Videos", icon: <img src={ugc} alt="" /> },
    {
      title: "Software Development",
      icon: <img src={software} alt="" />,
    },
    {
      title: "Data Science & ML",
      icon: <img src={science} alt="" />,
    },
    {
      title: "Product Photography",
      icon: <img src={product} alt="" />,
    },
    {
      title: "E-Commerce marketing",
      icon: <img src={ecommerce} alt="" />,
    },
    {
      title: "Video Editing",
      icon: <img src={videoedit} alt="" />,
    },
  ];
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5.5}
        navigation={{
          nextEl: nextBtn,
          prevEl: prevBtn,
        }}
        breakpoints={{
          320: { slidesPerView: 1.6 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={idx} className="w-auto">
            <div className=" relative flex flex-col justify-between p-2 rounded-2xl bg-[#003912] w-[180px] min-h-[230px]">
              <p className="font-bold text-white text-lg p-2">{item.title}</p>
              <div>{item.icon}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularService;
