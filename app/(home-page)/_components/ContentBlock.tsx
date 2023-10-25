import Image from "next/image";
import React from "react";

const ContentBlock = () => {
  return (
    <section className="flexCenter flex-col pt-10 lg:pt-1">
      <div className="padding-container max-container w-full pb-16">
        <div className="flex flex-col md:justify-end items-end text-center md:text-right">
          <Image
            src="/landingpage/ZTM-logo.png"
            alt="ztmready-logo"
            width={50}
            height={50}
          />
          <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
            We are here for you
          </p>
          <h2 className="bold-32 lg:bold-40 xl:bold-64 ">
            Overcome Imposter Syndrome
          </h2>
        </div>
        <p className="regular-16 text-gray-30 xl:max-w-4/5 pt-5">
          Embark on a journey of self-discovery with our{" "}
          <strong>tailored web development quiz</strong>. Gain valuable insights
          into <strong>your current proficiency level </strong>
          by answering thoughtfully crafted questions. Based on your results, we
          provide personalized resources and learning paths to meet your unique
          needs.
          <br />
          <br />
          At DevReady, we believe in guiding your web development goals with
          confidence and clarity. Our platform not only{" "}
          <strong>assesses your current level</strong> but also offers a clear{" "}
          <strong>roadmap for progression, from entry to senior levels</strong>.
          Empower yourself with the knowledge and assurance to excel.
          LetDevReady be your trusted companion on this transformative{" "}
          <strong>
            journey towards a more confident, prepared, and successful future
          </strong>{" "}
          in web development
        </p>
      </div>

      <div className="flexCenter max-container relative w-full">
        <Image
          src="/landingpage/boat.png"
          alt="boat"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        />

        <div className="absolute flex bg-white py-9 pl-5 pr-6 gap-4 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image
            src="landingpage/meter.svg"
            alt="meter"
            width={22}
            height={21}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Job Ready</p>
                <p className="bold-16 text-green-50">5 points</p>
              </div>
              <p className="bold-20 mt-2">Ready to Enter Workforce</p>
            </div>

            <div className="flex w-full flex-col">
              <p className="regular-16 text-gray-20">final prep</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">
                ZTM Fulltime Student
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;
