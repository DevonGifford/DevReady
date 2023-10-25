import Image from "next/image";
import { ImageCard } from "./ImageCard";

const ImagesBlock = () => {
  return (
    <section className="2xl:max-container relative flex flex-col pt-10 lg:mb-10 lg:pt-20 xl:mb-1">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <ImageCard
          backgroundImage="bg-bg-img-info1"
          title="Interview Prep & Practice"
          subtitle="Smart Card Flip"
          peopleJoined="50+ Joined"
        />
        <ImageCard
          backgroundImage="bg-bg-img-info4"
          title="Coding Problems"
          subtitle="Live AI Interview"
          peopleJoined="50+ Joined"
        />
        <ImageCard
          backgroundImage="bg-bg-img-info2"
          title="Mock Technical Assessments"
          subtitle="Smart Card Flip"
          peopleJoined="23+ Joined"
        />
        <ImageCard
          backgroundImage="bg-bg-img-info3"
          title="Personalised Guidance "
          subtitle="Custom dashboard & Suggested courses"
          peopleJoined="19+ Joined"
        />
      </div>

      <div className="flexStart mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-green-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            <strong>Feeling unsure</strong> If youre ready?
          </h2>
          <p className="regular-18 xl:regular-20 mt-5 text-white">
            Breaking into the industry can be a daunting challenge, especially
            with all the uncertainty. Thats where we step in, our mission is to
            provide you with a reliable tool to gauge if you are ready for the
            job market.
          </p>
          <Image
            src="landingpage/quote.svg"
            alt="quotation-background-image"
            width={186}
            height={219}
            className="custom-quote"
          />
        </div>
      </div>
    </section>
  );
};

export default ImagesBlock;
