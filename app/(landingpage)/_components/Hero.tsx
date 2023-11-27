"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col py-16 md:pb-10 lg:py-20 xl:pt-40 xl:justify-evenly">
      <div className="relative z-20 flex flex-1 flex-col">
        {/* TITLE */}
        <div className="flex justify-center items-center">
          <Image
            src="/landingpage/ZTM-logo.png"
            alt="ztmready logo"
            width={50}
            height={50}
            className="relative left-[10px] top-[-50px] w-10 lg:w-[50px]"
          />
          <h1 className="bold-52 lg:bold-88">
            <span className="text-devready-green">ZTM</span>
            Ready
          </h1>
        </div>

        {/* TYPING TEXTBOX */}
        <div className="flex h-32 p-4 md:mx-32 text-xl md:text-3xl lg:text-4xl xl:text-5xl items-center justify-center text-center font-semibold tracking-widest font-serif bg-devready-green rounded-xl text-white">
          <TypeAnimation
            //preRenderFirstString={true}
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Are you ready for that \n Frontend interview?",
              2000,
              "Are you ready for that \n Fullstack interview?",
              2000,
              "Are you ready for that \n Backend interview?",
              2000,
              "Are you ready for that \n JavaScript interview?",
              2000,
            ]}
            wrapper="span"
            style={{ whiteSpace: "pre-line", gap: "100px" }}
            speed={40}
            deletionSpeed={90}
            repeat={Infinity}
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-center md:mx-36 regular-18 text-gray-30 py-5">
          Quick check to see if you are ready to take that interview! Lets help
          try determine what level you are and perhaps guide you on where you
          need to spend time to crack that interview
        </p>
      </div>

      {/*  BOTTOM SECTION CONTAINER */}
      <div className="flex flex-1 flex-col xl:flex-row xl:justify-evenly between gap-10">
        {/* REVIEWS AND BUTTONS SUB-LEFT */}
        <div className="flex flex-col items-center md:py-5">
          {/* STAR REVIEWS */}
          <div className="my-3 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {Array(5)
                .fill(1)
                .map((_, index) => (
                  <Image
                    src="landingpage/star.svg"
                    key={index}
                    alt="star"
                    width={24}
                    height={24}
                  />
                ))}
            </div>

            <p className="bold-16 lg:bold-20 tracking-wider">
              1
              <span className="regular-16 lg:regular-20 ml-1">
                Excellent Review
              </span>
            </p>
          </div>

          {/* LOGIN / DASHBOARD BUTTON - need to be dynamic in future 🎯 */}
          <div className="flex flex-col w-full gap-3 max-w-xl">
            <Link href={"/login"} className="flex flex-col w-full gap-3 max-w-xl">
              <Button type="button" variant="devfill" className="p-7 ">
                Get Started Now
              </Button>
            </Link>

            <Button
              type="button"
              variant="devoutline"
              className="p-7"
              size="sm"
            >
              How it works?
            </Button>
          </div>
        </div>

        {/* DESCRIPTIVE IMAGE SUB_RIGHT - hidden in mobile & currently a placeholder 🎯 */}
        <div className="hidden xl:flex justify-center items-center min-w-[750px] bg-white rounded-xl ">
          <Image
            src="/landingpage/ZTM-logo.png"
            alt="ztmready logo"
            width={400}
            height={50}
          />
          <div className="text-7xl font-bold absolute -translate-y-2 text-blue-300 -rotate-12 ">
            placeholder image
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
