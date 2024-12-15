import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Link } from "react-scroll";
import React, { useState, useEffect } from "react";

const Navtest = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between max-w-[1200px] mx-auto py-5 ">
        <h1 className="font-bold text-2xl">BelajarQ.</h1>
        <ul className="flex items-center">
          <li className="px-3">
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:font-bold"
            >
              About
            </Link>
          </li>
          <li className="px-3">
            <Link
              to="feature"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:font-bold"
            >
              Feature
            </Link>
          </li>
          <li className="px-3 ">
            <Link
              to="pricing"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:font-bold"
            >
              Pricing
            </Link>
          </li>
          <li className="px-3 cursor-pointer">
            <Link
              to="testimoni"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="cursor-pointer hover:font-bold"
            >
              Testimonial
            </Link>
          </li>
        </ul>
        <Button
          onClick={() => signOut()}
          className="text-white bg-blue-500 hover:bg-blue-500 px-8 py-5 rounded-md transition-all"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navtest;
