import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
// import react slick
import Slider from "react-slick";
import Image from "next/image";
import Stars from "../../public/assets/Icon/stars.svg";
import Button1 from "../../public/assets/Icon/icons8.png";
import Nextbutton from "../../public/assets/Icon/icons8.png";

const Testimoni = ({
  listTestimoni = [
    {
      name: "Ganang Syaifullah",
      image: "/assets/people-3.png",
      city: "Semarang",
      country: "Indonesia",
      rating: "4.7",
      testimoni:
        "The study material is very complete and easy to understand. Coupled with an interesting quiz, I can measure the extent of my understanding. Very helpful for exam preparation!",
    },
    {
      name: "Ahmad Chosim",
      image: "/assets/people-3.png",
      city: "Semarang",
      country: "Indonesia",
      rating: "4.9",
      testimoni:
        "This website is really the learning solution I need. The material is neat, the quizzes are challenging, and I have become more confident in facing exams!",
    },
    {
      name: "Ifad Yusuf",
      image: "/assets/people-3.png",
      city: "Semarang",
      country: "Indonesia",
      rating: "4.8",
      testimoni:
        "I would say that this website is very helpful for independent learning. Unlike other course web, the material in this web is well structured, and the quizzes make learning more fun!",
    },
    {
      name: "Asdif Afada",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "5.0",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute mt-20  ",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <div className="border-2 border-GRAY-500 hover:border-blue-500 transition-all rounded-lg p-8 flex flex-col">
              <div className="flex flex-col xl:flex-row w-full items-stretch xl:items-center">
                <div className="flex order-2 xl:order-1">
                  <Image
                    src={listTestimonis.image}
                    height={50}
                    width={50}
                    alt="Icon People"
                  />
                  <div className="flex flex-col ml-5 text-left">
                    <p className="text-lg text-BLACK-600 capitalize">
                      {listTestimonis.name}
                    </p>
                    <p className="text-sm text-BLACK-500 capitalize">
                      {listTestimonis.city},{listTestimonis.country}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center ml-auto order-1 xl:order-2">
                  <p className="text-sm">{listTestimonis.rating}</p>
                  <span className="flex ml-4">
                    <Stars className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <p className="mt-5 text-left">“{listTestimonis.testimoni}”.</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-black border hover:bg-blue-50 hover:text-white-500 transition-all text-blue-500 cursor-pointer"
            onClick={sliderRef?.slickPrev}
          >
            <FaArrowLeft />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-black border hover:bg-blue-50 hover:text-white-500 transition-all text-blue-500 cursor-pointer"
            onClick={sliderRef?.slickNext}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimoni;
